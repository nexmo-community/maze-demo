'use strict';
module.exports = (sequelize, DataTypes) => {
  const Maze = sequelize.define('Maze', {
    name: DataTypes.STRING,
    cells: DataTypes.TEXT,
    solved: DataTypes.BOOLEAN,
  }, {});
  Maze.associate = function(models) {
    Maze.hasMany(models.Move);
  };
  return Maze;
};