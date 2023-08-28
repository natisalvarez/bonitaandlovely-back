const { Reviwers, Carrito, Producto, Cliente } = require('../../db');

module.exports = async (clienteId, productoId, rating, comentario) => {
    try {
        // Verificar la existencia del producto
        const productoExistente = await Producto.findByPk(productoId);

        if (!productoExistente) {
            throw new Error('El producto no existe.');
        }

        const clienteExistente = await Cliente.findByPk(clienteId);
        
        if (!clienteExistente) {
            throw new Error('El cliente no existe.');
        }

        // Verificar si el cliente ha realizado una compra pagada del producto
        const carritosPagados = await Carrito.findOne({
            where: {
                clienteId,
                pagado: true,
            },
        });
        
        let haCompradoElProducto = false;
        
        if (carritosPagados) {
            haCompradoElProducto = carritosPagados.productos.some(producto => producto.productoId === productoId);
        }
        
        if (!haCompradoElProducto) {
            throw new Error('Debes comprar el producto antes de dejar una reseña.');
        }
        
       

        // Verificar si el cliente ya ha dejado una reseña para el producto
        const reseñaExistente = await Reviwers.findOne({
            where: {
                clienteId,
                productoId,
            },
        });

        if (reseñaExistente) {
            throw new Error('Ya has dejado una reseña para este producto.');
        }

        // Crear la reseña
        const nuevaReseña = await Reviwers.create({
            rating,
            comentario,
            fecha: new Date(), 
            clienteId,
            productoId,
        });

        return nuevaReseña;
    } catch (error) {
        console.error('Error al agregar la reseña en la base de datos:', error.message);
        throw error;
    }
};