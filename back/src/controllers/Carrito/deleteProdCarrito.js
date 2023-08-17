const { Carrito, Cliente, Inventario } = require('../../db');

module.exports = async (clienteId, Productosaeliminar) => {
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
    let nuevoCarrito = []

    let { inventarioId, productoId, colorId } = Productosaeliminar;

      let inventarioExistente;
      // Verificar si el inventario existe
      if (inventarioId) {
        inventarioExistente = await Inventario.findByPk(inventarioId);
        if (!inventarioExistente) {
          throw new Error(`El inventario con ID ${inventarioId} no existe.`);
        }
        productoId = inventarioExistente.dataValues.productoId
        colorId = inventarioExistente.dataValues.colorId
      }else if (productoId && colorId) {
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
      
      console.log(`inventario ${inventarioExistente.id}`);
      console.log(`producto ${inventarioExistente.productoId}`);
      console.log(`color ${inventarioExistente.colorId}`);

      for (let i = 0; i < productosEnCarrito.length; i++) {
        if (productosEnCarrito[i].inventarioId !== inventarioExistente.id) {
            nuevoCarrito.push(productosEnCarrito[i])
        }        
      }
      

    await Carrito.update({ productos: nuevoCarrito }, {
      where: {
        id: carritoExistente.id,
      },
    });

    let carritoenviar = await Carrito.findByPk(carritoExistente.id)

    carritoenviar.dataValues.id = `carr-${carritoenviar.dataValues.id}`;

    return carritoenviar;
  } catch (error) {
    console.error('Error al eliminar productos al carrito:', error.message);
    throw error;
   
  }
};
