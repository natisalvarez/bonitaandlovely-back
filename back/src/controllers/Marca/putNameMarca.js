const { Marca } = require('../../db');

module.exports = async (marcaId, newName) => {
  try {
    // Buscar la marca por su ID
    const marca = await Marca.findByPk(marcaId);

    if (!marca) {
      // Si no se encuentra la marca, lanzar un error
      const error = new Error('La marca no existe.');
      error.status = 404;
      throw error;
    }

    // Verificar si ya existe una marca con el nuevo nombre
    const existingMarca = await Marca.findOne({
      where: {
        name: newName,
      },
    });

    if (existingMarca) {
      // Si ya existe una marca con el nuevo nombre, lanzar un error
      throw new Error(`El nombre de marca ya existe: ${newName}`);
    }

    // Actualizar el nombre de la marca
    marca.name = newName;
    await marca.save();

    marca.dataValues.id = `mar-${marca.dataValues.id}`;

    return marca;
  } catch (error) {
    console.error('Error al actualizar el nombre de la marca:', error);
    throw error;
  }
};
