const { Carrito, Color, Producto } = require('../../db');

module.exports = async (clienteId) => {
  try {
    // Verificar si ya existe un carrito para el cliente
    const carritoExistente = await Carrito.findOne({
      where: {
        clienteId,
        pagado: false
      },
    });

    if (!carritoExistente) {
      throw new Error(`No existe un carrito para el cliente con ID ${clienteId}.`);
    }

    carritoExistente.dataValues.id = `carr-${carritoExistente.dataValues.id}`;

    // Obtener la lista de productos del carrito
    const productos = carritoExistente.dataValues.productos;

    // Recorrer los productos y agregar información adicional
    let precioTotalCarrito = 0; // Inicializar el precio total del carrito

    for (const producto of productos) {
      const color = await Color.findByPk(producto.colorId);
      if (color) {
        producto.colorName = color.name;
      }

      const productoInfo = await Producto.findByPk(producto.productoId);
      if (productoInfo) {
        producto.name = productoInfo.name;
        producto.imagenPrincipal = productoInfo.imagenPrincipal;
        producto.precio_venta = productoInfo.precio_venta;

        // Calcular el precio total del producto
        producto.precioTotal = producto.cantidad * producto.precio_venta;

        // Agregar el precio total del producto al precio total del carrito
        precioTotalCarrito += producto.precioTotal;
      }
    }

    carritoExistente.dataValues.precioTotalCarrito = precioTotalCarrito;

    return carritoExistente;
  } catch (error) {
    console.error('Error al agregar registro en el carrito:', error.message);
    throw error;
  }
};
