const express = require('express');
const router = express.Router();

const getIdCarrito = require('../controllers/Carrito/getIdCarrito');
const historialCarrito = require('../controllers/Carrito/historialCarritos');
const historialProductos = require('../controllers/Carrito/historialCompras');
const postCarrito = require('../controllers/Carrito/postCarrito');
const postArrayCarrito = require('../controllers/Carrito/postArrayCarrito');
const putProdCarrito = require('../controllers/Carrito/putProdCarrito');
const putPagadoCarrito = require('../controllers/Carrito/putPagadoCarrito');
const deleteProdCarrito = require('../controllers/Carrito/deleteProdCarrito');
const gettodoelhistorial = require ('../controllers/Carrito/todoelhistorial')


router.get('/:clientesId', async (req, res) => {
  const { clientesId } = req.params;
  try {
    const carrito = await getIdCarrito(clientesId);
    res.status(200).json(carrito);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get('/historial/:clientesId', async (req, res) => {
  const { clientesId } = req.params;
  try {
    const carrito = await historialCarrito(clientesId);
    res.status(200).json(carrito);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get('/historialproducto/:clientesId', async (req, res) => {
  const { clientesId } = req.params;
  try {
    const carrito = await historialProductos(clientesId);
    res.status(200).json(carrito);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get('/Todohistorial/:clientesId', async (req, res) => {
  const { clientesId } = req.params;
  try {
    const carrito = await gettodoelhistorial(clientesId);
    res.status(200).json(carrito);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post('/', async (req, res) => {
  try {

    if (Array.isArray(req.body)) {
      const carritos = await postArrayCarrito(req.body);
      res.status(200).json(carritos);
    } else {
      const { clienteId, productos } = req.body;

    if (!clienteId || !productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ error: 'Datos de cliente y productos requeridos en el cuerpo de la solicitud.' });
    }

    const carrito = await postCarrito({ clienteId, productos });
    res.status(200).json(carrito);
    }
  } catch (error) {
    res.status(500).json({ error: `Error al crear el carrito: ${error.message}` });
  }
});

router.put('/:clienteId', async (req, res) => {

  const { clienteId } = req.params;
  const { productos } = req.body;

  try {
    const updatedCarrito = await putProdCarrito(clienteId, productos);
    return res.status(200).json(updatedCarrito);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.put('/pagado/:clienteId', async (req, res) => {

  const { clienteId } = req.params;

  try {
    const updatedCarrito = await putPagadoCarrito(clienteId, req.body);
    return res.status(200).json(updatedCarrito);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.delete('/:clienteId', async (req, res) => {

  const { clienteId } = req.params;

  try {
    const updatedCarrito = await deleteProdCarrito(clienteId, req.body);
    return res.status(200).json(updatedCarrito);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});


module.exports = router;
