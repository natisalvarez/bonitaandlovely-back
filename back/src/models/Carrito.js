const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Carrito = sequelize.define('Carrito', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productos: {
      type: DataTypes.ARRAY(DataTypes.JSONB), // Array de objetos JSON con llaves foráneas
      allowNull: false,
    },
    pagado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    fechaCompra: {
      type: DataTypes.STRING,
      allowNull: true, // Permitir valores nulos
      defaultValue: null, // Valor por defecto
    },
  },
  { 
    tableName: 'carrito',
    timestamps: false,
  });

  // Definir las relaciones con otros modelos
  Carrito.associate = (models) => {
    Carrito.belongsTo(models.Cliente, {
      foreignKey: 'clienteId',
    });

  };

  return Carrito;
};
