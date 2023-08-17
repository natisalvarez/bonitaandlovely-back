const { Descuento } = require('../../db');

module.exports = async () => {
  try {
    const descuentos = await Descuento.findAll();

    // Modificar el id para que inicie con "desc-"
    const descuentosConIdModificado = descuentos.map((descuento) => {
      descuento.dataValues.id = `desc-${descuento.dataValues.id}`;
      return descuento;
    });

    return descuentosConIdModificado;
  } catch (error) {
    console.error('Error al obtener los Descuentos:', error.message);
    throw error;
  }
};
