import { listarNoticias } from '../services/noticiaService.js';

const noticiasContainer = document.querySelector('.news-grid');
const loadMoreBtn = document.querySelector('.load-more-btn');

let paginaAtual = 1;
const itensPorPagina = 4; // Número fixo de itens carregados por vez

// Função para carregar notícias dinamicamente
async function renderNoticias() {
    try {
        // Faz a requisição para buscar as notícias da página atual
        const response = await listarNoticias(paginaAtual, itensPorPagina);
        const noticias = response.data;

        // Renderiza as notícias no container
        noticias.forEach((noticia) => {
            const noticiaHTML = `
                <article class="news-item">
                    <img src="/uploads/${noticia.imagem}" alt="${noticia.titulo}" class="news-item-img">
                    <div class="news-item-content">
                        <h2 class="news-item-title">${noticia.titulo}</h2>
                        <p class="news-item-excerpt">${noticia.conteudo.slice(0, 100)}...</p>
                        <a href="ver-noticia.html?id=${noticia.id}" class="news-item-link">Leia mais →</a>
                    </div>
                </article>
            `
            console.log(noticia.image_url);
            noticiasContainer.insertAdjacentHTML('beforeend', noticiaHTML);
        });

        // Verifica se ainda há mais notícias para carregar
        if (noticias.length < itensPorPagina) {
            loadMoreBtn.style.display = 'none'; // Esconde o botão se todas as notícias forem carregadas
        }
    } catch (error) {
        console.error('Erro ao carregar notícias:', error);
        noticiasContainer.innerHTML = `<p>Erro ao carregar as notícias. Tente novamente mais tarde.</p>`;
    }
}

// Evento do botão "Carregar mais"
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        paginaAtual++;
        renderNoticias();
    });
}

// Inicializar o carregamento da primeira página
export { renderNoticias };
