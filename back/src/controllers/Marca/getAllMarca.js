const { Marca } = require('../../db');

module.exports = async () => {
  try {
    let marcas = await Marca.findAll();

    marcas = marcas.map((marca) => {
      return {
        id: `mar-${marca.id}`,
        name: marca.name,
        activa: marca.activa
      };
    });

    return marcas;
  } catch (error) {
    console.error('Error al obtener las Marcas:', error.message);
    throw error;
  }
};
