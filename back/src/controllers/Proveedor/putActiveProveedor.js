const { Proveedor } = require('../../db');

module.exports = async (proveedorId) => {
  try {
    // Buscar el proveedor por su ID
    const proveedor = await Proveedor.findByPk(proveedorId);

    if (!proveedor) {
      // Si no se encuentra el proveedor, lanzar un error
      const error = new Error('El proveedor no existe.');
      error.status = 404;
      throw error;
    }

    // Actualizar la propiedad activa a true
    await proveedor.update({ activa: true });

    
    proveedor.dataValues.id = `prov-${proveedor.dataValues.id}`;
    // Devolver el proveedor actualizado
    return proveedor;
  } catch (error) {
    console.error('Error al cambiar el estado del proveedor:', error.message);
    throw error;
  }
};
