/*--- ALTERNAR SEÇÕES ---*/

const generalInput = document.getElementById('general');
const analysisInput = document.getElementById('analysis');
const generalSection = document.querySelector('.general');
const analysisSection = document.querySelector('.analysis');

// Função para alternar as seções
function toggleSections() {
    if (generalInput.checked) {
        generalSection.style.display = 'flex';
        analysisSection.style.display = 'none';
    } else if (analysisInput.checked) {
        generalSection.style.display = 'none';
        analysisSection.style.display = 'grid';
    }
}

// Adiciona os eventos de mudança nos inputs de rádio
generalInput.addEventListener('change', toggleSections);
analysisInput.addEventListener('change', toggleSections);

// Chama a função ao carregar a página para garantir o estado correto
toggleSections();