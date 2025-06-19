import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

export class Advertisement extends Model<
  InferAttributes<Advertisement>,
  InferCreationAttributes<Advertisement>
> {
  declare adId: CreationOptional<number>;
  declare adLocation: string;
  declare exposureFrequency: number;
  declare peakViewingTimes: string;
  declare primaryAgeGroup: string;

  static initModel(sequelize: Sequelize): typeof Advertisement {
    Advertisement.init(
      {
        adId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        adLocation: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        exposureFrequency: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        peakViewingTimes: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        primaryAgeGroup: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Advertisement',
        tableName: 'advertisements',
        timestamps: false,
      }
    );
    return Advertisement;
  }

  static associate(models: any) {
    // 관계 설정이 필요하다면 여기에 작성
  }
}
