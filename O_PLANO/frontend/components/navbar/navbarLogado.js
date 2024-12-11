import { getUser } from "../../js/utils/storageUtils.js";
import { logout } from "../../js/services/authService.js";

export async function carregarNavbarAdm() {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;

    try {
        const response = await fetch('../../components/navbar/navbar-logado.html');
        const html = await response.text();
        navbarContainer.innerHTML = html;

        const user = getUser();
        if (!user || !user.role) {
            console.error('Usuário não autenticado ou sem role definida.');
            return;
        }

        const linksHTML = getLinksByRole(user.role);

        const desktopList = navbarContainer.querySelector('#navbar-desktop-list');
        const mobileNavbar = navbarContainer.querySelector('#navbar-mobile');

        if (desktopList) {
            desktopList.innerHTML = linksHTML;
        }

        if (mobileNavbar) {
            mobileNavbar.innerHTML = linksHTML;
        }

        const logoutButton = navbarContainer.querySelector('.logout-btn');
        if (logoutButton) {
            logoutButton.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }

        const hamburgerMenu = navbarContainer.querySelector('.hamburger');
        if (hamburgerMenu && mobileNavbar) {
            hamburgerMenu.addEventListener('click', () => {
                mobileNavbar.classList.toggle('active');
            });

            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    mobileNavbar.classList.remove('active');
                }
            });
        }

        marcarLinkAtivo(navbarContainer);
    } catch (error) {
        console.error('Erro ao carregar a navbar:', error);
    }
}

function getLinksByRole(role) {
    switch (role) {
        case 'admin':
            return `
                <li><a href="../../index.html" class="navbar-link">Home</a></li>
                <li><a href="../../noticias.html" class="navbar-link">Notícias</a></li>
                <li><a href="../../dashboard/posts.html" class="navbar-link">Gerenciar Posts</a></li>
                <li><a href="../../dashboard/perfil.html" class="navbar-link">Meu Perfil</a></li>
            `;
        case 'superAdmin':
            return `
                <li><a href="../../index.html" class="navbar-link">Home</a></li>
                <li><a href="../../noticias.html" class="navbar-link">Notícias</a></li>
                <li><a href="../../dashboard/posts.html" class="navbar-link">Gerenciar Posts</a></li>
                <li><a href="../../dashboard/usuarios.html" class="navbar-link">Usuários</a></li>
                <li><a href="../../dashboard/autorizacao.html" class="navbar-link">Autorizações</a></li>
                <li><a href="../../dashboard/perfil.html" class="navbar-link">Meu Perfil</a></li>
               
                
            `;
        default:
            console.warn('Role do usuário não reconhecida.');
           
    }
}

function marcarLinkAtivo(navbarContainer) {
    const links = navbarContainer.querySelectorAll('.navbar-link');
    const currentPath = window.location.pathname;
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    links.forEach((link) => {
        const linkPath = link.getAttribute('href');
        const linkFile = linkPath.substring(linkPath.lastIndexOf('/') + 1);

        if (currentFile === linkFile) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
