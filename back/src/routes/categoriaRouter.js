const express = require('express');
const router = express.Router();

const getAllCategorias = require('../controllers/Categoria/getAllCategorias')
const postCategoria = require('../controllers/Categoria/postCategoria');
const postCategoriaArray = require('../controllers/Categoria/postCategoriaArray');
const putNameCategoria = require('../controllers/Categoria/putNameCategorias')
const putActiveCategoria = require('../controllers/Categoria/putActiveCategoria')
const deleteCategoria = require('../controllers/Categoria/deteleCategoria')
router.get('/', async (req,res)=>{
  try {
    let categorias = await getAllCategorias()
    res.status(200).send(categorias)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.post('/', async (req, res) => {

  let { name } = req.body;

  try {
    if (Array.isArray(req.body)) {
      const categorias = await postCategoriaArray(req.body)
      res.status(200).send(categorias);
    }else{
      const categoria =  await postCategoria(name);
      res.status(200).send(categoria);
    }
    
  } catch (error) {
    res.status(500).send({ error: error.message }); 
  }
});

router.put('/:categoriaId', async (req, res) => {
  const { categoriaId } = req.params;
  const { newName } = req.body;

  try {
    const updatedCategoria = await putNameCategoria(categoriaId, newName);
    res.status(200).json(updatedCategoria);
  } catch (error) {
    console.error('Error al actualizar el nombre de la categoría:', error);
    res.status(500).json({ error: `Ha ocurrido un error al actualizar el nombre de la categoría: ${error.message}` });
  }
});

router.put('/activate/:categoriaId', async (req, res) => {
  const { categoriaId } = req.params;

  try {
    const categoria = await putActiveCategoria(categoriaId);
    res.status(200).json(categoria);
  } catch (error) {
    console.error('Error al activar la categoría:', error);
    res.status(500).json({ error: `Ha ocurrido un error al activar la categoría: ${error.message}` });
  }
});

router.delete('/:categoriaId', async (req, res) => {
  const { categoriaId } = req.params;

  try {
    const updatedCategoria = await deleteCategoria(categoriaId);
    res.status(200).json(updatedCategoria);
  } catch (error) {
    console.error('Error al desactivar la categoría:', error.message);
    res.status(500).json({ error: `Ha ocurrido un error al desactivar la categoría: ${error.message}`, });
  }
});

module.exports = router;
