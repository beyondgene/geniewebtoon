import express from 'express';
import { isLoggedIn } from '../middlewares/auth';
import { isAdmin } from '../middlewares/isAdmin';
import { getAllUsers, getReportedComments, deleteCommentByAdmin } from '../controllers/admin';

const router = express.Router();

// 관리자만 접근 가능
router.use(isLoggedIn, isAdmin);

// 전체 유저 목록 (예시)
router.get('/users', getAllUsers);

// 신고된 댓글 목록
router.get('/reports/comments', getReportedComments);

// 댓글 삭제 (관리자)
router.delete('/comments/:commentId', deleteCommentByAdmin);

export default router;
