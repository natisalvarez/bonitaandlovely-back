const { Producto, Subcategoria, Inventario } = require('../../db');

module.exports = async () => {
  try {
    const productos = await Producto.findAll({
      include: {
        model: Subcategoria,
        attributes: ['name'],
        through: { attributes: [] },
      },
    });

    for (const producto of productos) {
      const inventarios = await Inventario.findAll({
        where: {
          productoId: producto.dataValues.id,
        },
      });
      let cantidad = 0;
      inventarios.forEach((inventario) => {
        cantidad += inventario.cantidad;
      });
      producto.dataValues.cantidad = cantidad;
      producto.dataValues.id = `prod-${producto.dataValues.id}`;
    }
    
    return productos;
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);
    throw error;
  }
};
