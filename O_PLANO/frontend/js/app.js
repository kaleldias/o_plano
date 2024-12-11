/**
 * Aqui nós controlamos a inicialização do Frontend:
 * Inicializar elementos ou configurações globais do front-end.
 * Carregar scripts ou componentes comuns, como a navbar ou rodapé.
 * Configurar eventos globais, caso necessário.
 */

import { carregarNavbar } from '../components/navbar/navbar.js';
import { carregarNavbarAdm } from '../components/navbar/navbarLogado.js';
import { exibirLoader, esconderLoader } from '../components/loader/loader.js';
import { marcarLinkAtivo, ajustarVisibilidadePorRole } from './utils/domUtils.js';
import { getUser } from './utils/storageUtils.js';

// Funções para inicializar páginas específicas
import { renderHeroSection, renderUltimasNoticias } from './pages/index.js';
import { renderNoticias } from './pages/noticias.js';
import renderNoticiaDetalhe from './pages/verNoticia.js';
import {renderPostsAdmin} from './pages/posts.js'; // Importando a função para a página de posts

// Mapeamento de inicialização de páginas
const pageInit = {
    'index.html': async () => {
        await renderHeroSection();
        await renderUltimasNoticias();
    },
    'noticias.html': async () => {
        await renderNoticias();
    },
    'ver-noticia.html': async () => {
        await renderNoticiaDetalhe();
    },
    'posts.html': async () => {
        await renderPostsAdmin();
    },
    'autorizacao.html': async () => {
        await renderPostsAdmin();
    },
};

async function initializeApp() {
    // Seleciona o conteúdo principal e exibe o loader
    const mainContent = document.querySelector('.main-content');
    exibirLoader();

    try {
        // Recupera o usuário do armazenamento local
        const user = getUser();
        let role = '';
        if (user && user.role) {
            role = user.role; // 'admin' ou 'superAdmin'
        }

        // Carrega a navbar apropriada com base no papel do usuário
        let navbarContainer;
        if (role === 'admin' || role === 'superAdmin') {
            navbarContainer = await carregarNavbarAdm();
        } else {
            navbarContainer = await carregarNavbar();
        }

        // Marca o link ativo e ajusta a visibilidade com base no papel
        if (navbarContainer) {
            marcarLinkAtivo(navbarContainer);
            ajustarVisibilidadePorRole(navbarContainer, role);
        }

        // Identifica a página atual e executa a inicialização específica
        const path = window.location.pathname.split('/').pop();
        if (pageInit[path]) {
            await pageInit[path](); // Executa a função correspondente à página
        }

        console.log('Aplicação carregada com sucesso.');
    } 
    catch (err) {
        console.error('Erro ao inicializar a aplicação:', err);
    } 
    finally {
        // Oculta o loader e exibe o conteúdo principal
        esconderLoader();
        if (mainContent) {
            mainContent.classList.remove('hidden');
        }
    }
}

// Executa a inicialização
document.addEventListener('DOMContentLoaded', initializeApp);
