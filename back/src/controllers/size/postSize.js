const { Size } = require('../../db');

module.exports = async (name) => {
  try {
    // Verificar si ya existe un tamaño con el mismo nombre
    const existingSize = await Size.findOne({
      where: {
        name: name,
      },
    });

    if (existingSize) {
      // Si ya existe un tamaño con el mismo nombre, lanzar un error
      const error = new Error('Ya existe un tamaño con este nombre.');
      error.status = 400;
      throw error;
    }

    // Si no existe un tamaño con el mismo nombre, crear el nuevo tamaño
    const newSize = await Size.create({
      name,
    });

    newSize.dataValues.id = `Tam-${newSize.dataValues.id}`;

    return newSize;
  } catch (error) {
    console.error('Error al agregar el tamaño:', error);
    throw error;
  }
};
