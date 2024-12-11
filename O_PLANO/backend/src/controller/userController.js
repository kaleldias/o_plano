import {
    createUser,
    getAllUsers,
    getUserByEmail,
    getUserById,
    updateUser,
    getUserPassword,
    updateUserPassword,
    deleteUserById

} from "../model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



// Verifica se chave de assinatura no JWT esta definida no arquivo .env
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não definido. Configure o arquivo .env!');
}

const SECRET_KEY = process.env.JWT_SECRET;

// GET USER BY EMAIL - Login
export const handleUserLogin = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado!' })
        }

        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: 'Senha inválida!' })
        }

        // Gerar Token
        const accessToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Configurar cookie HTTP-only
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        });

        res.status(200).json({
            message: 'Login bem-sucedido',
            data: {
                id: user.id,
                email: user.email,
                role: user.role
            },
            access_token: accessToken
        });

    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao autenticar usuario. ' + err.message })
    }
}


// Logout
export const handleUserLogout = async (req, res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    })
    res.status(200).json({ message: 'Logout bem-sucedido!' })

}


// Cadastra um novo usuario
export const handleCreateUser = async (req, res) => {
    const { nome, email, senha } = req.body;
    
    try {
        const data = await createUser(nome, email, senha);
        res.status(201).json({
            message: 'Usuário criado com sucesso!',
            data
        })

    }
    catch (err) {
        if (err.message.includes('duplicate key value violates unique constraint')) {
            return res.status(500).json({ error: 'Usuário já cadastrado!' })
        }
        res.status(500).json({ 
            error: 'Erro ao criar usuário.' ,
            description: err.message
        });

    }

}


// GET user by id - Busca usuarios pelo id do token de autenticação
export const handleGetUserById = async (req, res) => {
    const { id } = req.user;

    try {
        const data = await getUserById(id);

        if (!data) {
            res.status(404).json({ error: 'Usuário não encontrado!' });
        }

        res.status(200).json({
            message: 'success',
            data
        })

    }
    catch (err) {
        console.log('Erro ao buscar usuário pelo ID informado. ', err.message)
        res.status(500).json({ error: 'Erro ao buscar usuário pelo ID informado.' });
    }

}

export const handleGetAllUsers = async (req, res) => {
    const { role } = req.user;
    const { id } = req.params

    try {

        if (role !== 'superAdmin') {
            throw new Error('Você não tem permissão para esse tipo de consulta!');
        }

        if (id) {
            const dataUsuarioId = await getUserById(id)
            res.status(200).json({
                message: 'success',
                data: dataUsuarioId
            });

        }
        else {
            const data = await getAllUsers();
            res.status(200).json({
                message: 'success',
                total_users: data.length,
                data
            });
        }

    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao buscar usuários. ' + err.message });

    }
}


//PATCH - Update dados do usuario
export const handleUpdateUser = async (req, res) => {
    const { id } = req.user;
    const dadosEnviados = req.body;

    try {
        // Chaves permitidas para atualização
        const camposPermitidos = ['nome', 'email'];

        // Filtrar apenas os campos permitidos
        const atualizacao = Object.keys(dadosEnviados).reduce((dadosFiltrados, campoAtual) => {
            if (camposPermitidos.includes(campoAtual)) {
                dadosFiltrados[campoAtual] = dadosEnviados[campoAtual];
            }
            return dadosFiltrados;
        }, {});

        if (Object.keys(atualizacao).length === 0) {
            return res.status(400).json({ error: 'Nenhum campo válido para atualizar' });
        }

        // Atualizar o usuário no banco de dados
        const updatedUser = await updateUser(id, atualizacao);

        res.status(200).json({
            message: 'Usuário atualizado com sucesso',
            data: updatedUser,
        });

    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar usuário: ' + err.message });
    }

}



// PATCH - Atualizar senha do usuario
export const handleUpdatePassword = async (req, res) => {
    const { id } = req.user //ID do usuário autenticado
    const { senhaAntiga, novaSenha } = req.body; // Pega o corpo da requisição 
    
    try {
        if (!senhaAntiga || !novaSenha) {
            return res.status(400).json({ error: 'Senha antiga e nova senha são obrigatórias.' });
        }

        if(senhaAntiga === novaSenha){
            return res.status(400).json({error: 'Nova senha não pode ser igual a senha atual!'})
        }

        if (novaSenha.length < 6) {
            return res.status(400).json({ error: 'A nova senha deve ter pelo menos 6 caracteres.' });
        }

        const userData = await getUserPassword(id);
        const userSenha = userData.senha;

        if (!userData) {
            return res.status(404).json({ error: 'Usuário não encontrado!' });
        }
        
        const senhaCorreta = await bcrypt.compare(senhaAntiga, userSenha)
        
        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Senha antiga incorreta' });
        }

        // Hash da nova senha
        const saltRounds = 12;
        const novaSenhaHash = await bcrypt.hash(novaSenha, saltRounds);

        await updateUserPassword(id, novaSenhaHash);

        res.status(200).json({
            message: 'Senha alterada com sucesso!',
        })

    }
    catch (err) {
        res.status(500).json({error: 'Falha ao atualizar senha. ' + err.message})
    }
}


// Deletar conta por id - [FUNÇÃO SUPER ADMIN]
export const handleDeleteUserById = async (req, res) => {
    const { role } = req.user;
    const requestedId = req.params.id
    console.log(requestedId)

    try {
        if (role !== 'superAdmin') {
            return res.status(403).json({ error: 'Você não tem permissão para executar esta ação!' })
        }

        const deletedUser = await deleteUserById(requestedId);

        res.status(200).json({
            message: `Usuário com ID '${requestedId}' foi deletado com sucesso`,
            data: deletedUser
        })

    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao deletar usuário: ' + err.message });
    }
}