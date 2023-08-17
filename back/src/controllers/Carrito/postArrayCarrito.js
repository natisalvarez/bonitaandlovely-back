const { Carrito, Cliente, Inventario } = require('../../db');

module.exports = async (carritos) => {
  try {
    const carritosCreados = [];

    async function crearCarrito(carrito) {
      const { clienteId, productos } = carrito;

      // Verificar si el cliente existe
      const clienteExistente = await Cliente.findByPk(clienteId);
      if (!clienteExistente) {
        throw new Error(`El cliente con ID ${clienteId} no existe.`);
      }
      
      const carritoExistente = await Carrito.findOne({
        where: {
          clienteId,
          pagado:false
        },
      });
  
      if (carritoExistente) {
        throw new Error(`Ya existe un carrito para el cliente con ID ${clienteId}.`);
      }

      const carritoProductos = [];
      for (const producto of productos) {
        const { inventarioId, cantidad, productoId, colorId } = producto;

        let inventarioExistente;

        // Verificar si el inventario existe
        if (inventarioId) {
          inventarioExistente = await Inventario.findByPk(inventarioId);
          if (!inventarioExistente) {
            throw new Error(`El inventario con ID ${inventarioId} no existe.`);
          }
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
        }

        // Verificar si la cantidad solicitada es válida
        if (cantidad <= 0 || cantidad > inventarioExistente.cantidad) {
          throw new Error(`La cantidad para el inventario con ID ${inventarioExistente.id} no es válida.`);
        }

        carritoProductos.push({
          inventarioId: inventarioExistente.id,
          productoId: inventarioExistente.productoId,
          colorId: inventarioExistente.colorId,
          cantidad,
        });
      }

      // Crear el registro en la tabla de carrito
      const nuevoCarrito = await Carrito.create({
        clienteId,
        productos: carritoProductos,
      });

      carritosCreados.push(nuevoCarrito);
    }

    await Promise.all(carritos.map(crearCarrito));

    return carritosCreados;
  } catch (error) {
    console.error('Error al agregar registros en el carrito:', error.message);
    throw error;
  }
};
