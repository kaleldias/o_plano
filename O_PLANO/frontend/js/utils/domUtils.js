export function showFeedback(element, type, message) {
    element.style.display = 'block';
    element.className = 'feedback ' + type; // 'feedback success' ou 'feedback error'
    element.textContent = message;
}


export function marcarLinkAtivo(navbarContainer) {
    const links = navbarContainer.querySelectorAll('.navbar-link');
    const currentPath = window.location.pathname;

    links.forEach((link) => {
        const linkPath = link.getAttribute('href');
        // Verifique se o currentPath inclui o linkPath (remova "../" se necessário)
        // Uma estratégia: extrair o nome do arquivo atual e comparar com linkPath
        const currentFile = currentPath.substring(currentPath.lastIndexOf('/')+1);

        if (currentFile === linkPath) {
            link.classList.add('active');
        } 
        else {
            link.classList.remove('active');
        }
    });
}

export function ajustarVisibilidadePorRole(navbarContainer, role) {
    // Se role for visitor, remover itens logados
    if (role === '') {
        // Geralmente navbar visitante não tem itens restritos, mas se tiver:
        navbarContainer.querySelectorAll('.somente-admin, .somente-superadmin').forEach(el => el.classList.add('hidden'));
    } 
    else if (role === 'admin') {
        // Esconder somente-superadmin
        navbarContainer.querySelectorAll('.somente-superadmin').forEach(el => el.classList.add('hidden'));
    } 
    else if (role === 'superAdmin') {
        // Mostra tudo, se estiver hidden
        navbarContainer.querySelectorAll('.somente-admin, .somente-superadmin').forEach(el => el.classList.remove('hidden'));
    }
}




