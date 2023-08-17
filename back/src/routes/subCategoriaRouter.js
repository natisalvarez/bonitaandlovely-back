const express = require('express');
const router = express.Router();

const deleteSubCategoria = require('../controllers/SubCategoria/deliteSubCategoria')

const putActiveSubCategoria = require('../controllers/SubCategoria/putActiveSubCategoria')

const putNameSubCategoria = require('../controllers/SubCategoria/putNameSubCategoria')

const postSubCategoria = require('../controllers/SubCategoria/postSubCategoria');

const postSubCategoriaArray = require('../controllers/SubCategoria/postSubCategoriaArray')

const getSubCategoria = require('../controllers/SubCategoria/getSubCategoria');


router.get('/:categoriaId', async (req, res) => {
  const { categoriaId } = req.params;

  try {
    const subcategorias = await getSubCategoria(categoriaId);
    res.status(200).json(subcategorias);
  } catch (error) {
    console.error('Error al obtener las subcategorías:', error);
    res.status(500).json({ error: 'Ha ocurrido un error al obtener las subcategorías.' });
  }
});


router.post('/', async (req, res) => {
  const { name, categoriaId } = req.body;

  try {
    if (Array.isArray(req.body)) {
      const subcategorias = await postSubCategoriaArray(req.body)
      res.status(200).send(subcategorias);

      return;
    }
    // Verificar que se proporcionen el nombre y el ID de la categoría principal
    if (!name || !categoriaId) {
      res.status(400).send({ error: 'Se requiere el nombre y el ID de la categoría principal para agregar una subcategoría.' });
      return;
    }

    // Llamar al controlador para crear la subcategoría
    const subcategoria = await postSubCategoria(name, categoriaId);
    res.status(200).send(subcategoria);
  } catch (error) {
    // Manejo de errores específicos desde el controlador
    res.status(500).send({ error: error.message });
  }
});

router.put('/:subcategoriaId', async (req, res) => {
  const { subcategoriaId } = req.params;
  const { newName } = req.body;

  try {
    const updatedSubcategoria = await putNameSubCategoria(subcategoriaId, newName);
    res.status(200).json(updatedSubcategoria);
  } catch (error) {
    console.error('Error al actualizar la subcategoría:', error);
    res.status(500).json({ error: 'Ha ocurrido un error al actualizar la subcategoría.' });
  }
});

router.put('/activate/:subcategoriaId', async (req, res) => {
  const { subcategoriaId } = req.params;

  try {
    const subcategoria = await putActiveSubCategoria(subcategoriaId);
    res.status(200).json(subcategoria);
  } catch (error) {
    console.error('Error al activar la subcategoría:', error);
    res.status(500).json({ error: 'Ha ocurrido un error al activar la subcategoría.' });
  }
});

router.delete('/:subcategoriaId', async (req, res) => {
  const { subcategoriaId } = req.params;

  try {
    const result = await deleteSubCategoria(subcategoriaId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al eliminar la subcategoría:', error);
    res.status(500).json({ error: 'Ha ocurrido un error al eliminar la subcategoría.' });
  }
});

module.exports = router;
