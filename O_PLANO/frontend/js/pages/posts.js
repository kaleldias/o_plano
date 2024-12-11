import { showFeedback } from "../utils/domUtils.js";
import { listarNoticias, criarNoticia, deletarNoticia, atualizarNoticia } from "../services/noticiaService.js";
import { formatDate } from "../utils/formatUtils.js";

export async function renderPostsAdmin() {
    const feedback = document.getElementById("feedback");
    const postsGrid = document.querySelector(".posts-grid");
    const dialog = document.getElementById("dialog-editar-post");
    const btnCreatePost = document.getElementById("btn-create-post");
    const tituloInput = document.getElementById("tituloEdicao");
    const conteudoInput = document.getElementById("conteudoEdicao");
    const btnSave = document.getElementById("btn-save");
    const btnDelete = dialog.querySelector(".btn-delete");
    const imagemInput = document.querySelector('#imagemPost')
    console.log(btnDelete)

    if (!postsGrid || !dialog || !btnCreatePost || !tituloInput || !conteudoInput || !btnSave || !btnDelete || !imagemInput) {
        console.error("Elementos do DOM não encontrados. Verifique o HTML.");
        return;
    }

    let currentPage = 1;
    const itemsPerPage = 8; // Número de posts por página


    async function carregarPosts(page = 1, limit = itemsPerPage) {
        try {
            const data = await listarNoticias(page, limit); // Lista os posts com paginação
            const postList = data.data;

            postList.forEach((post) => {
                const div = document.createElement("div");
                const dataPost = formatDate(post.data_publicacao);

                div.classList.add("post-card");
                div.setAttribute("data-post-id", post.id);

                div.innerHTML = `
                    <div class="post-image">
                        <img src="/uploads/${post.imagem}" alt="${post.titulo}">
                    </div>
                    <div class="post-content">
                        <h3 class="post-title">${post.titulo}</h3>
                        <p class="post-meta">${dataPost} <br><span class="detail-who">Por: ${post.autor}</span></p>
                        <p class="post-conteudo">${post.conteudo.slice(0, 100)}...</p>
                        <div class="post-actions">
                            <button class="btn-edit" data-post-id="${post.id}">Editar</button>
                            <a href="../../ver-noticia.html?id=${post.id}" class="btn-view" target="_blank">Visualizar</a>
                        </div>
                    </div>
                `;
                postsGrid.appendChild(div);
            });

            // Esconde o botão "Carregar Mais" se não houver mais posts
            if (data.current_page >= data.total_pages) {
                document.getElementById("btn-load-more").style.display = "none";
            }
        }
        catch (err) {
            console.error("Erro ao carregar posts:", err);
            showFeedback(feedback, "error", err.message);
        }
    }

    await carregarPosts(currentPage, itemsPerPage);


    document.getElementById("btn-load-more").addEventListener("click", async () => {
        currentPage++; // Incrementa a página atual
        await carregarPosts(currentPage, itemsPerPage); // Carrega a próxima página
    });
    

    // Abrir o modal para criar novo post
    btnCreatePost.addEventListener("click", () => {
        dialog.querySelector("#dialog-title").textContent = "Novo Post";
        tituloInput.value = "";
        conteudoInput.value = "";
        imagemInput.value = "";
        btnSave.removeAttribute("data-post-id");
        btnDelete.style.display = "none";
        btnSave.textContent = "Criar";
        dialog.showModal();
    });

    // Salvar post (novo ou editado)
    btnSave.addEventListener("click", async () => {
        const titulo = tituloInput.value.trim();
        const conteudo = conteudoInput.value.trim();
        const postId = btnSave.getAttribute("data-post-id");
        const imagem = imagemInput.files[0]; // Captura o arquivo da imagem

        if (!titulo || !conteudo) {
            showFeedback(feedback, "error", "Título e conteúdo são obrigatórios.");
            return;
        }

        // Criação de FormData para envio dos dados
        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("conteudo", conteudo);
        if (imagem) {
            formData.append("imagemPost", imagem); // Nome do campo deve ser igual ao esperado no backend
        }

        try {
            if (postId) {
                // Editar post existente
                await atualizarNoticia(postId, formData);
                showFeedback(feedback, "success", "Post atualizado com sucesso.");
            } else {
                // Criar novo post
                await criarNoticia(formData);
                showFeedback(feedback, "success", "Post criado com sucesso.");
            }

            dialog.close();
            await carregarPosts();
        } catch (err) {
            console.error("Erro ao salvar post:", err);
            showFeedback(feedback, "error", "Erro ao salvar post: " + err.message);
        }
    });




    // Abrir o modal para edição de post
    postsGrid.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-edit")) {
            const postId = e.target.getAttribute("data-post-id");
            const postCard = e.target.closest(".post-card");


            if (!postCard) {
                console.error("Card do post não encontrado.");
                return;
            }

            const titulo = postCard.querySelector(".post-title").textContent;
            const conteudo = postCard.querySelector(".post-conteudo").textContent;

            btnSave.setAttribute("data-post-id", postId);
            btnDelete.setAttribute('data-post-id', postId)
            btnSave.textContent = "Salvar";
            tituloInput.value = titulo;
            conteudoInput.value = conteudo;

            dialog.querySelector("#dialog-title").textContent = "Editar Post";
            dialog.showModal();
        }
    });



    // Deletar post
    btnDelete.addEventListener("click", async () => {
        const postId = btnDelete.getAttribute("data-post-id");

        if (!postId) {
            console.error("ID do post não encontrado.");
            return;
        }

        try {
            await deletarNoticia(postId);
            showFeedback(feedback, "success", "Post deletado com sucesso.");
            dialog.close();
            await carregarPosts(currentPage, itemsPerPage);
            window.location.reload()
        } 
        catch (err) {
            console.error("Erro ao deletar post:", err);
            showFeedback(feedback, "error", "Erro ao deletar post.");
        }
    });



    // Fechar o modal ao clicar fora
    dialog.addEventListener("click", (e) => {
        if (e.target.tagName === "dialog") {
            dialog.close();
        }
    });
}
