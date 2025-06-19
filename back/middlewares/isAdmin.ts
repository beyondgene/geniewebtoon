import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.user as any;

  if (!user) {
    res.status(401).json({ message: '로그인이 필요합니다.' });
  }

  if (!user.isAdmin) {
    res.status(403).json({ message: '관리자 권한이 필요합니다.' });
  }

  next();
};
