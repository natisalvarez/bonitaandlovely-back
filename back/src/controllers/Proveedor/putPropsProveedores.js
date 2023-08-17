const { Proveedor } = require('../../db');

module.exports = async (proveedorId, dataToUpdate) => {
  try {
    // Buscar el proveedor por su ID
    const proveedor = await Proveedor.findByPk(proveedorId);

    if (!proveedor) {
      // Si no se encuentra el proveedor, lanzar un error
      const error = new Error('El proveedor no existe.');
      error.status = 404;
      throw error;
    }

    // Actualizar los datos del proveedor
    await proveedor.update(dataToUpdate);

    // Concatenar "prov-" al ID del proveedor actualizado
    proveedor.dataValues.id = `prov-${proveedor.dataValues.id}`;

    // Devolver el proveedor actualizado
    return proveedor;
  } catch (error) {
    console.error('Error al actualizar el proveedor:', error.message);
    throw error;
  }
};
