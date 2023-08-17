const { Size } = require('../../db');

module.exports = async (array) => {
  const sizes = [];

  async function crearSize(size) {
    function primerLetraMayuscula(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    size.name = primerLetraMayuscula(size.name);

    try {
      if (!size.name) {
        throw new Error('El nombre de tamaño es inválido.');
      }

      // Verificar si ya existe un tamaño con el mismo nombre
      const existingSize = await Size.findOne({
        where: {
          name: size.name,
        },
      });

      if (existingSize) {
        // Si ya existe un tamaño con el mismo nombre, lanzar un error
        throw new Error(`El nombre de tamaño ya existe: ${size.name}`);
      }

      // Si no existe un tamaño con el mismo nombre, crear el nuevo tamaño
      const newSize = await Size.create({
        name: size.name,
      });

      newSize.dataValues.id = `tam-${newSize.dataValues.id}`;

      sizes.push(newSize);
    } catch (error) {
      console.error('Error al crear el tamaño:', error.message);
      throw error;
    }
  }

  try {
      await Promise.all(array.map(crearSize));
    return sizes;
  } catch (error) {
    throw error;
  }
};
