import express from 'express';
import {
  addFavoriteWebtoon,
  removeFavoriteWebtoon,
  getFavoriteWebtoons,
  getMypageInfo,
} from '../controllers/user';
import { isLoggedIn } from '../middlewares/auth';

const router = express.Router();

//마이페이지
router.get('/mypage', isLoggedIn, getMypageInfo);

// 관심 웹툰 등록
router.post('/favorites/:webtoonId', isLoggedIn, addFavoriteWebtoon);

// 관심 웹툰 해제
router.delete('/favorites/:webtoonId', isLoggedIn, removeFavoriteWebtoon);

// 관심 웹툰 목록 조회
router.get('/favorites', isLoggedIn, getFavoriteWebtoons);

export default router;

//DB 중간 테이블로 favorite을 설정하여 Sequelize가 자동 생성하며, userId와 webtoonId를 연결하는 조인 테이블입니다.
