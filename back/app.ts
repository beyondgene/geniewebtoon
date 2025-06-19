import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from 'passport';
import path from 'path';

import authRouter from './routes/auth';
import userRouter from './routes/user';
import feedRouter from './routes/feed';
import db from './models';
import passportConfig from './passport';

dotenv.config();

const app = express();
passportConfig();

app.set('port', process.env.PORT || 8001);

// 정적 파일 먼저 처리
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// DB 연결
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log(' 데이터베이스 연결 성공');
  })
  .catch((err: Error) => {
    console.error(' DB 연결 실패:', err);
  });

// 미들웨어
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET || '',
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//  API 라우터
app.use('/auth', authRouter); //  auth(관리자)권한으로 변경
app.use('/feed', feedRouter); //  feed로 변경
app.use('/user', userRouter); //  user로 변경

// 404 처리
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

//  에러 핸들링
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (res.headersSent) return next(err);
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' }); // 내부 서버 에러 표시
});

export default app;
