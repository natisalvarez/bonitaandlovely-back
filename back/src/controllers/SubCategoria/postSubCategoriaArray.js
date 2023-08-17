const { Subcategoria, Categoria } = require('../../db');

module.exports = async (array) => {
  const subcategorias = [];

  async function crearSubCategoria(name, categoriaId) {
    function Primeraletramayuscula(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }
    
      name = Primeraletramayuscula(name);
    
      try {
        // Verificar si ya existe una subcategoría con el mismo nombre bajo la misma categoría principal
        const existingSubcategoria = await Subcategoria.findOne({
          where: {
            name: name,
            categoriaId: categoriaId
          }
        });
    
        if (existingSubcategoria) {
          // Si ya existe una subcategoría con el mismo nombre bajo la misma categoría principal, lanzar un error
          const error = new Error('Subcategoría repetida');
          error.status = 400;
          throw error;
        }
    
        // Verificar si la categoría principal con el categoriaId existe
        const existingCategoria = await Categoria.findOne({
          where: {
            id: categoriaId
          }
        });
    
        if (!existingCategoria) {
          // Si la categoría principal no existe, lanzar un error
          const error = new Error('La categoría principal no existe.');
          error.status = 400;
          throw error;
        }
    
        // Si no existe una subcategoría con el mismo nombre bajo la misma categoría principal y la categoría principal existe,
        // crear la nueva subcategoría
        const newSubcategoria = await Subcategoria.create({
          name,
          categoriaId
        });
    
        newSubcategoria.dataValues.id = `subCat-${newSubcategoria.dataValues.id}`;
        newSubcategoria.dataValues.categoriaId = `cat-${newSubcategoria.dataValues.categoriaId}`;
    
        subcategorias.push(newSubcategoria)
      } catch (error) {
        console.error('Error al crear la subcategoría:', error);
        throw error;
      }
  }

  try {
    await Promise.all(array.map((subcategoria)=>crearSubCategoria(subcategoria.name,subcategoria.categoriaId)));
    return subcategorias;
  } catch (error) {
    throw error;
  }
};
