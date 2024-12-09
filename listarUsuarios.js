
const popup = document.getElementById('dialog-ver-usuario');
const btnVerList = document.querySelectorAll('.btn-ver');
const dialogUserIdField = document.getElementById('dialogUserId');
const nomeEdicao = document.getElementById('nomeEdicao');
const emailEdicao = document.getElementById('emailEdicao');
const statusEdicao = document.getElementById('statusEdicao');
/*
btnVerList.forEach(btn => {
    btn.addEventListener('click', () => {
        const userId = btn.getAttribute('data-user-id');

        // Fazer fetch no backend com o userId para carregar dados reais.
        // Exemplo estático:
        dialogUserIdField.textContent = userId;
        nomeEdicao.value = userId === "1" ? "João Silva" : "Maria Fernanda";
        emailEdicao.value = userId === "1" ? "joao@exemplo.com" : "mariaf@exemplo.com";
        statusEdicao.value = userId === "1" ? "Ativo" : "Inativo";

        dialog.showModal();
    });
});

const btnSalvar = dialog.querySelector('.btn-salvar');
btnSalvar.addEventListener('click', () => {
    const updatedNome = nomeEdicao.value;
    const updatedEmail = emailEdicao.value;
    const updatedStatus = statusEdicao.value;
    const userId = dialogUserIdField.textContent;

    // fetch('/api/updateUser', { method: 'POST', body: JSON.stringify({id: userId, nome: updatedNome, email: updatedEmail, status: updatedStatus}) ...})

    alert('Usuário atualizado com sucesso!');
});

const btnRemover = dialog.querySelector('.btn-remover');
btnRemover.addEventListener('click', () => {
    const userId = dialogUserIdField.textContent;
    // fetch('/api/removeUser?id=' + userId, {method:'POST'...})
    alert('Usuário removido!');
});



*/


// Função para formatar datas, caso necessário
function formatDate(dateString) {
    // Caso a data venha no formato "DD-MM-YYYY HH:mm:ss"
    // Aqui apenas retornaremos a string como está
    return dateString;
}

// Realizando o fetch do endpoint que retorna o JSON de usuários
fetch('http://127.0.0.1:3000/api/usuarios', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5ODg4YWMzLWRiMTAtNDAxZi1iNWU3LTU3Y2Q4MWFhMWZhYiIsImVtYWlsIjoic3VwZXJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoic3VwZXJBZG1pbiIsImlhdCI6MTczMzc1Mzg3MCwiZXhwIjoxNzMzNzU3NDcwfQ.0Juqawnz7KKzB5J02TaojSkowgvLyQvc6Gc4GwAldiw'
    }
})
    .then(response => response.json())
    .then(json => {
        if (json.message === "success") {
            const users = json.data; // Array de usuários retornados
            const tbody = document.getElementById('usersTableBody');
            tbody.innerHTML = ''; // Limpa o tbody antes de inserir novas linhas

            users.forEach(user => {
                // Cria uma nova linha (tr)
                const tr = document.createElement('tr');
                tr.setAttribute('data-user-id', user.id);

                // Coluna Nome
                const tdNome = document.createElement('td');
                tdNome.textContent = user.nome;
                tr.appendChild(tdNome);

                // Coluna E-mail
                const tdEmail = document.createElement('td');
                tdEmail.textContent = user.email;
                tr.appendChild(tdEmail);

                // Coluna Função (role)
                const tdRole = document.createElement('td');
                tdRole.textContent = user.role; // "superAdmin" ou "admin"
                tr.appendChild(tdRole);

                // Coluna Data Cadastro
                const tdDataCadastro = document.createElement('td');
                tdDataCadastro.textContent = formatDate(user.data_cadastro);
                tr.appendChild(tdDataCadastro);

                // Coluna Ações
                const tdAcoes = document.createElement('td');
                const btnVer = document.createElement('button');
                btnVer.classList.add('btn-ver');
                btnVer.textContent = 'Ver';
                btnVer.setAttribute('data-user-id', user.id);

                // Listener do botão "Ver"
                btnVer.addEventListener('click', () => {
                    // Aqui você pode abrir um dialog e carregar dados adicionais do usuário
                    // Exemplo:
                    const popUpUserId = document.querySelector('#dialogUserId');
                    popUpUserId.textContent = user.id;
                    popup.showModal();
                });

                tdAcoes.appendChild(btnVer);
                tr.appendChild(tdAcoes);

                // Insere a linha no tbody
                tbody.appendChild(tr);
            });
        } else {
            console.error('Erro ao buscar usuários:', json.message);
        }
    })
    .catch(err => {
        console.error('Erro na requisição:', err);
    });

