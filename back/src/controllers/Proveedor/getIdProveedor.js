const { Proveedor } = require('../../db');

module.exports = async (proveedorId) => {
  try {
    const proveedor = await Proveedor.findByPk(proveedorId);

    if (!proveedor) {
      const error = new Error('Proveedor no encontrado.');
      error.status = 404;
      throw error;
    }

    proveedor.dataValues.id = `prov-${proveedor.dataValues.id}`;

    return proveedor;
  } catch (error) {
    console.error('Error al obtener el Proveedor:', error.message);
    throw error;
  }
};
