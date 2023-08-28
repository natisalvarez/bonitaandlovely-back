const { Reviwers, Cliente } = require('../../db');

module.exports = async () => {
  try {
    // Obtener todas las reseñas
    const reseñas = await Reviwers.findAll();

    // Verificar si no se encontraron reseñas
    if (!reseñas || reseñas.length === 0) {
      return 'No se encontraron reseñas';
    }

    // Enrich reseñas con el nombre del cliente
    const reseñasConName = await Promise.all(reseñas.map(async (reseña) => {
      const cliente = await Cliente.findOne({
        where: {
          id: reseña.clienteId
        }
      });
      return {
        ...reseña.toJSON(),
        nameClient: cliente ? cliente.name : 'desconocido'
      };
    }));

    return reseñasConName;
  } catch (error) {
    console.error('Error al obtener reseñas:', error.message);
    throw error;
  }
};
