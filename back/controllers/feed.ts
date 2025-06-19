import { Request, Response, NextFunction } from 'express';
import { Webtoon /*Episode*/ } from '../models/webtoon';

export const getMainFeed = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const webtoons = await Webtoon.findAll({
      order: [['views', 'DESC']],
      limit: 20,
    });
    res.status(200).json({ webtoons });
  } catch (error) {
    next(error);
  }
};

export const getWebtoonsByHashtag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tag = req.query.tag as string;
    const webtoons = await Webtoon.findAll({
      where: {
        genre: tag, // 또는 태그 관련 필드
      },
    });
    res.status(200).json({ webtoons });
  } catch (error) {
    next(error);
  }
};
