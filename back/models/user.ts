import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  Association,
} from 'sequelize';
import { Webtoon } from './webtoon';
import { Comment } from './comment';

export class User extends Model<
  InferAttributes<User, { omit: 'Favorites' | 'LikedComments' }>,
  InferCreationAttributes<User, { omit: 'Favorites' | 'LikedComments' }>
> {
  declare id: CreationOptional<number>;
  declare memberId: string;
  declare password: string;
  declare nickname: string;
  declare isAdmin: boolean;
  declare email: string;
  declare snsId: string | null;
  declare provider: string | null;

  // N:N 관심 웹툰
  declare Favorites?: NonAttribute<Webtoon[]>;

  // N:N 좋아요한 댓글
  declare LikedComments?: NonAttribute<Comment[]>;

  static associations: {
    Favorites: Association<User, Webtoon>;
    LikedComments: Association<User, Comment>;
  };

  static initModel(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        memberId: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nickname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
        snsId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        provider: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
      }
    );
    return User;
  }

  static associate(models: any) {
    // 관심 웹툰 N:N
    User.belongsToMany(models.Webtoon, {
      through: 'Favorite',
      as: 'Favorites',
      foreignKey: 'userId',
      otherKey: 'webtoonId',
    });

    // 댓글 1:N
    User.hasMany(models.Comment, { foreignKey: 'userId' });

    // 댓글 좋아요 N:N
    User.belongsToMany(models.Comment, {
      through: 'CommentLike',
      as: 'LikedComments',
      foreignKey: 'userId',
      otherKey: 'commentId',
    });

    // 댓글 신고는 필요 시 관계 연결 가능
  }
}

export default User;
