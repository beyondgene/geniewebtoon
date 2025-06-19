import { Request, Response, NextFunction } from 'express';
import db from '../models';

// 특정 웹툰의 전체 회차 조회
export const getEpisodesByWebtoonId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { webtoonId } = req.params;
    const episodes = await db.Episode.findAll({
      where: { webtoonId },
      order: [['uploadDate', 'DESC']],
    });

    res.status(200).json(episodes);
  } catch (err) {
    next(err);
  }
};

// 특정 회차 상세 조회
export const getEpisodeDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { webtoonId, episodeId } = req.params;

    const episode = await db.Episode.findOne({
      where: { webtoonId, episodeId },
    });

    if (!episode) {
      res.status(404).json({ message: '회차를 찾을 수 없습니다.' });
    }

    res.status(200).json(episode);
  } catch (err) {
    next(err);
  }
};
