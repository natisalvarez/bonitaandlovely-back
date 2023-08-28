const { Carrito } = require('../../db');
const postCarrito = require('./postCarrito')
const putVentasInventario = require('../Inventario/putVentaInventario');

module.exports = async (clienteId, { pagado }) => {
  try {
    function extractNumberFromString(inputString) {
      const match = inputString.match(/\d+/);
      if (match) {
        return parseInt(match[0]);
      }
      return null;
    }
    
    clienteId = extractNumberFromString(clienteId);

    const carritoExistente = await Carrito.findOne({
      where: {
        clienteId,
        pagado: false,
      },
    });

    if (!carritoExistente) {
      throw new Error(`Carrito con ID ${clienteId} no encontrado.`);
    }

    const fecha = new Date().toLocaleString();

    await Carrito.update({ pagado: pagado, fechaCompra: fecha }, {
      where: {
        clienteId,
        pagado: false,
      },
    });

    let carritoenviar = await Carrito.findByPk(carritoExistente.dataValues.id);
    carritoenviar.dataValues.id = `carr-${carritoenviar.dataValues.id}`;

    // Verificar si el carrito tiene productos
    if (carritoenviar.productos.length === 0) {
      throw new Error(`El carrito está vacío no se puede pagar un carrito vacio.`);
    }

    let error = false;
    carritoenviar.productos.map(async (producto) => {
        try {
          let invenatrio = await putVentasInventario(producto.productoId, producto.colorId, producto.cantidad);
          console.log(invenatrio);
          if (typeof invenatrio === 'string') {
            error = true;
            console.log('entro');
          }
          
        } catch (error) {
          console.error('Error en putVentasInventario:', error.message);
          // Manejar el error aquí, tal vez registrarlo o hacer algo más
          // Pero no lo vuelvas a lanzar con "throw error"
        }
    });
    
    if (error) {
      throw new Error(`error al comprar por cantidad de producto supera el stock.`);
    }

    postCarrito({ clienteId: clienteId, productos: [] });


    return carritoenviar;
  } catch (error) {
    console.error('Error al marcar el carrito como pagado:', error.message);
    throw error;
  }
};
