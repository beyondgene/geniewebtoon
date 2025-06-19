import { Request, Response, NextFunction } from 'express';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction): void => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: '로그인이 필요합니다.' });
  }
};

export const isNotLoggedIn = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ message: '이미 로그인되어 있습니다.' });
  }
};
