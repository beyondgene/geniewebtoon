import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

export class CommentReport extends Model<
  InferAttributes<CommentReport>,
  InferCreationAttributes<CommentReport>
> {
  declare reportId: CreationOptional<number>;
  declare reason: string;
  declare createdAt: CreationOptional<Date>;
  declare commentId: number;

  static initModel(sequelize: Sequelize): typeof CommentReport {
    CommentReport.init(
      {
        reportId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        reason: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        commentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'CommentReport',
        tableName: 'comment_reports',
        timestamps: false, // createdAt만 사용하고 updatedAt은 사용하지 않음
      }
    );
    return CommentReport;
  }

  static associate(models: any) {
    CommentReport.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE',
    });
  }
}
