import { login } from '../services/authService.js';
import { showFeedback } from '../utils/domUtils.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#login-form');
    const feedback = document.querySelector('#feedback');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        showFeedback(feedback, 'success', 'Autenticando...');

        const email = document.querySelector('#email').value.trim();
        const senha = document.querySelector('#senha').value.trim();

        try {
            await login(email, senha);
            showFeedback(feedback, 'success', 'Login realizado com sucesso!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } 
        catch (err) {
            showFeedback(feedback, 'error', err.message);
        }
    });
});
