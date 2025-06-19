import express from 'express';
import {
  createComment,
  getCommentsByEpisode,
  deleteComment,
  likeComment,
  unlikeComment,
  replyToComment,
  reportComment,
} from '../controllers/comment';
import { isLoggedIn } from '../middlewares/auth';

const router = express.Router();

// 댓글 작성
router.post('/:episodeId', isLoggedIn, createComment);

// 댓글 조회
router.get('/:episodeId', getCommentsByEpisode);

// 댓글 삭제
router.delete('/:commentId', isLoggedIn, deleteComment);

// 좋아요
router.post('/like/:commentId', isLoggedIn, likeComment);
router.delete('/like/:commentId', isLoggedIn, unlikeComment);

// 답글 작성
router.post('/reply/:parentCommentId', isLoggedIn, replyToComment);

// 신고
router.post('/report/:commentId', isLoggedIn, reportComment);

export default router;
