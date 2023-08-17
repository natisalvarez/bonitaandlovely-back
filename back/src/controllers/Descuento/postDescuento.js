const { Descuento } = require('../../db');

module.exports = async (name, porcentaje, codigo, condiciones) => {

  
  try {
    // Verificar si ya existe un descuento con el mismo código
    const existingDescuento = await Descuento.findOne({
      where: {
        codigo: codigo,
      },
    });


    if (existingDescuento) {
      // Si ya existe un descuento con el mismo código, lanzar un errors
      throw new Error(`El código de descuento ya existe: ${codigo}`);
    }

    // Si no existe un descuento con el mismo código, crear el nuevo descuento
    const newDescuento = await Descuento.create({
      name,
      porcentaje,
      codigo,
      condiciones,
    });

    newDescuento.dataValues.id = `desc-${newDescuento.dataValues.id}`;

    return newDescuento;
  } catch (error) {
    console.error('Error al crear el descuento:', error.message);
    throw error;
  }
};
