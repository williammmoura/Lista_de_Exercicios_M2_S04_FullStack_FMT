const express = require('express')
const listaController = require('../controllers/listaController')
const datasController = require('../controllers/datasController')

const router = express.Router()

router.patch('/', listaController.reordenarLista)
router.get('/datas/:mes', datasController.listarDatas)
router.post('/salvarDado', listaController.salvarDado);


module.exports = router