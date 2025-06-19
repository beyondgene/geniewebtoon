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
import { User } from './user';

export class Webtoon extends Model<
  InferAttributes<Webtoon, { omit: 'Fans' }>,
  InferCreationAttributes<Webtoon, { omit: 'Fans' }>
> {
  declare webtoonId: CreationOptional<number>;
  declare webtoonName: string;
  declare genre?: string;
  declare views?: number;
  declare thumbnail?: string;
  declare weekday?: string;

  declare Fans?: NonAttribute<User[]>;

  static associations: {
    Fans: Association<Webtoon, User>;
  };

  static initModel(sequelize: Sequelize): typeof Webtoon {
    Webtoon.init(
      {
        webtoonId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        webtoonName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        genre: {
          type: DataTypes.STRING,
        },
        views: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        thumbnail: {
          type: DataTypes.STRING,
        },
        weekday: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: 'Webtoon',
        tableName: 'webtoons',
        timestamps: true,
      }
    );
    return Webtoon;
  }

  static associate(models: any) {
    Webtoon.belongsToMany(models.User, {
      through: 'Favorite',
      as: 'Fans',
      foreignKey: 'webtoonId',
      otherKey: 'userId',
    });

    Webtoon.hasMany(models.Episode, {
      foreignKey: 'webtoonId',
    });
  }
}
