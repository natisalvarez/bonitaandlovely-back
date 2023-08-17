const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Descuento = sequelize.define('Descuento', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    porcentaje: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    condiciones: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },
   {tableName: 'descuento',timestamps: false}
  );

  return Descuento
};
