const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserPostInteraction extends Model {}

UserPostInteraction.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
    },
    interaction_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'neutral',
      validate: {
        isIn: [['like', 'dislike', 'neutral']],
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_post_interaction',
  }
);

module.exports = UserPostInteraction;
