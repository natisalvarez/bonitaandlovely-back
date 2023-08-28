const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const Reviwers = sequelize.define("Reviwers", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    clienteId:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productoId:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,// Tipo de dato para la fecha
      allowNull: false,
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },{ tableName: 'Reviwers', timestamps: false })

  Reviwers.associate = models => {
    Reviwers.belongsTo(models.Cliente, {
      foreignKey: 'clienteId',
    });
  
    Reviwers.belongsTo(models.Producto, {
      foreignKey: 'productoId',
    });
  };
  return Reviwers;
};
