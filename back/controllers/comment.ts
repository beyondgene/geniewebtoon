import { Request, Response, NextFunction } from 'express';
import db from '../models';

// ✅ 댓글 작성
export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { episodeId } = req.params;
    const { content } = req.body;
    const user = req.user as any;

    const comment = await db.Comment.create({
      episodeId: parseInt(episodeId, 10),
      userId: user.id,
      content,
    });

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

// ✅ 댓글 조회
export const getCommentsByEpisode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { episodeId } = req.params;

    const comments = await db.Comment.findAll({
      where: { episodeId },
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname'],
        },
      ],
      order: [['createdAt', 'ASC']],
    });

    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

// ✅ 댓글 삭제
export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { commentId } = req.params;
    const user = req.user as any;

    const comment = await db.Comment.findByPk(commentId);

    if (!comment) {
      res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
    }

    if (comment.userId !== user.id) {
      res.status(403).json({ message: '본인의 댓글만 삭제할 수 있습니다.' });
    }

    await comment.destroy();
    res.status(200).json({ message: '댓글 삭제 완료' });
  } catch (err) {
    next(err);
  }
};

export const likeComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as any;
    const { commentId } = req.params;
    const comment = await db.Comment.findByPk(commentId);
    if (!comment) res.status(404).json({ message: '댓글 없음' });

    await comment.addLiker(user);
    res.status(200).json({ message: '좋아요 완료' });
  } catch (err) {
    next(err);
  }
};

export const unlikeComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as any;
    const { commentId } = req.params;
    const comment = await db.Comment.findByPk(commentId);
    if (!comment) res.status(404).json({ message: '댓글 없음' });

    await comment.removeLiker(user);
    res.status(200).json({ message: '좋아요 취소 완료' });
  } catch (err) {
    next(err);
  }
};

export const replyToComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { parentCommentId } = req.params;
    const { content } = req.body;
    const user = req.user as any;

    const parent = await db.Comment.findByPk(parentCommentId);
    if (!parent) res.status(404).json({ message: '부모 댓글 없음' });

    const reply = await db.Comment.create({
      content,
      userId: user.id,
      episodeId: parent.episodeId,
      parentCommentId: parent.commentId,
    });

    res.status(201).json(reply);
  } catch (err) {
    next(err);
  }
};

export const reportComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.params;
    const { reason } = req.body;
    const user = req.user as any;

    const comment = await db.Comment.findByPk(commentId);
    if (!comment) res.status(404).json({ message: '댓글 없음' });

    await db.CommentReport.create({
      commentId,
      userId: user.id,
      reason,
    });

    res.status(201).json({ message: '댓글 신고 완료' });
  } catch (err) {
    next(err);
  }
};
