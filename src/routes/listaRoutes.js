const express = require('express');
const listaController = require('../controllers/listaController');

const router = express.Router();

router.patch('/', listaController.reordenarLista);

module.exports = router;