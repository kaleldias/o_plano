import { listarNoticias } from '../services/noticiaService.js';

// Renderizar a última notícia no Hero Section
async function renderHeroSection() {
    const heroImage = document.querySelector('.hero-image');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButton = document.querySelector('.hero-button');

    try {
        // Busca as notícias do backend
        const response = await listarNoticias();
        const noticias = response.data;

        if (noticias && noticias.length > 1) {
            const ultimaNoticia = noticias[noticias.length - 1]; // A notícia mais recente é a primeira do array
            console.log(ultimaNoticia)

            // Preenche o Hero Section com a última notícia

            heroImage.src = '/uploads/'+ultimaNoticia.imagem || '/uploads/elon-musk-capa.jpg';
            heroImage.alt = ultimaNoticia.titulo;
            heroTitle.textContent = ultimaNoticia.titulo;
            heroSubtitle.textContent = ultimaNoticia.conteudo.slice(0, 150) + '...'; // Resumo curto
            heroButton.href = `ver-noticia.html?id=${ultimaNoticia.id}`;
            
        } 
        else {
            console.warn('Nenhuma notícia encontrada.');
        }
    } 
    catch (error) {
        console.error('Erro ao carregar a última notícia:', error);
    }
}

// Renderizar as últimas notícias (exceto a do Hero Section) na página inicial
async function renderUltimasNoticias() {
    const newsContainer = document.querySelector('.news-cards-container');

    try {
        // Busca as notícias do backend
        const response = await listarNoticias();
        const noticias = response.data;
        console.log(noticias)
        if (noticias && noticias.length > 1) {
            const ultimasNoticias = noticias.slice(0, 8); // Ignora a primeira (Hero) e pega as próximas 6

            // Renderiza as notícias dinamicamente no HTML
            newsContainer.innerHTML = ultimasNoticias
                .map(
                    (noticia) => `
                    <article class="news-card">
                        <img src="/uploads/${noticia.imagem}" alt="${noticia.titulo}" class="news-card-img">
                        <div class="news-card-content">
                            <h3 class="news-card-title">${noticia.titulo}</h3>
                            <p class="news-card-excerpt">${noticia.conteudo.slice(0, 100)}...</p>
                            <a href="ver-noticia.html?id=${noticia.id}" class="read-more-link">Leia mais →</a>
                        </div>
                    </article>
                `
                )
                .join('');
        } else {
            newsContainer.innerHTML = `<p>Nenhuma notícia disponível para exibição.</p>`;
        }
    } catch (error) {
        console.error('Erro ao carregar as notícias:', error);
        newsContainer.innerHTML = `<p>Erro ao carregar as notícias. Tente novamente mais tarde.</p>`;
    }
}

// Inicializa o carregamento das notícias ao carregar a página

export { renderHeroSection, renderUltimasNoticias };