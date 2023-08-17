const { Size } = require('../../db');

module.exports = async (sizeId, newName) => {
  try {
    // Buscar el tamaño por su ID
    const size = await Size.findByPk(sizeId);

    if (!size) {
      // Si no se encuentra el tamaño, lanzar un error
      const error = new Error('El tamaño no existe.');
      error.status = 404;
      throw error;
    }

    // Verificar si ya existe un tamaño con el nuevo nombre
    const existingSize = await Size.findOne({
      where: {
        name: newName,
      },
    });

    if (existingSize) {
      // Si ya existe un tamaño con el nuevo nombre, lanzar un error
      throw new Error(`El nombre de tamaño ya existe: ${newName}`);
    }

    // Actualizar el nombre del tamaño
    size.name = newName;
    await size.save();

    size.dataValues.id = `tam-${size.dataValues.id}`;

    return size;
  } catch (error) {
    console.error('Error al actualizar el nombre del tamaño:', error);
    throw error;
  }
};
