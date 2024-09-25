import CandidateService from "../services/candidateService.js";

const totalEleitores = 39367; // Defina o número total de eleitores

const resultados = async (req, res) => {
  try {
    // Recupera todos os candidatos cadastrados no banco
    const allCandidates = await CandidateService.getAll();
    
    // Recupera os votos nulos e brancos
    const votosNulos = await CandidateService.getNullVotes();
    const votosBrancos = await CandidateService.getBlankVotes();

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

    // ALGORITIMO TimSort, combinação de Merge Sort e Insertion Sort
    // Recupera os top 5 candidatos ordenados por votos, excluindo nulos e brancos
    const topCandidates = validCandidates
      .sort((a, b) => b.votes - a.votes) // Ordena os candidatos por número de votos
      .slice(0, 5); // Seleciona os 5 primeiros

    // Cálculo das urnas apuradas (No meu caso foram 13 salas, inserir o número correspondente às suas seções)
    const urnasApuradas = (Object.keys(topCandidates[0].votesByRoom).length / 13) * 100;

    // Separando cada candidato pela sua posição
    const [firstCandidate, secondCandidate, thirdCandidate, fourthCandidate, fifthCandidate] = topCandidates;

    res.render('resultado', {
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
      totalEleitores
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Erro ao carregar a urna');
  }
};

export default { resultados };