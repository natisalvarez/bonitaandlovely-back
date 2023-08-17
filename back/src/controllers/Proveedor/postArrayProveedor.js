const { Proveedor } = require('../../db');

module.exports = async (proveedoresArray) => {
  const proveedores = [];

  async function crearProveedor(proveedorData) {
    try {
      // Verificar si ya existe un proveedor con el mismo nombre
      const existingProveedor = await Proveedor.findOne({
        where: {
          name: proveedorData.name,
        },
      });

      if (existingProveedor) {
        // Si ya existe un proveedor con el mismo nombre, lanzar un error
        throw new Error(`Ya existe un proveedor con el nombre: ${proveedorData.nombre}`);
      }

      // Si no existe un proveedor con el mismo nombre, crear el nuevo proveedor
      const newProveedor = await Proveedor.create(proveedorData);

      newProveedor.dataValues.id = `prov-${newProveedor.dataValues.id}`;
      
      proveedores.push(newProveedor);
    } catch (error) {
      console.error('Error al crear el proveedor:', error.message);
      throw error;
    }
  }

  try {
    await Promise.all(proveedoresArray.map(crearProveedor));
    return proveedores;
  } catch (error) {
    throw error;
  }
};
