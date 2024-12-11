import {
    atualizarNoticia,
    criarNoticia,
    deletarNoticia,
    listarNoticias,
    obterNoticiaPorId,
    contarNoticias
} from '../model/noticiasModel.js';


// POST criar noticia
export const handleCriarNoticia = async (req, res) => {
    const { id: usuarioId } = req.user;
    const { titulo, conteudo } = req.body;
    const imageUrl = req.file ? req.file.filename : null; // Caminho do arquivo enviado

    try {
        if (!titulo || !conteudo) {
            throw new Error("Campos [Titulo] e [Conteúdo] não podem estar vazios!");
        }

        const data = await criarNoticia(usuarioId, titulo, conteudo, imageUrl);

        res.status(201).json({
            message: 'Noticia criada com sucesso',
            data
        });
    } catch (err) {
        res.status(500).json({
            error: 'Erro ao criar notícia.',
            description: err.message
        });
    }
};



// GET todas as notícias com paginação
export const handleListarNoticias = async (req, res) => {
    const { pagina = 1, itensPorPagina = 8 } = req.query; // Valores padrão para paginação

    const limit = parseInt(itensPorPagina);
    const offset = (parseInt(pagina) - 1) * limit; // Cálculo do offset com base na página e no limite

    try {
        // Recuperar as notícias paginadas e o total de notícias
        const noticias = await listarNoticias(limit, offset);
        const totalNoticias = await contarNoticias();

        res.status(200).json({
            message: 'success',
            current_page: parseInt(pagina),
            total_items: totalNoticias,
            total_pages: Math.ceil(totalNoticias / limit),
            data: noticias
        });
    } catch (err) {
        res.status(500).json({
            error: 'Erro ao listar notícias',
            description: err.message
        });
    }
};

// GET  notícia by ID
export const handleObterNoticiaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await obterNoticiaPorId(id);
        res.status(200).json({
            message: 'success',
            data
        })

    }
    catch (err) {
        res.status(500).json({
            error: 'Erro ao listar noticias',
            description: err.message
        })

    }

}


// PATCH atualizar noticia
export const handleAtualizarNoticia = async (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo } = req.body;

    const imageUrl = req.file ? req.file.filename : null;
    console.log('imagem: ',imageUrl)

    try {
        const data = await atualizarNoticia(id, titulo, conteudo, imageUrl);
        res.status(200).json({
            message: 'success',
            data
        });
    } catch (err) {
        res.status(500).json({
            error: 'Erro ao atualizar notícia.',
            description: err.message
        });
    }
};


// DELET  notícia by ID
export const handleDeletarNoticia = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await deletarNoticia(id);
        res.status(200).json({
            message: 'Notícia excluida com sucesso',
            data
        })

    }
    catch (err) {
        res.status(500).json({
            error: 'Erro ao deletar noticia',
            description: err.message
        })

    }

}