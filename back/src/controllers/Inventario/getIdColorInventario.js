const { Inventario } = require('../../db');

module.exports = async (productoId,colorId) => {
  try {
    function extractNumberFromString(inputString) {
      const match = inputString.match(/\d+/); // Busca uno o más dígitos en la cadena
    
      if (match) {
        return parseInt(match[0]); // Convierte el valor coincidente en un número entero
      }
    
      return null; // Si no se encuentra un número, devuelve null o algún valor predeterminado
    }

    productoId = extractNumberFromString(productoId)
    const inventarios = await Inventario.findAll({
      where: {
        productoId,
        colorId
      },
    });

    inventarios.map(inventario => inventario.dataValues.id = `inv-${inventario.dataValues.id}`)

    return inventarios;
  } catch (error) {
    console.error('Error al obtener el inventario:', error.message);
    throw error;
  }
};
