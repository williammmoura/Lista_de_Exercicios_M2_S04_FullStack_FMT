const express = require('express')
const listaController = require('../controllers/listaController')
const datasController = require('../controllers/datasController')

const router = express.Router()

router.patch('/', listaController.reordenarLista)
router.get('/datas/:mes', datasController.listarDatas)
router.post('/salvarDado', listaController.salvarDado)
router.get('/listarUsuarios', listaController.filtrarUsuarios)
router.put('/:id', listaController.alterarUsuario)
router.delete('/:id', listaController.deletarRoteiro)
router.get('/:id', listaController.obterNomeUsuario)
router.post('/', listaController.converterLetras);



module.exports = router