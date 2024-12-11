import express from 'express';
import {
    handleCreateUser,
    handleDeleteUserById,
    handleGetAllUsers,
    handleGetUserById,
    handleUpdatePassword,
    handleUpdateUser,
    handleUserLogin,
    handleUserLogout
} from "../controller/userController.js";
import { verificarToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/cadastro', handleCreateUser); //Cadastra um novo usuario
router.post('/login', handleUserLogin); //Cadastra um novo usuario
router.post('/logout', handleUserLogout); //Desloga o usuario
router.get('/eu', verificarToken, handleGetUserById); //Cadastra um novo usuario
router.patch('/eu', verificarToken, handleUpdateUser); //Atualiza dados do usuario
router.patch('/senha', verificarToken, handleUpdatePassword); //Atualiza senha do usuario



// Rota para permitir acesso a paginas restritas no front com base na autenticação do usuário
router.get('/token', verificarToken, (req, res) => {
    res.status(200).json({
        message: 'Token válido',
        user: req.user
    })
})

router.get('/', verificarToken, handleGetAllUsers); //Busca todos os usuários - [FUNÇÃO SUPER ADMIN]
router.get('/:id', verificarToken, handleGetAllUsers); //Busca usuários por id - [FUNÇÃO SUPER ADMIN]
router.delete('/:id', verificarToken, handleDeleteUserById); //Deleta usuário por id - [FUNÇÃO SUPER ADMIN]


export default router;