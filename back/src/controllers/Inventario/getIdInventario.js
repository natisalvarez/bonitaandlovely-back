const { Inventario } = require('../../db');

module.exports = async (id) => {
  try {function extractNumberFromString(inputString) {
    const match = inputString.match(/\d+/); // Busca uno o más dígitos en la cadena
  
    if (match) {
      return parseInt(match[0]); // Convierte el valor coincidente en un número entero
    }
  
    return null; // Si no se encuentra un número, devuelve null o algún valor predeterminado
  }

  id = extractNumberFromString(id)
    const inventarios = await Inventario.findAll({
      where: {
        productoId: id,
      },
    });

    let productoId = id;
    let cantidad = 0;
    let colores = [];


    inventarios.forEach((inventario) => {
      cantidad += inventario.cantidad;
    });

    inventarios.forEach((inventario) => {
      colores.push(inventario.colorId)
    });

    const inventarioResult = {
      productoId: productoId,
      colores: colores,
      cantidad: cantidad,
    };

    return inventarioResult;
  } catch (error) {
    console.error('Error al obtener el inventario:', error.message);
    throw error;
  }
};
