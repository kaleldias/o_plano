// Exibir o loader
export function exibirLoader() {
    const loaderContainer = document.getElementById('loader');
    if (loaderContainer) {
        loaderContainer.style.display = 'flex'; // Torna o loader visível
        console.log('Loader exibido.');
    } else {
        console.warn('Elemento #loader não encontrado.');
    }
}

// Ocultar o loader
export function esconderLoader() {
    const loaderContainer = document.getElementById('loader');
    if (loaderContainer) {
        loaderContainer.style.display = 'none'; // Oculta o loader
        console.log('Loader escondido.');
    } else {
        console.warn('Elemento #loader não encontrado.');
    }
}

// Não há mais necessidade de carregar o HTML dinamicamente, pois o loader já está no DOM
