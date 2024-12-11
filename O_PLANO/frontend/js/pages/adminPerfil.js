import { getMeuPerfil, atualizarPerfil, atualizarSenha } from '../services/userService.js';
import { getUser } from '../utils/storageUtils.js';
import { showFeedback } from '../utils/domUtils.js';

document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('perfil-form');
    const feedback = document.getElementById('feedback');
    const user = getUser();

    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const perfil = await getMeuPerfil();
        document.getElementById('nome').value = perfil.nome;
        document.getElementById('email').value = perfil.email;
    } catch (err) {
        showFeedback(feedback, 'error', err.message);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        showFeedback(feedback, 'success', 'Atualizando...');

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();

        try {
            await atualizarPerfil(nome, email);
            showFeedback(feedback, 'success', 'Perfil atualizado com sucesso!');
        } catch (err) {
            showFeedback(feedback, 'error', err.message);
        }
    });

    // Diálogo de atualizar senha
    const dialogSenha = document.getElementById('dialog-atualizar-senha');
    const btnUpdatePassword = document.querySelector('.btn-update-password');
    const btnCancelar = dialogSenha.querySelector('.btn-cancelar');
    const btnConfirmar = dialogSenha.querySelector('.btn-confirmar');
    const dialogFeedback = document.getElementById('dialogFeedback');

    btnUpdatePassword.addEventListener('click', () => {
        dialogFeedback.style.display = 'none';
        dialogFeedback.textContent = '';
        dialogFeedback.className = 'feedback';
        document.getElementById('senha_atual_dialog').value = '';
        document.getElementById('nova_senha_dialog').value = '';
        dialogSenha.showModal();
    });

    btnCancelar.addEventListener('click', () => {
        dialogSenha.close();
    });

    btnConfirmar.addEventListener('click', async () => {
        showFeedback(dialogFeedback, 'success', 'Atualizando senha...');

        const senhaAtual = document.getElementById('senha_atual_dialog').value.trim();
        const novaSenha = document.getElementById('nova_senha_dialog').value.trim();

        try {
            await atualizarSenha(senhaAtual, novaSenha);
            showFeedback(dialogFeedback, 'success', 'Senha atualizada com sucesso!');
            setTimeout(() => dialogSenha.close(), 1500);
        } catch (err) {
            showFeedback(dialogFeedback, 'error', err.message);
        }
    });
});
