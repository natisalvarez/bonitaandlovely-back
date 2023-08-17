const { Proveedor } = require('../../db');

module.exports = async (proveedorData) => {
  try {
    // Verificar si ya existe un proveedor con el mismo nombre
    const existingProveedor = await Proveedor.findOne({
      where: {
        name: proveedorData.name,
      },
    });

    if (existingProveedor) {
      // Si ya existe un proveedor con el mismo nombre, lanzar un error
      const error = new Error('Ya existe un proveedor con este nombre.');
      error.status = 400;
      throw error;
    }

    // Si no existe un proveedor con el mismo nombre, crear el nuevo proveedor
    const newProveedor = await Proveedor.create(proveedorData);

    return newProveedor;
  } catch (error) {
    console.error('Error al agregar el proveedor:', error);
    throw error;
  }
};
