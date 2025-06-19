import express from 'express';
import { getAllWebtoons, getWebtoonById, getWebtoonsByWeekday } from '../controllers/webtoon';

const router = express.Router();

// 전체 웹툰 목록 조회
router.get('/', getAllWebtoons);

// 웹툰 상세 조회
router.get('/:id', getWebtoonById);

// 요일별 웹툰 필터링 (옵션)
router.get('/day/:weekday', getWebtoonsByWeekday);

export default router;
