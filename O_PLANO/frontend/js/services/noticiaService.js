import { API_BASE_URL } from '../config/apiConfig.js';

export async function criarNoticia(formData) {
    const res = await fetch(`${API_BASE_URL}noticias/criar-noticia`, {
        method: "POST",
        credentials: "include",
        body: formData,
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao criar notícia.");
    }

    return await res.json();
}

export async function getNoticia(id) {
    const res = await fetch(`${API_BASE_URL}noticias/${id}`, {
        method: 'GET'
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Erro ao obter notícia.');
    }
    return data;
}

export async function listarNoticias(pagina = 1, itensPorPagina = 8) {
    const res = await fetch(`${API_BASE_URL}noticias?pagina=${pagina}&itensPorPagina=${itensPorPagina}`, {
        method: 'GET'
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Erro ao listar notícias.');
    }
    return data;
}

export async function atualizarNoticia(id, formData) {
    const res = await fetch(`${API_BASE_URL}noticias/${id}`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao atualizar notícia.");
    }

    return await res.json();
}

export async function deletarNoticia(id) {
    const res = await fetch(`${API_BASE_URL}noticias/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erro ao deletar notícia.');
    }
    return await res.json();
}
