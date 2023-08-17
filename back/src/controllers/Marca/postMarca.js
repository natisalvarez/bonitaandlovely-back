const { Marca } = require('../../db');

module.exports = async (name) => {
  try {
    // Verificar si ya existe una marca con el mismo nombre
    const existingMarca = await Marca.findOne({
      where: {
        name: name,
      },
    });

    if (existingMarca) {
      // Si ya existe una marca con el mismo nombre, lanzar un error
      const error = new Error('Ya existe una marca con este nombre.');
      error.status = 400;
      throw error;
    }

    // Si no existe una marca con el mismo nombre, crear la nueva marca
    const newMarca = await Marca.create({
      name,
    });

    newMarca.dataValues.id = `mar-${newMarca.dataValues.id}`

    return newMarca;
  } catch (error) {
    console.error('Error al agregar la marca:', error);
    throw error;
  }
};
