const express = require('express');
const router = express.Router();

const getAllProveedores = require('../controllers/Proveedor/getAllProveedores');
const getIdProveedor = require('../controllers/Proveedor/getIdProveedor');
const postProveedor = require('../controllers/Proveedor/postProveedor');
const postArrayProveedor = require('../controllers/Proveedor/postArrayProveedor');
const putPropsProveedores = require('../controllers/Proveedor/putPropsProveedores')
const deleteProveedor = require('../controllers/Proveedor/deleteProveedor')
const putActiveProveedor = require('../controllers/Proveedor/putActiveProveedor')
// Ruta para obtener todos los proveedores
router.get('/', async (req, res) => {
  try {
    const proveedores = await getAllProveedores();
    res.status(200).json(proveedores);
  } catch (error) {
    console.error('Error al obtener los proveedores:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al obtener los proveedores.' });
  }
});

// Ruta para obtener un proveedor por su ID
router.get('/:proveedorId', async (req, res) => {
  const { proveedorId } = req.params;
  try {
    const proveedor = await getIdProveedor(proveedorId);
    res.status(200).json(proveedor);
  } catch (error) {
    console.error('Error al obtener el proveedor:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al obtener el proveedor.' });
  }
});

// Ruta para agregar un proveedor
router.post('/', async (req, res) => {
  try {
    const { name, link_catalogo, asesor, telefono, direccion, celular, correo_electronico, condiciones_pago } = req.body;

    if (Array.isArray(req.body)) {
      const proveedores = await postArrayProveedor(req.body);
      res.status(200).json(proveedores);
    } else {
      const proveedor = await postProveedor({
        name,
        link_catalogo,
        asesor,
        telefono,
        direccion,
        celular,
        correo_electronico,
        condiciones_pago
      });
      res.status(200).json(proveedor);
    }
  } catch (error) {
    console.error('Error al agregar el proveedor:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al agregar el proveedor.' });
  }
});

router.put('/:proveedorId', async (req, res) => {
  const { proveedorId } = req.params;
  const { name, link_catalogo, asesor, telefono, direccion, celular, correo_electronico, condiciones_pago } = req.body;
  
  try {
    const proveedor = await putPropsProveedores(proveedorId, {
      name,
      link_catalogo,
      asesor,
      telefono,
      direccion,
      celular,
      correo_electronico,
      condiciones_pago
    });

    res.status(200).json(proveedor);
  } catch (error) {
    console.error('Error al actualizar el proveedor:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al actualizar el proveedor.' });
  }
});

router.put('/activate/:proveedorId', async (req, res) => {
  const { proveedorId } = req.params;
  try {
    const proveedor = await putActiveProveedor(proveedorId); // Usar el controlador para cambiar activa a true
    res.status(200).json(proveedor);
  } catch (error) {
    console.error('Error al cambiar el estado del proveedor:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al cambiar el estado del proveedor.' });
  }
});

router.delete('/:proveedorId', async (req, res) => {
  const { proveedorId } = req.params;

  try {
    const proveedor = await deleteProveedor(proveedorId);
    res.status(200).json(proveedor);
  } catch (error) {
    console.error('Error al eliminar el proveedor:', error.message);
    res.status(500).json({ error: 'Ha ocurrido un error al eliminar el proveedor.' });
  }
});
module.exports = router;
