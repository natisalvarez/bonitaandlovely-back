const { Carrito, Cliente, Inventario } = require('../../db');

module.exports = async (clienteId, nuevosProductos) => {
  try {
    // Verificar si el cliente existe
    const clienteExistente = await Cliente.findByPk(clienteId);
    if (!clienteExistente) {
      throw new Error(`El cliente con ID ${clienteId} no existe.`);
    }

    // Buscar el carrito del cliente
    const carritoExistente = await Carrito.findOne({
      where: {
        clienteId,
        pagado: false,
      },
    });

    if (!carritoExistente) {
      throw new Error(`No se encontró un carrito activo para el cliente con ID ${clienteId}.`);
    }

    let productosEnCarrito = carritoExistente.productos;

    for (const nuevoProducto of nuevosProductos) {
      let { inventarioId, cantidad, productoId, colorId } = nuevoProducto;

      let inventarioExistente;
      // Verificar si el inventario existe
      if (inventarioId) {
        inventarioExistente = await Inventario.findByPk(inventarioId);
        if (!inventarioExistente) {
          throw new Error(`El inventario con ID ${inventarioId} no existe.`);
        }
        productoId = inventarioExistente.dataValues.productoId
        colorId = inventarioExistente.dataValues.colorId
      }
      if (productoId && colorId) {
        inventarioExistente = await Inventario.findOne({
          where: {
            productoId,
            colorId,
          },
        });
        if (!inventarioExistente) {
          throw new Error(`El inventario con producto ${productoId} y color ${colorId} no existe.`);
        }
        inventarioId = inventarioExistente.dataValues.inventarioId
      }     

      let productoExistente = false
      
      for (let i = 0; i < productosEnCarrito.length; i++) {
        if (productosEnCarrito[i].inventarioId === inventarioExistente.id) {
          productoExistente = true
        }
      }

      if (productoExistente) {
        if (cantidad <= 0 || cantidad > inventarioExistente.cantidad) {
          throw new Error(`La cantidad para el inventario con ID ${inventarioExistente.id} no es válida, la cantidad maxima permitida es ${inventarioExistente.cantidad}`);
        }
        for (let i = 0; i < productosEnCarrito.length; i++) {
          if (productosEnCarrito[i].inventarioId === inventarioExistente.id) {
            productosEnCarrito[i].cantidad = cantidad;
          }
        }

      }else{
         // Verificar si la cantidad solicitada es válida
      if (cantidad <= 0 || cantidad > inventarioExistente.cantidad) {
        throw new Error(`La cantidad para el inventario con ID ${inventarioExistente.id} no es válida.la cantidad maxima permitida es ${inventarioExistente.cantidad}`);
      }
      productosEnCarrito.push({
        inventarioId: inventarioExistente.id,
        productoId: inventarioExistente.productoId,
        colorId: inventarioExistente.colorId,
        cantidad,
      });
      }    

    }

    await Carrito.update({ productos: productosEnCarrito }, {
      where: {
        id: carritoExistente.id,
      },
    });

    let carritoenviar = await Carrito.findByPk(carritoExistente.id)

    carritoenviar.dataValues.id = `carr-${carritoenviar.dataValues.id}`;

    return carritoenviar
  } catch (error) {
    console.error('Error al agregar productos al carrito:', error.message);
    throw error;
   
  }
};
