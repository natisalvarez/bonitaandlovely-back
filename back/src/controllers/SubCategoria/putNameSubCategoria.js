const { Subcategoria } = require('../../db');

module.exports = async (subcategoriaId, newName) => {
  function PrimeraLetraMayuscula(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  newName = PrimeraLetraMayuscula(newName);

  try {
    // Verificar si la subcategoría con el subcategoriaId existe
    const existingSubcategoria = await Subcategoria.findByPk(subcategoriaId);

    if (!existingSubcategoria) {
      // Si la subcategoría no existe, lanzar un error
      const error = new Error('La subcategoría no existe.');
      error.status = 400;
      throw error;
    }

    // Verificar si ya existe otra subcategoría con el mismo nombre bajo la misma categoría principal
    const existingSubcategoriaWithNewName = await Subcategoria.findOne({
      where: {
        name: newName,
        categoriaId: existingSubcategoria.categoriaId
      }
    });

    if (existingSubcategoriaWithNewName) {
      // Si ya existe otra subcategoría con el mismo nombre bajo la misma categoría principal, lanzar un error
      const error = new Error('Ya existe otra subcategoría con el mismo nombre.');
      error.status = 400;
      throw error;
    }

    // Actualizar el nombre de la subcategoría
    existingSubcategoria.name = newName;
    await existingSubcategoria.save();

    existingSubcategoria.dataValues.id = `subCat-${existingSubcategoria.dataValues.id}`;
    existingSubcategoria.dataValues.categoriaId = `cat-${existingSubcategoria.dataValues.categoriaId}`;

    return existingSubcategoria;
  } catch (error) {
    console.error('Error al actualizar la subcategoría:', error);
    throw error;
  }
};
