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
    //prueba a developer
    // Buscar la marca por su ID
    const producto = await Producto.findByPk(productoId);

    if (!producto) {
      // Si no se encuentra la marca, lanzar un error
      const error = new Error('La marca no existe.');
      error.status = 404;
      throw error;
    }

    // Actualizar la propiedad activa a false
    await producto.update({ activa: false });

    producto.dataValues.id = `prod-${producto.dataValues.id}`;

    // Devolver la marca actualizada
    return producto;
  } catch (error) {
    console.error('Error al desactivar la marca:', error);
    throw error;
  }
};
