const { Categoria } = require('../../db');

module.exports = async (name) => {
  function Primeraletramayuscula(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  name = Primeraletramayuscula(name);

  try {
    if (!name) {
      throw new Error('El nombre de categoría es inválido.');
    }

    // Verificar si ya existe una categoría con el mismo nombre
    const existingCategoria = await Categoria.findOne({
      where: {
        name: name
      }
    });

    if (existingCategoria) {
      // Si ya existe una categoría con el mismo nombre, lanzar un error
      throw new Error(`El nombre de categoría ya existe: ${name}`);
    }

    // Si no existe una categoría con el mismo nombre, crear la nueva categoría
    const newCategoria = await Categoria.create({
      name,
    });

    newCategoria.dataValues.id = `cat-${newCategoria.dataValues.id}`

    return newCategoria;
  } catch (error) {
    console.error('Error al crear la categoria:', error.message);
    throw error;
  }
};
