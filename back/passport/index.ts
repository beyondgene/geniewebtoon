import passport from 'passport';
import local from './localStrategy';
import kakao from './kakaoStrategy';
import naver from './naverStrategy';
import User from '../models/user';

export default () => {
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: number, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  kakao();
  naver();
};
