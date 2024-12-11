import { getNoticia } from '../services/noticiaService.js';
import { showFeedback } from '../utils/domUtils.js';
import { carregarNavbar } from '../../components/navbar/navbar.js';
import { formatDate } from '../utils/formatUtils.js';

// Função principal para carregar os detalhes da notícia
async function renderNoticiaDetalhe() {
    // Carrega a navbar
    await carregarNavbar();

    // Seleciona o elemento de feedback
    const feedback = document.getElementById('feedback');

    // Obtém o ID da notícia da query string
    const params = new URLSearchParams(window.location.search);
    const noticiaId = params.get('id');

    if (!noticiaId) {
        showFeedback(feedback, 'error', 'ID da notícia não fornecido.');
        return;
    }

    try {
        // Exibe mensagem de carregamento
        showFeedback(feedback, 'info', 'Carregando notícia...');

        // Faz a requisição da notícia pelo ID
        const response = await getNoticia(noticiaId);
        const noticia = response.data;

        // Atualiza os elementos do HTML com os dados da notícia
        const noticiaContainer = document.querySelector('.noticia-container');
        /*
        noticiaContainer.innerHTML = `
            <h1 id="tituloNoticia">${noticia.titulo}</h1>
            <p class="metadata" id="dataAutor">${noticia.autor}</p>
            <img src="../../img/${noticia.imagem}" id="imagemNoticia" alt="Imagem da Notícia" class="noticia-imagem" />
            <article id="conteudoNoticia">${noticia.conteudo}</article>
            <div id="feedback" class="feedback" style="display:none;"></div>
        `;*/




        const titulo = document.querySelector('#tituloNoticia');
        const conteudo = document.querySelector('#conteudoNoticia');
        const autor = document.querySelector('#dataAutor');
        const imagem = document.querySelector('#imagemNoticia');
        
        

        titulo.innerHTML = noticia.titulo;
        conteudo.innerHTML = noticia.conteudo;
        autor.innerHTML = `Por: ${noticia.autor}, ${formatDate(noticia.data_publicacao)}`;
        

        

        
        if (noticia.imagem) {
            imagem.setAttribute("src", `/uploads/${noticia.imagem}`);

            imagem.style.display = 'block';
        } 
        else {
            imagem.style.display = 'none'; // Oculta o elemento se não houver imagem
        }

        

        // Remove mensagem de carregamento
        feedback.style.display = 'none';
    } 
    catch (error) {
        showFeedback(
            feedback,
            'error',
            'Erro ao carregar notícia: ' + error.message
        );
    }
}

// Exporta a função para ser usada no app.js
export default renderNoticiaDetalhe;
