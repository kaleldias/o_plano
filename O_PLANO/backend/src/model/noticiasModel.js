import pool from '../config/database.js';


// Criar noticia no Banco de Dados
export const criarNoticia = async (usuarioId, titulo, conteudo, imageUrl) => {
    const query = `
        INSERT INTO noticias(usuario_id, titulo, conteudo, image_url)
        VALUES($1, $2, $3, $4)
        RETURNING id, titulo, conteudo, image_url,
	    TO_CHAR(data_publicacao, 'DD-MM-YYYY HH24:MI:SS') AS data_criacao,
	    TO_CHAR(updated_at, 'DD-MM-YYYY HH24:MI:SS') AS atualizado_em,
        usuario_id`;
    const result = await pool.query(query, [usuarioId, titulo, conteudo, imageUrl]);

    return result.rows[0];
}

// Recuperar todas as Notícias com paginação
export const listarNoticias = async (limit, offset) => {
    const query = `
        SELECT * FROM listar_noticias
        ORDER BY data_publicacao DESC
        LIMIT $1 OFFSET $2
    `;
    const result = await pool.query(query, [limit, offset]);

    return result.rows;
};

// Recuperar o número total de notícias para paginação
export const contarNoticias = async () => {
    const query = `SELECT COUNT(*) AS total FROM noticias`;
    const result = await pool.query(query);
    

    return parseInt(result.rows[0].total); // Retorna o total como número
};


// Recuperar  Notícia por ID
export const obterNoticiaPorId = async (id) => {
    const query = `SELECT * FROM listar_noticias WHERE id = $1`;
    const result = await pool.query(query, [id]);

    return result.rows[0];
    
}

//Atualizar notica
export const atualizarNoticia = async (id, titulo, conteudo, imageUrl) => {
    const query = `
        UPDATE noticias
        SET
            titulo = COALESCE($2, titulo),
            conteudo= COALESCE($3, conteudo),
            image_url = COALESCE($4, image_url)
        WHERE
	        id = $1
        RETURNING id, titulo, conteudo, image_url,
	    TO_CHAR(data_publicacao, 'DD-MM-YYYY HH24:MI:SS') AS data_criacao,
	    TO_CHAR(updated_at, 'DD-MM-YYYY HH24:MI:SS') AS atualizado_em,
        usuario_id`;
    const result = await pool.query(query, [id, titulo, conteudo, imageUrl]);

    return result.rows[0];
    
}


// Deletar  Notícia por ID
export const deletarNoticia = async (id) => {
    const query = `DELETE FROM noticias WHERE id = $1 RETURNING id, titulo, conteudo`;
    const result = await pool.query(query, [id]);

    return result.rows[0];
    
}



