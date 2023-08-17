const { Color } = require('../../db');

module.exports = async () => {
  try {
    const colores = await Color.findAll();

    // Concatenar "col-" al ID de cada color
    colores.forEach((color) => {
      color.dataValues.id = `col-${color.dataValues.id}`;
    });

    return colores;
  } catch (error) {
    console.error('Error al obtener los colores:', error.message);
    throw error;
  }
};
