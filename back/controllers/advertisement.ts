import { Request, Response, NextFunction } from 'express';
import db from '../models';

// 전체 광고 조회 (사용자용 - 활성화된 것만)
export const getActiveAds = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ads = await db.Advertisement.findAll({
      where: { isActive: true },
      order: [['priority', 'ASC']],
    });
    res.status(200).json(ads);
  } catch (err) {
    next(err);
  }
};

// 광고 등록 (관리자)
export const createAd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { imageUrl, linkUrl, position, priority } = req.body;
    const newAd = await db.Advertisement.create({
      imageUrl,
      linkUrl,
      position,
      priority,
    });
    res.status(201).json(newAd);
  } catch (err) {
    next(err);
  }
};

// 광고 수정 (관리자)
export const updateAd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { imageUrl, linkUrl, position, priority, isActive } = req.body;

    const ad = await db.Advertisement.findByPk(id);
    if (!ad) res.status(404).json({ message: '광고를 찾을 수 없습니다.' });

    await ad.update({ imageUrl, linkUrl, position, priority, isActive });
    res.status(200).json(ad);
  } catch (err) {
    next(err);
  }
};

// 광고 삭제 (관리자)
export const deleteAd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const ad = await db.Advertisement.findByPk(id);
    if (!ad) res.status(404).json({ message: '광고를 찾을 수 없습니다.' });

    await ad.destroy();
    res.status(200).json({ message: '광고 삭제 완료' });
  } catch (err) {
    next(err);
  }
};
