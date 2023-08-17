const { Categoria } = require('../../db');

module.exports = async (array) => {
  const categorias = [];

  async function crearCategoria(categoria) {
    function Primeraletramayuscula(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    categoria.name = Primeraletramayuscula(categoria.name);

    try {
      if (!categoria.name) {
        throw new Error('El nombre de categoría es inválido.');
      }

      // Verificar si ya existe una categoría con el mismo nombre
      const existingCategoria = await Categoria.findOne({
        where: {
          name: categoria.name
        }
      });

      if (existingCategoria) {
        // Si ya existe una categoría con el mismo nombre, lanzar un error
        throw new Error(`El nombre de categoría ya existe: ${categoria.name}`);
      }

      // Si no existe una categoría con el mismo nombre, crear la nueva categoría
      const newCategoria = await Categoria.create({
        name: categoria.name,
      });

      newCategoria.dataValues.id = `cat-${newCategoria.dataValues.id}`;

      categorias.push(newCategoria);
    } catch (error) {
      console.error('Error al crear la categoria:', error.message);
      throw error;
    }
  }

  try {
    await Promise.all(array.map(crearCategoria));
    return categorias;
  } catch (error) {
    throw error;
  }
};
