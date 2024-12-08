let users = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', status: 'Ativo', password: 'senha123', lastUpdate: '2024-12-08 12:00:00', updatedBy: 'Admin' },
    { id: 2, name: 'Maria Souza', email: 'maria@email.com', status: 'Ativo', password: 'senha456', lastUpdate: '2024-12-08 14:30:00', updatedBy: 'Admin' },
  ];
  
  function updateUserTable() {
    const userTableBody = document.getElementById('user-table-body');
    userTableBody.innerHTML = '';
    users.forEach((user, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.status}</td>
        <td>${user.lastUpdate}</td>
        <td>
          <button class="btn" onclick="openEditModal(${index})">Editar</button>
          <button class="btn btn-secondary" onclick="removeUser(${index})">Remover</button>
        </td>
      `;
      userTableBody.appendChild(row);
    });
  }
  
  function openEditModal(index) {
    const user = users[index];
    document.getElementById('edit-name').value = user.name;
    document.getElementById('edit-email').value = user.email;  
    document.getElementById('edit-status').value = user.status;
    document.getElementById('edit-password').value = ''; 
    
    document.getElementById('save-edit').onclick = function() {
      saveEdits(index); 
    };
  
    document.getElementById('edit-modal').style.display = 'flex';
  }
  
  function saveEdits(index) {
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;
    const status = document.getElementById('edit-status').value;
    const password = document.getElementById('edit-password').value;
    const user = users[index];
    
    users[index] = {
      ...user,
      name: name,
      email: email, 
      status: status,
      password: password ? password : user.password,  
      lastUpdate: new Date().toLocaleString(),  
      updatedBy: 'Admin'  
    };
  
    closeModal();
  
 
    updateUserTable();
  }
  

  function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
  }
  

  function removeUser(index) {
    users.splice(index, 1);  
    updateUserTable();  
  }
  
  updateUserTable();
  