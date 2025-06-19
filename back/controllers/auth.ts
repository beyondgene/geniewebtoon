import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import db from '../models'; // Sequelize 인스턴스

const SALT_ROUNDS = 12;

// 회원가입
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { memberId, password, nickname, memberInfo } = req.body;

  try {
    const exUser = await db.User.findOne({ where: { memberId } });
    if (exUser) {
      res.status(409).json({ message: '이미 존재하는 아이디입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await db.User.create({
      memberId,
      password: hashedPassword,
      nickname,
      memberInfo,
    });

    res.status(201).json({ message: '회원가입 성공' });
  } catch (err) {
    next(err);
  }
};

// 로그인
export const login = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate(
    'local',
    (authError: Error | null, user: Express.User | false, info: { message: string }): void => {
      if (authError) {
        return next(authError);
      }
      if (!user) {
        res.status(401).json({ message: info.message });
      }

      req.login(user, (loginError) => {
        if (loginError) return next(loginError);
        return res.status(200).json({ message: '로그인 성공', user });
      });
    }
  )(req, res, next);
};

// 로그아웃
export const logout = (req: Request, res: Response) => {
  req.logout(() => {
    res.status(200).json({ message: '로그아웃 성공' });
  });
};
