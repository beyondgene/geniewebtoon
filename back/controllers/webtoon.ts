import { Request, Response, NextFunction } from 'express';
import db from '../models';

export const getAllWebtoons = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const webtoons = await db.Webtoon.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(webtoons);
  } catch (err) {
    next(err);
  }
};

export const getWebtoonById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const webtoon = await db.Webtoon.findByPk(id);
    if (!webtoon) {
      res.status(404).json({ message: '웹툰을 찾을 수 없습니다.' });
    }
    res.status(200).json(webtoon);
  } catch (err) {
    next(err);
  }
};

export const getWebtoonsByWeekday = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { weekday } = req.params;
    const webtoons = await db.Webtoon.findAll({
      where: { weekday }, // 웹툰 모델에 weekday 필드가 있다고 가정
    });
    res.status(200).json(webtoons);
  } catch (err) {
    next(err);
  }
};
