import {
    atualizarPreCadastro,
    criarPreCadastro,
    deletePreCadastro,
    getPreCadastroById,
    listarPreCadastros
} from "../model/preCadastroAdminModel.js";


export const handleCriarPreCadastro = async (req, res) => {
    const { email } = req.body
    const { id: superAdminId, role } = req.user;
    console.log(email)

    try {
        if (role !== 'superAdmin') {
            throw new Error('Operação Proibida!')
        }

        if (!email || !superAdminId) {
            throw new Error('Valor de [email] e [idCriador] são obrigatórios na request!');

        }

        const data = await criarPreCadastro(email, superAdminId);

        res.status(201).json({
            message: 'Email de pré-cadastro autorizado com sucesso.',
            data
        })



    }
    catch (err) {
        res.status(500).json({ error: 'Erro no registro de pre-cadastro.' + err.message });

    }

}


export const handleListarPreCadastros = async (req, res) => {
    const { role } = req.user;

    try {
        if (role !== 'superAdmin') {
            throw new Error("Você não tem permissão para esse tipo de consulta!");
        }

        const data = await listarPreCadastros();

        res.status(200).json({
            message: 'success',
            total_items: data.length,
            data
        })

    }
    catch (err) {
        res.status(500).json({
            error: 'Erro ao listar emails autorizados para cadastro.',
            description: err.message
        })

    }
}

export const handleGetPreCadastroById = async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;

    try {
        if(role !== 'superAdmin'){
            throw new Error("Você não tem autorização para realizar esta consulta!");
        }

        const data = await getPreCadastroById(id);
        res.status(200).json({
            message: 'success',
            data
        })
        
    } 
    catch (err) {
        res.status(500).json({
            error: 'Erro ao tentar fazer consulta',
            description: err.message
        })
        
    }

}


export const handleAtualizarPreCadastro = async (req, res) => {
    const { email, status } = req.body;
    const { id: idModificador, role } = req.user;
    const { id } = req.params;

    console.log(`email ${email}, status: ${status}`);
    console.log(`idModificador: ${idModificador}`);
    console.log(`idRegistro: ${id}`);

    try {
        if (role !== 'superAdmin') {
            throw new Error("Ação não permitida! Você não tem priviégios suficientes para executar esta ação!");

        }
        const data = await atualizarPreCadastro(id, email, status, idModificador);
        res.status(200).json({
            message: 'Alteração realizada',
            data
        })

    }
    catch (err) {
        res.status(500).json({
            error: 'Falha ao tentar atualzar dados.',
            description: err.message
        })

    }
}


// Deletar email autorizado para cadastro
export const handleDeletePreCadastro = async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;

    try {
        if (role !== 'superAdmin') {
            throw new Error("Você não tem permissão para executar esta ação");
        }

        const data = await deletePreCadastro(id);
        res.status(200).json({
            message: 'Autorização removida com sucesso',
            data
        })

    }
    catch (err) {
        res.status(500).json({
            err: 'Erro ao tentar remover autorização.',
            description: err.message
        })

    }

}