import express from 'express';
import { uploadWebtoon, uploadEpisode, uploadAd } from '../middlewares/multer';

const router = express.Router();

// 웹툰 썸네일 업로드
router.post('/webtoon', uploadWebtoon.single('thumbnail'), (req, res) => {
  res.json({ fileUrl: `/uploads/webtoons/${req.file?.filename}` });
});

// 회차 이미지 업로드
router.post('/episode', uploadEpisode.single('image'), (req, res) => {
  res.json({ fileUrl: `/uploads/episodes/${req.file?.filename}` });
});

// 광고 이미지 업로드
router.post('/ad', uploadAd.single('banner'), (req, res) => {
  res.json({ fileUrl: `/uploads/ads/${req.file?.filename}` });
});

export default router;
