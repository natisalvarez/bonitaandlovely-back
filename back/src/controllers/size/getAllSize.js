const { Size } = require('../../db');

module.exports = async () => {
  try {
    let tamanios = await Size.findAll();

    tamanios = tamanios.map((size) => {
      return {
        id: `tam-${size.id}`,
        name: size.name,
        activa: size.activa
      };
    });

    return tamanios;
  } catch (error) {
    console.error('Error al obtener los Tamaños:', error.message);
    throw error;
  }
};
