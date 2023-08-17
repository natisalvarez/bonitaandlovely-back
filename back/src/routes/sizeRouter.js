const express = require('express');
const router = express.Router();

const getAllSize = require('../controllers/size/getAllSize');
const postSize = require('../controllers/size/postSize');
const postArraySize = require('../controllers/size/postArraySize');
const putNameSize = require('../controllers/size/putNameSize');
const putActiveSize = require('../controllers/size/putActiveSize');
const deleteSize = require('../controllers/size/deleteSize');

router.get('/', async (req, res) => {
  try {
    const tamanios = await getAllSize();
    res.status(200).json(tamanios);
  } catch (error) {
    console.error('Error al obtener los Tamaños:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al obtener los Tamaños.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    if (Array.isArray(req.body)) {
      const tamanios = await postArraySize(req.body);
      res.status(200).json(tamanios);
    } else {
      const tamanio = await postSize(name);
      res.status(200).json(tamanio);
    }
  } catch (error) {
    console.error('Error al agregar el tamaño:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al agregar el tamaño.' });
  }
});

router.put('/:sizeId', async (req, res) => {
  const { sizeId } = req.params;
  const { newName } = req.body;

  try {
    const updatedSize = await putNameSize(sizeId, newName);
    res.status(200).json(updatedSize);
  } catch (error) {
    console.error('Error al actualizar el nombre del tamaño:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al actualizar el nombre del tamaño.' });
  }
});

router.put('/activate/:sizeId', async (req, res) => {
  const { sizeId } = req.params;

  try {
    const size = await putActiveSize(sizeId);
    res.status(200).json(size);
  } catch (error) {
    console.error('Error al activar el tamaño:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al activar el tamaño.' });
  }
});

router.delete('/:sizeId', async (req, res) => {
  const { sizeId } = req.params;

  try {
    const updatedSize = await deleteSize(sizeId);
    res.status(200).json(updatedSize);
  } catch (error) {
    console.error('Error al desactivar el tamaño:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al desactivar el tamaño.' });
  }
});

module.exports = router;
