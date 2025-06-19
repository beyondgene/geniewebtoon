import { Request, Response, NextFunction } from 'express';
import db from '../models';

// 유저 전체 목록 조회
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await db.User.findAll({
      attributes: ['id', 'memberId', 'nickname', 'isAdmin', 'createdAt'],
    });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// 신고된 댓글 목록
export const getReportedComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reports = await db.CommentReport.findAll({
      include: [
        {
          model: db.Comment,
          include: [{ model: db.User, attributes: ['id', 'nickname'] }],
        },
        {
          model: db.User,
          as: 'Reporter',
          attributes: ['id', 'nickname'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(reports);
  } catch (err) {
    next(err);
  }
};

// 댓글 삭제 by 관리자
export const deleteCommentByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.params;
    const comment = await db.Comment.findByPk(commentId);
    if (!comment) {
      res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }

    await comment.destroy();
    res.status(200).json({ message: '댓글 삭제 완료' });
  } catch (err) {
    next(err);
  }
};
