import passport from 'passport';
import { Strategy as NaverStrategy } from 'passport-naver';
import User from '../models/user';

export default () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT_ID!,
        clientSecret: process.env.NAVER_CLIENT_SECRET!,
        callbackURL: '/auth/naver/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: 'naver' },
          });
          if (exUser) {
            return done(null, exUser);
          }

          const newUser = await User.create({
            email: profile._json?.email,
            nickname: profile.displayName,
            snsId: profile.id,
            provider: 'naver',
            memberId: `naver_${profile.id}`, // 소셜 아이디 기반 ID
            password: 'sociallogin',
            isAdmin: false,
          });

          return done(null, newUser);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
