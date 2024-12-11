import express from 'express';
import {
    handleAtualizarNoticia,
    handleCriarNoticia,
    handleDeletarNoticia,
    handleListarNoticias,
    handleObterNoticiaPorId,
    

} from '../controller/noticiasController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

router.post('/criar-noticia', verificarToken, upload.single('imagemPost'), handleCriarNoticia); //Cria um post de Notícia
router.get('/', handleListarNoticias); //Busca todas notícias
router.get('/:id', handleObterNoticiaPorId); //Busca notícia por ID
router.patch('/:id',verificarToken, upload.single('imagemPost'), handleAtualizarNoticia); //Atualizar notícia por ID
router.delete('/:id',verificarToken, handleDeletarNoticia); //Deletar notícia por ID

export default router;