const { Descuento } = require('../../db');

module.exports = async (array) => {
  const descuentos = [];

  async function crearDescuento(descuentoData) {
    try {
      // Verificar si ya existe un descuento con el mismo código
      const existingDescuento = await Descuento.findOne({
        where: {
          codigo: descuentoData.codigo,
        },
      });

      if (existingDescuento) {
        // Si ya existe un descuento con el mismo código, lanzar un error
        throw new Error(`El código de descuento ya existe: ${descuentoData.codigo}`);
      }

      // Si no existe un descuento con el mismo código, crear el nuevo descuento
      const newDescuento = await Descuento.create(descuentoData);

      newDescuento.dataValues.id = `desc-${newDescuento.dataValues.id}`;
      
      descuentos.push(newDescuento);
    } catch (error) {
      console.error('Error al crear el descuento:', error.message);
      throw error;
    }
  }

  try {
    await Promise.all(array.map(crearDescuento));
    return descuentos;
  } catch (error) {
    throw error;
  }
};
