import { Request, Response, NextFunction } from 'express';
import db from '../models';

// 관심 웹툰 추가
export const addFavoriteWebtoon = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { webtoonId } = req.params;
    const user = req.user as any;

    const webtoon = await db.Webtoon.findByPk(webtoonId);
    if (!webtoon) {
      res.status(404).json({ message: '웹툰을 찾을 수 없습니다.' });
      return;
    }

    await user.addFavorite(webtoon);
    res.status(200).json({ message: '관심 웹툰 등록 완료' });
  } catch (err) {
    next(err);
  }
};

// 관심 웹툰 해제
export const removeFavoriteWebtoon = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { webtoonId } = req.params;
    const user = req.user as any;

    const webtoon = await db.Webtoon.findByPk(webtoonId);
    if (!webtoon) {
      res.status(404).json({ message: '웹툰을 찾을 수 없습니다.' });
      return;
    }

    await user.removeFavorite(webtoon);
    res.status(200).json({ message: '관심 웹툰 삭제 완료' });
  } catch (err) {
    next(err);
  }
};

// 관심 웹툰 목록 조회
export const getFavoriteWebtoons = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user as any;
    const favorites = await user.getFavorites();
    res.status(200).json(favorites);
  } catch (err) {
    next(err);
  }
};

// 마이페이지 정보 조회
export const getMypageInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user as any;

    const fullUser = await db.User.findByPk(user.id, {
      attributes: ['id', 'memberId', 'nickname', 'createdAt'],
      include: [
        {
          model: db.Webtoon,
          as: 'Favorites',
          attributes: ['webtoonId', 'webtoonName', 'genre', 'thumbnail'],
          through: { attributes: [] },
        },
      ],
    });

    if (!fullUser) {
      res.status(404).json({ message: '사용자 정보를 찾을 수 없습니다.' });
      return;
    }

    res.status(200).json(fullUser);
  } catch (err) {
    next(err);
  }
};
