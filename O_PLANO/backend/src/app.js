import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';


// Importação de rotas
import userRoutes from './routes/userRoutes.js';
import preCadastroAdminRoutes from './routes/preCadastroAdminRoutes.js';
import noticiasRoutes from './routes/noticiasRoutes.js';

// Configurações do diretório
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../uploads');



const app = express();

// Middlewares globais
app.use(express.json()); // Interpreta JSON no body
app.use(cookieParser()); // Gerencia cookies

// Servir arquivos estáticos do frontend e uploads
app.use(express.static(path.join(__dirname, '../../frontend'))); // Servir frontend
app.use('/uploads', express.static(uploadsDir)); // Servir uploads

// Endpoint de teste
app.get('/api', (req, res) => {
    res.json({ message: 'API O Plano funcionando!' });
});

// Rotas da API
app.use('/api/usuarios', userRoutes); // Rota de usuários
app.use('/api/autorizacao', preCadastroAdminRoutes); // Rota de autorização
app.use('/api/noticias', noticiasRoutes); // Rota de notícias

// Rota fallback para o frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

export default app;
