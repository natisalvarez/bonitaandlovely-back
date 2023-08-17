const { Producto } = require('../../db');

module.exports = async (productoId) => {
  try {
    function extractNumberFromString(inputString) {
      const match = inputString.match(/\d+/); // Busca uno o más dígitos en la cadena
    
      if (match) {
        return parseInt(match[0]); // Convierte el valor coincidente en un número entero
      }
    
      return null; // Si no se encuentra un número, devuelve null o algún valor predeterminado
    }

    productoId = extractNumberFromString(productoId)
    // Buscar la marca por su ID
    const producto = await Producto.findByPk(productoId);

    if (!producto) {
      // Si no se encuentra la marca, lanzar un error
      const error = new Error('El producto no existe.');
      error.status = 404;
      throw error;
    }

    // Actualizar la propiedad activa a true
    await producto.update({ activa: true });

    producto.dataValues.id = `prod-${producto.dataValues.id}`;

    // Devolver la marca actualizada
    return producto;
  } catch (error) {
    console.error('Error al activar la marca:', error);
    throw error;
  }
};
