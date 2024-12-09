const url = 'http://127.0.0.1:3000/api/';


const loginUsuario = async (email, senha) => {
    try {
        const res = await fetch(url + 'usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, senha}),
            credentials: 'include' // Envia o cookies automaticamente
        })

        if(!res.ok){
            const err = await res.json();
            throw new Error(err.error || 'Erro ao fazer login!');
        }

        return await res.json();

    }
    catch (err) {
        throw err;
        

    }
}


// Evento de envio do formulário
document.querySelector('#login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Captura os valores do formulário
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;

    const feedback = document.querySelector('#feedback');

    try {
        // Exibe mensagem de carregamento
        feedback.style.display = 'block';
        feedback.className = 'feedback success';
        feedback.textContent = 'Autenticando...';

        // Chama a função para realizar o login
        const data = await loginUsuario(email, senha);
        console.log(data)

        // Exibe mensagem de sucesso e redireciona
        feedback.textContent = 'Login realizado com sucesso!';
        sessionStorage.setItem('user', JSON.stringify(data.data)); // Salva dados do usuário no navegador
        setTimeout(() => (window.location.href = 'index.html'), 2000);
    } 
    catch (err) {
        // Exibe mensagem de erro
        feedback.style.display = 'block';
        feedback.className = 'feedback error';
        feedback.textContent = err.message;
    }
});
