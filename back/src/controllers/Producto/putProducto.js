const { Producto, Categoria, Marca } = require('../../db');

module.exports = async (productoId, name, descripcion, precio_compra, porcentaje_ganancia, precio_venta, referencia_proveedor, marcaId, categoriaId) => {
  try {
    
    function extractNumberFromString(inputString) {
      const match = inputString.match(/\d+/); // Busca uno o más dígitos en la cadena
    
      if (match) {
        return parseInt(match[0]); // Convierte el valor coincidente en un número entero
      }
    
      return null; // Si no se encuentra un número, devuelve null o algún valor predeterminado
    }

    productoId = extractNumberFromString(productoId)

    // Verificar si el producto existe
    const productoExistente = await Producto.findByPk(productoId);

    if (!productoExistente) {
      throw new Error(`El producto con ID ${productoId} no existe`);
    }

    // Verificar si la categoría existe y está activa
    const categoriaExistente = await Categoria.findOne({
      where: {
        id: categoriaId,
        activa: true,
      },
    });

    if (!categoriaExistente) {
      throw new Error(`La categoría con ID ${categoriaId} no existe o no está activa`);
    }

    // Verificar si la marca existe y está activa
    const marcaExistente = await Marca.findOne({
      where: {
        id: marcaId,
        activa: true,
      },
    });

    if (!marcaExistente) {
      throw new Error(`La marca con ID ${marcaId} no existe o no está activa`);
    }

    // Actualizar el producto en la base de datos
    await Producto.update(
      {
        name,
        descripcion,
        precio_compra,
        porcentaje_ganancia,
        precio_venta,
        referencia_proveedor,
        marcaId,
        categoriaId,
      },
      {
        where: { id: productoId },
      }
    );

    // Obtener el producto actualizado desde la base de datos
    const productoActualizado = await Producto.findByPk(productoId);

    // Asignar un identificador personalizado (opcional)
    productoActualizado.dataValues.id = `prod-${productoActualizado.dataValues.id}`;

    return productoActualizado;
  } catch (error) {
    console.error('Error al actualizar el producto:', error.message);
    throw error;
  }
};
