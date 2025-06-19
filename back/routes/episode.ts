import express from 'express';
import { getEpisodesByWebtoonId, getEpisodeDetail } from '../controllers/episode';

const router = express.Router();

// 특정 웹툰의 회차 목록 조회
router.get('/:webtoonId', getEpisodesByWebtoonId);

// 특정 회차 상세 조회
router.get('/:webtoonId/:episodeId', getEpisodeDetail);

export default router;
