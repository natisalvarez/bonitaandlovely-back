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

    // Actualizar la propiedad activa a false
    color.activa = false;
    await color.save();

    // Devolver el color actualizado con el ID modificado
    color.dataValues.id = `col-${color.dataValues.id}`;
    return color;
  } catch (error) {
    console.error('Error al cambiar la propiedad activa del color:', error.message);
    throw error;
  }
};
