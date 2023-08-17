const { Categoria } = require('../../db');

module.exports = async () => {
  try {
    let categorias = await Categoria.findAll();

    categorias = categorias.map((categoria) => {
      return {
        id: `cat-${categoria.id}`,
        name: categoria.name,
        activa: categoria.activa
      };
    });

    return categorias;
  } catch (error) {
    console.error('Error al obtener las categorías:', error.message);
    throw error;
  }
};
