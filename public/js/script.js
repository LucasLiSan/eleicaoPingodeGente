document.addEventListener("DOMContentLoaded", function () {
    const firstInput = document.getElementById("firstPartyNumber");
    const secondInput = document.getElementById("secondPartyNumber");

    const labels = document.querySelector('.labels');
    const subtitles = document.querySelector('.subtitles');
    const pics = document.querySelector('.pics');

    const keySound = new Audio('/audios/teclaUrna.mp3');

    // Adiciona a classe de piscando ao primeiro input
    firstInput.classList.add("blinking");
    firstInput.focus();

    // Função para tocar o som
    function playKeySound() {
        keySound.currentTime = 0; // Reinicia o som
        keySound.play(); // Toca o som
    }

    // Função para verificar se ambos os inputs estão preenchidos
    function checkInputs() {
        if (firstInput.value.length > 0 && secondInput.value.length > 0) {
            // Exibe os elementos
            labels.style.display = 'flex';
            pics.style.display = 'flex';
            subtitles.style.display = 'grid';
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
            playKeySound();
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
            playKeySound();
            secondInput.classList.remove("blinking");
        }
        checkInputs();
    });

    firstInput.addEventListener("keydown", function(event) {
        // Verifica se a tecla pressionada foi a seta para a direita
        if (event.key === "ArrowRight") {
            playKeySound();
            // Exibe o campo de "VOTO EM BRANCO"
            const blankVoteInput = document.getElementById('blankVote');
            const candidateNameInput = document.getElementById('candidateName');
            blankVoteInput.style.display = 'flex';
            candidateNameInput.style.display = 'none';

            // Define "0" no campo partyNumberAll para identificar o voto em branco
            document.getElementById('partyNumberAll').value = '111';
            
            // Opcional: Limpa os outros campos de input para simular o voto em branco
            document.getElementById('firstPartyNumber').value = '';
            document.getElementById('secondPartyNumber').value = '0';
            document.getElementById('secondPartyNumber').style.color = 'transparent';
            document.getElementById('firstPartyNumber').classList.remove('blinking');
            document.getElementById('secondPartyNumber').classList.remove('blinking');
            document.getElementById('partyNumber').classList.remove('borderOn');
            document.getElementById('partyNumber').classList.add('borderOff');

            subtitles.style.display = 'grid';
            
            // Foca no segundo input
            secondInput.focus();
        }
    });

    // Quando o backspace é pressionado no segundo input, limpa ambos os inputs
    secondInput.addEventListener("keydown", function (event) {
        if (event.key === "Backspace" || event.key === "Delete" || event.key === ",") {

            event.preventDefault();

            const blankVoteInput = document.getElementById('blankVote');
            const candidateNameInput = document.getElementById('candidateName');
            blankVoteInput.style.display = 'none';
            candidateNameInput.style.display = 'block';
            document.getElementById('nullVote').style.display ='none';
            document.getElementById('null').style.display ='none';

            // Limpa ambos os inputs
            firstInput.focus();
            firstInput.value = "";
            secondInput.value = "";
            document.getElementById('secondPartyNumber').style.color = '#000000';
            document.getElementById('candidateName').value = "";
            document.getElementById('partyName').value = "";
            document.getElementById('viceCandidateName').value = "";
            document.getElementById('partyNumberAll').value = "";
            firstInput.classList.add("blinking");
            secondInput.classList.remove("blinking");
            document.getElementById('partyNumber').classList.add('borderOn');
            document.getElementById('partyNumber').classList.remove('borderOff');

            // Verifica novamente para atualizar os displays
            checkInputs();
        }
    });

    firstInput.addEventListener("keydown", function(event) {
        // Verifica se a tecla pressionada é permitida
        if ((event.key >= "0" && event.key <= "9") || (event.key >= "Numpad0" && event.key <= "Numpad9") || event.key === "Backspace" || event.key === "Delete" || event.key === "ArrowRight" || event.key === "NumpadDecimal" || event.key === "F5") { return; } // Se a tecla pressionada for uma das permitidas, não faz nada
        else { event.preventDefault();} // Impede o comportamento padrão para outras teclas
    });
    
    secondInput.addEventListener("keydown", function(event) {
        // Verifica se a tecla pressionada é permitida
        if ((event.key >= "0" && event.key <= "9") || (event.key >= "Numpad0" && event.key <= "Numpad9") || event.key === "Backspace" || event.key === "Delete" || event.key === "ArrowRight" || event.key === "NumpadDecimal" || event.key === "F5") { return; } // Se a tecla pressionada for uma das permitidas, não faz nada
        
        // Permite a tecla "Enter" se o campo não estiver vazio
        if (event.key === "Enter" && secondInput.value !== "") { return; } // Permite o comportamento padrão para "Enter"
    
        // Bloqueia a tecla "Enter" se o campo estiver vazio
        if (event.key === "Enter" && secondInput.value === "") { 
            event.preventDefault(); // Impede o comportamento padrão
            return;
        }
        
        // Bloqueia outras teclas
        event.preventDefault();
    });
    
});

document.getElementById('secondPartyNumber').addEventListener('input', async function() {
    const firstPartyNumber = document.getElementById('firstPartyNumber').value;
    const secondPartyNumber = document.getElementById('secondPartyNumber').value;

    if (firstPartyNumber && secondPartyNumber) {
        const partyNumber = firstPartyNumber + secondPartyNumber;

        try {
            // Realiza uma chamada à API para buscar os dados do candidato
            const response = await fetch(`/candidate/party/${partyNumber}`);
            const data = await response.json();

            if (response.ok) {
                const candidate = data.candidate;

                // Preenche os campos com os dados do candidato
                document.getElementById('candidateName').value = candidate.name;
                document.getElementById('partyName').value = candidate.party;
                document.getElementById('viceCandidateName').value = candidate.viceName;
                document.querySelector('img[alt="Candidate"]').src = `${candidate.candidatePic}`;
                document.querySelector('img[alt="Vice Candidate"]').src = `${candidate.viceCandidatePic}`;
                document.getElementById('partyNumberAll').value = partyNumber;

                // Caso queira alterar o display de algum elemento
                document.querySelector('.labels').style.display = 'flex';
                document.querySelector('.subtitles').style.display = 'grid';
                document.querySelector('.pics').style.display = 'flex';

                document.querySelector('.candidate').style.display = 'block';
                document.querySelector('.viceCandidate').style.display = 'block';

            } else {
                document.getElementById('nullVote').style.display ='flex';
                document.getElementById('null').style.display ='flex';

                document.getElementById('candidateName').value = '';
                document.getElementById('partyName').value = '';
                document.getElementById('viceCandidateName').value = '';
                document.getElementById('partyNumberAll').value = 999;

                document.querySelector('.labels').style.display = 'flex';
                document.querySelector('.subtitles').style.display = 'grid';
                document.querySelector('.pics').style.display = 'flex';

                document.querySelector('.candidate').style.display = 'none';
                document.querySelector('.viceCandidate').style.display = 'none';

            } // Se o candidato não for encontrado
        } catch (error) { console.error('Erro ao buscar o candidato:', error); }
    }
});