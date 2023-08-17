const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const Reviwers = sequelize.define("Reviwers", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comentario:{
        type:DataTypes.STRING,
        allowNull:false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
  });
  return Reviwers;
};
