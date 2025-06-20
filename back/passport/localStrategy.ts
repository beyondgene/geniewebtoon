import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/user';

export default () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (!exUser) {
            return done(null, false, { message: '가입되지 않은 회원입니다.' });
          }
          const isMatch = await bcrypt.compare(password, exUser.password);
          if (isMatch) {
            return done(null, exUser);
          } else {
            return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
          }
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
