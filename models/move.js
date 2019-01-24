'use strict';
module.exports = (sequelize, DataTypes) => {
  const Move = sequelize.define('Move', {
    phone: DataTypes.TEXT,
    nexmoNumber: DataTypes.TEXT,
    cells: DataTypes.TEXT,
    MazeId: DataTypes.INTEGER
  }, {});
  Move.associate = function(models) {
    Move.belongsTo(models.Maze);
  };
  return Move;
};