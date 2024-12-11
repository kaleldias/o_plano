import { API_BASE_URL } from '../config/apiConfig.js';
import { getUser, saveUser } from '../utils/storageUtils.js';

export async function getMeuPerfil() {
    const user = getUser();
    if (!user || !user.id) throw new Error('Usuário não autenticado.');

    const res = await fetch(API_BASE_URL + 'usuarios/' + user.id, {
        method: 'GET',
        credentials: 'include'
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Não foi possível obter dados do perfil.');
    }
    const data = await res.json();
    return data.data;
}

export async function atualizarPerfil(nome, email) {
    const res = await fetch(API_BASE_URL + 'usuarios/eu', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({nome, email})
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Erro ao atualizar perfil.');
    }

    // Atualizar o sessionStorage
    const user = getUser() || {};
    user.nome = nome;
    user.email = email;
    saveUser(user);
    return data;
}

export async function atualizarSenha(senhaAntiga, novaSenha) {
    const res = await fetch(API_BASE_URL + 'usuarios/eu', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({senhaAntiga, novaSenha})
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Erro ao atualizar senha.');
    }
    return data;
}

export async function listarUsuarios() {
    // Somente superAdmin
    const res = await fetch(API_BASE_URL + 'usuarios', {
        method: 'GET',
        credentials: 'include'
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erro ao listar usuários.');
    }
    return await res.json();
}

export async function deletarUsuario(id) {
    const res = await fetch(API_BASE_URL + 'usuarios/' + id, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erro ao deletar usuário.');
    }
    return await res.json();
}
