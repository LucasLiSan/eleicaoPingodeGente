import CandidateService from "../services/candidateService.js";

// Defina o número total de eleitores
const totalEleitores = 86;

// Define o total de seções(salas) e valor inicial de urnas apuradas para o cálculo de apuração de urnas
const totalRooms = 5; // Total de salas
let urnasApuradas = 0; // Valor inicial igual a 0

// Definindo os nomes das salas
const roomNames = { 
    1: 'JARDIM 2-A', 
    2: '1º ANO-A', 
    3: '2º ANO-A', 
    4: '3º ANO-A', 
    5: '4º ANO-A' 
};

const resultados = async (req, res) => {
    try {
        // Recupera todos os candidatos cadastrados no banco
        const allCandidates = await CandidateService.getAll();

        // Recupera os votos nulos e brancos
        const votosNulos = await CandidateService.getNullVotes();
        const votosBrancos = await CandidateService.getBlankVotes();

        // Obtenha os votos nulos por sala em paralelo
        const nullVotesByRoom = await Promise.all(
            Object.keys(roomNames).map(room => CandidateService.getNullVotesByRoom(room))
        );

        const votosNulosPorSala = nullVotesByRoom.reduce((acc, votos, index) => {
            acc[index + 1] = votos; // Armazena os votos nulos por sala
            return acc;
        }, {});

        // Total de votos computados (todos os candidatos + nulos + brancos)
        const totalVotes = allCandidates.reduce((sum, candidate) => sum + candidate.votes, 0);

        // Cálculo de votantes e ausentes
        const totalVotantes = totalVotes;
        const totalAusentes = totalEleitores - totalVotantes;

        // Cálculo de votos válidos (apenas candidatos, sem nulos e brancos)
        const totalValidVotes = totalVotes - votosBrancos - votosNulos;

        // Filtro de candidatos para remover nulos e brancos
        const validCandidates = allCandidates.filter(candidate => 
            candidate.party !== 'NULO' && candidate.party !== 'BRANCO'
        );

        /* --- ALGORITMO TIMSORT, combinação de MERGESORT e INSERTIONSORT --- */
        // Recupera os top 5 candidatos ordenados por votos, excluindo nulos e brancos
        const topCandidates = validCandidates
            .sort((a, b) => b.votes - a.votes) // Ordena os candidatos por número de votos
            .slice(0, 5); // Seleciona os 5 primeiros

        // Cálculo das urnas apuradas
        if (allCandidates.length > 0) {
            const roomsWithVotes = new Set(); // Usar um Set para garantir salas únicas
            allCandidates.forEach(candidate => {
                // Iterar sobre cada sala de votos do candidato
                candidate.votesByRoom.forEach((votes, room) => {
                    if (votes > 0) {
                        roomsWithVotes.add(room); // Adicionar a sala ao Set se houver votos
                    }
                });
            });

            // Calcular a porcentagem de urnas apuradas
            urnasApuradas = (roomsWithVotes.size * 100) / totalRooms;
        }

        // Função para calcular os top candidatos por sala
        const getTopCandidatesByRoom = (room) => {
            return validCandidates
                .map(candidate => ({
                    name: candidate.name,
                    party: candidate.party,
                    votes: candidate.votesByRoom.get(room) || 0
                }))
                .sort((a, b) => b.votes - a.votes || a.name.localeCompare(b.name)) // Ordena por votos e desempata pelo nome
                .slice(0, 5);
        };

        // Separando cada candidato pela sua posição
        const [firstCandidate, secondCandidate, thirdCandidate, fourthCandidate, fifthCandidate] = topCandidates;

        res.render('resultado', {
            allCandidates,
            firstCandidate,
            secondCandidate,
            thirdCandidate,
            fourthCandidate,
            fifthCandidate,
            totalVotes,
            totalValidVotes,
            votosNulos,
            votosBrancos,
            totalVotantes,
            totalAusentes,
            urnasApuradas,
            totalEleitores,
            votosNulosPorSala, // Passa os votos nulos por sala
            getTopCandidatesByRoom
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao carregar a urna');
    }
};

export default { resultados };