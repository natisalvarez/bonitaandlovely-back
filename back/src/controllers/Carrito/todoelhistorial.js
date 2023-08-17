const { Carrito } = require('../../db');

module.exports = async () => {
  try {
    // Verificar si ya existe un carrito para el cliente
    const carritoExistente = await Carrito.findAll({
      where: {
        pagado:true
      },
    });

    if (!carritoExistente.length) {
      throw new Error(`No existe un historial para el el cliente con ID ${clienteId}.`);
    }

    carritoExistente.map(inventario => inventario.dataValues.id = `inv-${inventario.dataValues.id}`)
    

    return carritoExistente;
  } catch (error) {
    console.error('Error al ver registro en el carrito:', error.message);
    throw error;
  }
};
