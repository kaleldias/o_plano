import pool from '../config/database.js';
import bcrypt from 'bcrypt';



export const createUser = async (nome, email, senha) => {
    //Verifica se os campos estão vazios
    if (!nome || !email || !senha) {
        throw new Error('Campos: [nome, email, senha] são obrigatórios!');
    }

    // Verifica se o email enviado para cadastro foi pre-autorizado pelo sistema
    const verificarEmail = await pool.query(`SELECT * FROM verificar_email_autorizado WHERE email = $1 `, [email]);
    if(verificarEmail.rowCount == 0){
        throw new Error("Você não tem permissão para se cadastrar! Por favor entre em contato com o suporte.");
    }

    // Hash de senha
    const saltRounds = 12;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // Executar cláusula SQL
    const query = `
        INSERT INTO usuarios(nome, email, senha)
        VALUES ($1, $2, $3)
        RETURNING id, nome, email, 
        TO_CHAR(data_criacao AT TIME ZONE 'America/Sao_Paulo', 'DD-MM-YYYY HH24:MI:SS') AS data_criacao, 
        role
    `;
    const result = await pool.query(query, [nome, email, senhaHash]);

    return result.rows[0];
}

// Buscar usuários pelo email
export const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    return result.rows[0];
}


// Buscar usuario pelo id
export const getUserById = async (id) => {
    const query = `
        SELECT 
            id, nome, email,
            TO_CHAR(data_criacao AT TIME ZONE 'America/Sao_Paulo', 'DD-MM-YYYY HH24:MI:SS') AS data_cadastro,
            role
        FROM
            usuarios
        WHERE
            id = $1`;
    const result = await pool.query(query, [id]);

    return result.rows[0];
}

// Buscar todos os usuarios - Função superAdmin
export const getAllUsers = async () => {
    const query = `
        SELECT 
            id, nome, email,
            TO_CHAR(data_criacao AT TIME ZONE 'America/Sao_Paulo', 'DD-MM-YYYY HH24:MI:SS') AS data_cadastro,
            role
        FROM
            usuarios`;
    const result = await pool.query(query);

    return result.rows;
}

export const updateUser = async (id, campos) => {
    const keys = Object.keys(campos);
    const values = Object.values(campos);
    const setClause = keys.map((campoAtual, index) => `${campoAtual} = $${index + 2}`);
    console.log(setClause);
    console.log(values);

    const query = `UPDATE usuarios SET ${setClause} WHERE id = $1 RETURNING id, nome, email, role`;
    const result = await pool.query(query, [id, ...values]);

    return result.rows[0];
}


// Atualiza Senha do Usuário
export const getUserPassword = async (id) => {
    const query = "SELECT id, senha FROM usuarios WHERE id =  $1";
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
        throw new Error('Usuário não encontrado.');
    }

    return result.rows[0];
}

export const updateUserPassword = async (id, novaSenhaHash) => {
    const query = "UPDATE usuarios SET senha = $1 WHERE id = $2";
    const result = await pool.query(query, [novaSenhaHash, id]);
    
    if (result.rowCount === 0) {
        throw new Error('Erro ao atualizar a senha. Usuário não encontrado.');
    }

    return result.rows[0]

}


// Deletar conta
export const deleteUserById = async (id) => {
    const query = "DELETE FROM usuarios WHERE id = $1 RETURNING id, nome, email, role";
    const result = await pool.query(query, [id]);

    if (result.rowCount == 0) {
        throw new Error('Usuário não encontrado')
    }

    return result.rows[0];
}