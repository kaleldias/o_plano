import { API_BASE_URL } from '../config/apiConfig.js';

export async function criarAdminAutorizado(email) {
    const res = await fetch(API_BASE_URL + 'autorizar/criar-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({email})
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Erro ao autorizar admin.');
    }
    return data;
}

export async function getAutorizacaoAdmin(id) {
    const res = await fetch(API_BASE_URL + 'autorizacao/admin/' + id, {
        method: 'GET',
        credentials: 'include'
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Erro ao obter autorização admin.');
    }
    return data;
}

export async function listarAutorizacaoAdmins() {
    const res = await fetch(API_BASE_URL + 'autorizacao/admin/todos', {
        method: 'GET',
        credentials: 'include'
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Erro ao listar autorizações.');
    }
    return data;
}

export async function atualizarAutorizacaoAdmin(id, email, status) {
    const res = await fetch(API_BASE_URL + 'autorizacao/admin/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({email, status})
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Erro ao atualizar autorização.');
    }
    return data;
}

export async function removerAutorizacaoAdmin(id) {
    const res = await fetch(API_BASE_URL + 'autorizacao/admin/' + id, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erro ao remover autorização.');
    }
    return await res.json();
}
