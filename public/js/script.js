document.addEventListener("DOMContentLoaded", function () {
    const firstInput = document.getElementById("firstPartyNumber");
    const secondInput = document.getElementById("secondPartyNumber");

    const labels = document.querySelector('.labels');
    const subtitles = document.querySelector('.subtitles');
    const pics = document.querySelector('.pics');

    // Adiciona a classe de piscando ao primeiro input
    firstInput.classList.add("blinking");

    firstInput.focus();

    // Função para verificar se ambos os inputs estão preenchidos
    function checkInputs() {
        if (firstInput.value.length > 0 && secondInput.value.length > 0) {
            // Exibe os elementos
            labels.style.display = 'flex';
            subtitles.style.display = 'grid';
            pics.style.display = 'grid';
        } else {
            // Esconde os elementos
            labels.style.display = 'none';
            subtitles.style.display = 'none';
            pics.style.display = 'none';
        }
    }

    // Detecta quando o usuário digita algo no primeiro input
    firstInput.addEventListener("input", function () {
        if (firstInput.value.length > 0) {
            firstInput.classList.remove("blinking");
            // Só foca no segundo input se o primeiro estiver completamente preenchido
            if (firstInput.value.length === 1) {
                secondInput.classList.add("blinking");
                secondInput.focus();
            }
        }
        checkInputs();
    });

    // Detecta quando o usuário digita algo no segundo input
    secondInput.addEventListener("input", function () {
        if (secondInput.value.length > 0) {
            secondInput.classList.remove("blinking");
        }
        checkInputs();
    });

    // Quando o backspace é pressionado no segundo input, limpa ambos os inputs
    secondInput.addEventListener("keydown", function (event) {
        if (event.key === "Backspace" && secondInput.value.length === 0 || secondInput.value > 0) {
            // Limpa ambos os inputs
            firstInput.focus();
            firstInput.value = "";
            secondInput.value = "";
            firstInput.classList.add("blinking");
            secondInput.classList.remove("blinking");         

            // Verifica novamente para atualizar os displays
            checkInputs();
        }
    });
});
