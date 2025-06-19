import express from 'express';
import { getMainFeed, getWebtoonsByHashtag } from '../controllers/feed';
import { isLoggedIn } from '../middlewares';

const router = express.Router();

router.get('/', getMainFeed); // 메인 피드 (ex: 인기순)
router.get('/hashtag', getWebtoonsByHashtag); // 해시태그 기반 검색

export default router;
