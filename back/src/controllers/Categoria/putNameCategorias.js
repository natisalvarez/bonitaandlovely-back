const { Categoria } = require('../../db');

module.exports = async (categoriaId, newName) => {
  function Primeraletramayuscula(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  newName = Primeraletramayuscula(newName);

  try {
    // Verificar si la categoría con el categoriaId existe
    const existingCategoria = await Categoria.findOne({
      where: {
        id: categoriaId
      }
    });

    if (!existingCategoria) {
      // Si la categoría no existe, lanzar un error
      const error = new Error('La categoría no existe.');
      error.status = 400;
      throw error;
    }

    // Verificar si ya existe una categoría con el mismo nombre
    const existingCategoriaWithName = await Categoria.findOne({
      where: {
        name: newName
      }
    });

    if (existingCategoriaWithName) {
      // Si ya existe una categoría con el mismo nombre, lanzar un error
      const error = new Error(`El nombre de categoría ya existe: ${newName}`);
      error.status = 400;
      throw error;
    }

    // Actualizar el nombre de la categoría
    existingCategoria.name = newName;
    await existingCategoria.save();

    existingCategoria.dataValues.id = `cat-${existingCategoria.dataValues.id}`;

    return existingCategoria;
  } catch (error) {
    console.error('Error al actualizar la categoría:', error);
    throw error;
  }
};
