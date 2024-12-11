// navbar.js
export async function carregarNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        const response = await fetch('../../components/navbar/navbar.html');
        const html = await response.text();
        navbarContainer.innerHTML = html;

        const hamburgerMenu = navbarContainer.querySelector('.hamburger');
        const navbarMobile = navbarContainer.querySelector('.navbar-mobile');
        const mobileLinks = navbarMobile ? navbarMobile.querySelectorAll('.navbar-link') : [];

        if (hamburgerMenu && navbarMobile) {
            hamburgerMenu.addEventListener('click', () => {
                navbarMobile.classList.toggle('active');
                const items = navbarMobile.querySelectorAll('li');
                items.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.1}s`;
                });
            });

            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navbarMobile.classList.remove('active');
                });
            });

            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    navbarMobile.classList.remove('active');
                }
            });
        }

        return navbarContainer; // Retorna o container para processamento posterior
    }
}
