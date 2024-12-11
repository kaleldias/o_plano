import express from 'express';
import {
    handleAtualizarPreCadastro,
    handleCriarPreCadastro,
    handleDeletePreCadastro,
    handleGetPreCadastroById,
    handleListarPreCadastros

} from '../controller/preCadastroAdminController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/admin/pre-cadastrar', verificarToken, handleCriarPreCadastro)
router.get('/admin/todos', verificarToken, handleListarPreCadastros)
router.get('/admin/:id', verificarToken, handleGetPreCadastroById)
router.patch('/admin/:id', verificarToken, handleAtualizarPreCadastro)
router.delete('/admin/:id', verificarToken, handleDeletePreCadastro)


export default router;