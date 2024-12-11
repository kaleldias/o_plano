import pool from "../config/database.js";


// Cria email de pre-autorização para cadastrar admins
export const criarPreCadastro = async (email, idCriador) => {
    const query = `
        INSERT INTO pre_cadastro_admin(email, id_superadmin_criador)
        VALUES($1, $2)
        RETURNING id, email, status,
	    TO_CHAR(data_criacao AT TIME ZONE 'UTC-3', 'DD-MM-YYYY HH24:MI:SS') AS data_criacao,
	    TO_CHAR(updated_at AT TIME ZONE 'UTC-3', 'DD-MM-YYYY HH24:MI:SS') AS atualizado_em,
	    id_superadmin_criador,
	    id_superadmin_modificador
    `;
    const result = await pool.query(query, [email, idCriador]);

    return result.rows[0];
}

// Listagem de todos os emails autorizados para cadastro na plataforma
export const listarPreCadastros = async () => {
    const query = `SELECT * FROM verificar_email_autorizado`;
    const result = await pool.query(query);

    return result.rows;
    
}

export const getPreCadastroById = async (id) => {
    const query = `SELECT * FROM verificar_email_autorizado WHERE id = $1`
    const result = await pool.query(query, [id]);

    return result.rows[0];
    
}


// Atualização/modificação de dados de email autorizado para cadastro
export const atualizarPreCadastro =  async (id, email, status, idModificador) => {
    const query = `
        UPDATE pre_cadastro_admin
        SET
            email = COALESCE($2, email),
            status = COALESCE($3, status),
            id_superadmin_modificador = $4
        WHERE
            id = $1
        RETURNING id, email, status,
	    TO_CHAR(data_criacao AT TIME ZONE 'UTC-3', 'DD-MM-YYYY HH24:MI:SS') AS data_criacao,
	    TO_CHAR(updated_at AT TIME ZONE 'UTC-3', 'DD-MM-YYYY HH24:MI:SS') AS atualizado_em,
	    id_superadmin_criador AS id_criador,
	    id_superadmin_modificador AS id_modificador`;
    const result = await pool.query(query, [id, email, status, idModificador]);

    return result.rows[0];
   
    
}


export const deletePreCadastro = async (id) => {
    const query = `DELETE FROM pre_cadastro_admin WHERE id = $1 RETURNING id, email`;
    const result = await pool.query(query, [id]);

    return result.rows[0];
    
}