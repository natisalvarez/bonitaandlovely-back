const express = require('express');
const router = express.Router();

const getDescuentos = require('../controllers/Descuento/GetDescuentos');
const postDescuento = require('../controllers/Descuento/postDescuento');
const postDescuentoArray = require('../controllers/Descuento/postDescuentoArray');
const putPropsDescuentos = require('../controllers/Descuento/putPropsDescuentos')
const deleteDescuento = require('../controllers/Descuento/deleteDescuento')
const putActiveDescuentos = require('../controllers/Descuento/putActiveDescuento')

// Ruta para obtener todos los descuentos
router.get('/', async (req, res) => {
  try {
    const descuentos = await getDescuentos();
    res.status(200).json(descuentos);
  } catch (error) {
    console.error('Error al obtener los descuentos:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al obtener los descuentos.' });
  }
});

// Ruta para crear un solo descuento o varios descuentos
router.post('/', async (req, res) => {
  try {
    const { name, porcentaje, codigo, condiciones } = req.body;

    if (Array.isArray(req.body)) {
      const descuentos = await postDescuentoArray(req.body);
      res.status(200).json(descuentos);
    } else {
      const descuento = await postDescuento(
        name,
        porcentaje,
        codigo,
        condiciones
      );
      res.status(200).json(descuento);
    }
  } catch (error) {
    console.error('Error al crear el descuento:', error.message);
    res.status(500).json({ error: `Ha ocurrido un error al crear el descuento: ${error.message}` });
  }
});

// Ruta para actualizar las propiedades de un descuento por su ID
router.put('/:descuentoId', async (req, res) => {
  const { descuentoId } = req.params;
  const dataToUpdate = req.body;

  try {
    const descuento = await putPropsDescuentos(descuentoId, dataToUpdate);
    res.status(200).json(descuento);
  } catch (error) {
    console.error('Error al actualizar el descuento:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al actualizar el descuento.' });
  }
});

// Ruta para activar un descuento por su ID
router.put('/activate/:descuentoId', async (req, res) => {
  const { descuentoId } = req.params;

  try {
    const descuento = await putActiveDescuentos(descuentoId);
    res.status(200).json(descuento);
  } catch (error) {
    console.error('Error al activar el descuento:', error.message);
    res.status(500).json({ error: `Ha ocurrido un error al activar el descuento: ${error.message}` });
  }
});

// Ruta para eliminar un descuento
router.delete('/:descuentoId', async (req, res) => {
  const { descuentoId } = req.params;

  try {
    const descuento = await deleteDescuento(descuentoId);
    res.status(200).json(descuento);
  } catch (error) {
    console.error('Error al eliminar el descuento:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al eliminar el descuento.' });
  }
});

module.exports = router;
