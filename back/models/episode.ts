import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

export class Episode extends Model<InferAttributes<Episode>, InferCreationAttributes<Episode>> {
  declare episodeId: CreationOptional<number>;
  declare webtoonId: number;
  declare title: string;
  declare uploadDate: CreationOptional<Date>;
  declare episodeImage?: string;

  static initModel(sequelize: Sequelize): typeof Episode {
    Episode.init(
      {
        episodeId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        webtoonId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        uploadDate: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        episodeImage: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: 'Episode',
        tableName: 'episodes',
        timestamps: false,
      }
    );
    return Episode;
  }

  static associate(models: any) {
    Episode.belongsTo(models.Webtoon, {
      foreignKey: 'webtoonId',
      onDelete: 'CASCADE',
    });
  }
}
