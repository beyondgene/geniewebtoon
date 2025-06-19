import express from 'express';
import { getActiveAds, createAd, updateAd, deleteAd } from '../controllers/advertisement';
import { isAdmin } from '../middlewares/isAdmin'; // 관리자 인증

const router = express.Router();

// 사용자: 노출 광고 조회
router.get('/', getActiveAds);

// 관리자: 광고 등록/수정/삭제
router.post('/', isAdmin, createAd);
router.put('/:id', isAdmin, updateAd);
router.delete('/:id', isAdmin, deleteAd);

export default router;

/*{ db 예시 데이터
  "imageUrl": "/ads/summer_banner.png",
  "linkUrl": "https://event.geniewebtoon.com",
  "position": "main-top",
  "priority": 1,
  "isActive": true
}*/
