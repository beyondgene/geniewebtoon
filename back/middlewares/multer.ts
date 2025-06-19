import multer from 'multer';
import path from 'path';
import fs from 'fs';

// 업로드 디렉토리 생성 함수
const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// 저장 위치 지정 팩토리 함수
const storage = (folder: string) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '..', 'public', 'uploads', folder);
      ensureDir(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, basename + '-' + Date.now() + ext);
    },
  });

// multer 설정 export
export const uploadWebtoon = multer({ storage: storage('webtoons') });
export const uploadEpisode = multer({ storage: storage('episodes') });
export const uploadAd = multer({ storage: storage('ads') });
