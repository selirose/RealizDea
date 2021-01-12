'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  payment.init({
    id_contest: DataTypes.INTEGER,
    id_provider: DataTypes.INTEGER,
    id_winner: DataTypes.INTEGER,
    id_status_contest: DataTypes.INTEGER,
    evidence_provider: DataTypes.STRING,
    id_status_provider: DataTypes.INTEGER,
    evidence_admin: DataTypes.STRING,
    id_status_winner: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
    modelName: 'payment',
  });
  return payment;
};
