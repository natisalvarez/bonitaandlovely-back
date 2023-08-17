const express = require('express');
const router = express.Router();

const getAllMarca = require('../controllers/Marca/getAllMarca')
const postMarca = require('../controllers/Marca/postMarca')
const postArrayMarca = require('../controllers/Marca/postArrayMarca')
const putNameMarca = require('../controllers/Marca/putNameMarca')
const putActiveMarca = require('../controllers/Marca/putActiveMarca')
const deleteMarca = require('../controllers/Marca/deleteMarca')

router.get('/', async (req,res)=>{
  try {
    let marca = await getAllMarca()
    res.status(200).send(marca)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.post('/', async (req, res) => {
    try {
      const { name } = req.body;
  
      if (Array.isArray(req.body)) {
        const marcas = await postArrayMarca(req.body);
        res.status(200).json(marcas);
      } else {
        const marca = await postMarca(name);
        res.status(200).json(marca);
      }
    } catch (error) {
      console.error('Error al agregar la marca:', error.message);
      res.status(500).json({ error: 'Ha ocurrido un error al agregar la marca.' });
    }
  });

  router.put('/:marcaId', async (req, res) => {
    const { marcaId } = req.params;
    const { newName } = req.body;
  
    try {
      const updatedMarca = await putNameMarca(marcaId, newName);
      res.status(200).json(updatedMarca);
    } catch (error) {
      console.error('Error al actualizar el nombre de la marca:', error);
      res.status(500).json({ error: 'Ha ocurrido un error al actualizar el nombre de la marca.' });
    }
  });

  router.put('/activate/:marcaId', async (req, res) => {
    const { marcaId } = req.params;
  
    try {
      const marca = await putActiveMarca(marcaId);
      res.status(200).json(marca);
    } catch (error) {
      console.error('Error al activar la marca:', error.message);
      res.status(500).json({ error: 'Ha ocurrido un error al activar la marca.' });
    }
  });


  router.delete('/:marcaId', async (req, res) => {
    const { marcaId } = req.params;
  
    try {
      const updatedMarca = await deleteMarca(marcaId);
      res.status(200).json(updatedMarca);
    } catch (error) {
      console.error('Error al desactivar la marca:', error.message);
      res.status(500).json({ error: 'Ha ocurrido un error al desactivar la marca.' });
    }
  });

module.exports = router;
