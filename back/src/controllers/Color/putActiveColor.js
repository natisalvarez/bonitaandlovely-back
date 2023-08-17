const { Color } = require('../../db');

module.exports = async (colorId) => {
  try {
    // Buscar el color por su ID
    const color = await Color.findByPk(colorId);

    if (!color) {
      // Si no se encuentra el color, lanzar un error
      const error = new Error('El color no existe.');
      error.status = 404;
      throw error;
    }

    // Actualizar la propiedad activa del color a true
    await color.update({ activa: true });

    // Concatenar el prefijo "col-" al ID
    color.dataValues.id = `col-${color.dataValues.id}`;

    // Devolver el color actualizado
    return color;
  } catch (error) {
    console.error('Error al activar el color:', error.message);
    throw error;
  }
};
