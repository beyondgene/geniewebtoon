import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import User from '../models/user';

export default () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID!,
        clientSecret: '', // 필요 시 입력
        callbackURL: '/auth/kakao/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: 'kakao' },
          });
          if (exUser) {
            return done(null, exUser);
          }

          const email = profile._json?.kakao_account?.email || null;

          const newUser = await User.create({
            email,
            nickname: profile.displayName,
            snsId: profile.id,
            provider: 'kakao',
            memberId: `kakao_${profile.id}`,
            password: 'sociallogin', // 더미 값 (혹시 비워두고 싶다면 null 허용 설정 필요)
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
