const { Subcategoria } = require('../../db');

module.exports = async (categoriaId) => {
  try {
    const subcategorias = await Subcategoria.findAll({
      where: {
        categoriaId: categoriaId
      }
    });

    subcategorias.map((subcategoria)=>{
        subcategoria.dataValues.id = `subCat-${subcategoria.dataValues.id}`;
    subcategoria.dataValues.categoriaId = `cat-${subcategoria.dataValues.categoriaId}`;
    })

    return subcategorias;
  } catch (error) {
    console.error('Error al obtener las subcategorías:', error);
    throw error;
  }
};
