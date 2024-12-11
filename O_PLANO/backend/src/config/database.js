import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});


pool.on('connect', () => {
    console.log('Conexão com Banco de Dados Estabelecida!');
});

pool.on('error', (err) => {
    console.log(`Erro na conexão com Banco de Dados ${err}`);
});


export default pool;