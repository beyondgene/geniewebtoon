import { Sequelize } from 'sequelize';
import { config as dotenvConfig } from 'dotenv';
import dbConfig from '../config/config.json';

import { Webtoon } from './webtoon';
import { User } from './user';
import { Episode } from './episode';
import { Comment } from './comment';
import { Advertisement } from './advertisement';
import { CommentReport } from './commentReport'; // ✅ 새로 추가

dotenvConfig();

const env = process.env.NODE_ENV || 'development';
const config = (dbConfig as any)[env];

// Sequelize 인스턴스 생성
const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable] as string, config)
  : new Sequelize(config.database, config.username, config.password, config);

// DB 객체 정의
const db: any = {
  sequelize,
  Sequelize,
};

// ✅ 모델 초기화
db.Webtoon = Webtoon.initModel(sequelize);
db.User = User.initModel(sequelize);
db.Episode = Episode.initModel(sequelize);
db.Comment = Comment.initModel(sequelize);
db.Advertisement = Advertisement.initModel(sequelize);
db.CommentReport = CommentReport.initModel(sequelize);

// ✅ 연관관계 설정
Webtoon.associate(db);
User.associate(db);
Episode.associate(db);
Comment.associate(db);
Advertisement.associate(db);
CommentReport.associate(db); // ✅ 새로 추가

export default db;
