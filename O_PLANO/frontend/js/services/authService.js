import { API_BASE_URL } from '../config/apiConfig.js';
import { saveUser, removeUser } from '../utils/storageUtils.js';

export async function login(email, senha) {
    const res = await fetch(API_BASE_URL + 'usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, senha}),
        credentials: 'include' // Importante para enviar/receber cookies
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erro ao fazer login!');
    }

    const data = await res.json();
    // data.data terá {id, email, role}
    saveUser(data.data); 
    return data;
}

export async function cadastrarUsuario(nome, email, senha) {
    const res = await fetch(API_BASE_URL + 'usuarios/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nome, email, senha})
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erro ao cadastrar!');
    }

    return await res.json();
}

export async function logout() {
    try {
        // Caso tenha um endpoint de logout no backend
        await fetch(`${API_BASE_URL}usuarios/logout`, {
            method: 'POST',
            credentials: 'include',
        });
    } 
    catch (error) {
        console.error('Erro ao chamar logout no backend:', error);
    } 
    finally {
        // Remove o usuário do armazenamento local
        removeUser();
        // Redireciona para a página de login
        window.location.href = 'login.html';
    }
}
