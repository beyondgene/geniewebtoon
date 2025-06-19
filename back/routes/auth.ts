import express from 'express';
import passport from 'passport';
import { signup, login, logout } from '../controllers/auth';
import { isLoggedIn, isNotLoggedIn } from '../middlewares/auth';

const router = express.Router();

// 회원가입 (비로그인 상태에서만)
router.post('/signup', isNotLoggedIn, signup);

// 로그인 (로컬 전략)
router.post('/login', isNotLoggedIn, login);

// 로그아웃
router.post('/logout', isLoggedIn, logout);

// ================================
// 소셜 로그인 - 카카오
// ================================

// 카카오 로그인 시작
router.get('/kakao', passport.authenticate('kakao'));

// 카카오 로그인 콜백
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/', // 로그인 실패 시 리디렉션
  }),
  (req, res) => {
    res.redirect('/'); // 로그인 성공 시 메인 페이지로 이동
  }
);

// ================================
// 소셜 로그인 - 네이버
// ================================

// 네이버 로그인 시작
router.get('/naver', passport.authenticate('naver'));

// 네이버 로그인 콜백
router.get(
  '/naver/callback',
  passport.authenticate('naver', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

export default router;
