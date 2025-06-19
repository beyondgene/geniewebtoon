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

export class Comment extends Model<
  InferAttributes<Comment, { omit: 'Likers' | 'Replies' | 'Parent' }>,
  InferCreationAttributes<Comment, { omit: 'Likers' | 'Replies' | 'Parent' }>
> {
  declare commentId: CreationOptional<number>;
  declare episodeId: number;
  declare userId: number;
  declare content: string;
  declare parentCommentId: number | null;

  declare Likers?: NonAttribute<User[]>;
  declare Replies?: NonAttribute<Comment[]>;
  declare Parent?: NonAttribute<Comment>;

  static associations: {
    Likers: Association<Comment, User>;
    Replies: Association<Comment, Comment>;
    Parent: Association<Comment, Comment>;
  };

  static initModel(sequelize: Sequelize): typeof Comment {
    Comment.init(
      {
        commentId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        episodeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        parentCommentId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Comment',
        tableName: 'comments',
        timestamps: true,
      }
    );
    return Comment;
  }

  static associate(models: any) {
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Episode, { foreignKey: 'episodeId' });

    Comment.belongsTo(models.Comment, {
      as: 'Parent',
      foreignKey: 'parentCommentId',
    });

    Comment.hasMany(models.Comment, {
      as: 'Replies',
      foreignKey: 'parentCommentId',
    });

    Comment.belongsToMany(models.User, {
      through: 'CommentLike',
      as: 'Likers',
      foreignKey: 'commentId',
      otherKey: 'userId',
    });
  }
}

/*User.belongsToMany(Comment, {
  through: 'CommentLike',
  as: 'LikedComments',
  foreignKey: 'userId',
});

Comment.belongsToMany(User, {
  through: 'CommentLike',
  as: 'Likers',
  foreignKey: 'commentId',
});
*/
