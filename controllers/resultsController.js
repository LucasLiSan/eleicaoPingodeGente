import CandidateService from "../services/candidateService.js";

const totalEleitores = 39377; // Defina o número total de eleitores

const resultados = async (req, res) => {
  try {
    // Recupera os top 5 candidatos ordenados por votos
    const topCandidates = await CandidateService.getTopCandidates(5);
    
    // Recupera os votos nulos e brancos
    const votosNulos = await CandidateService.getNullVotes();
    const votosBrancos = await CandidateService.getBlankVotes();

    // Total de votos computados (candidatos + nulos + brancos)
    const totalVotes = topCandidates.reduce((sum, candidate) => sum + candidate.votes, 0) + votosNulos + votosBrancos;

    //Abstenções
    const totalAbsentee = totalEleitores - totalVotes;

    // Cálculo de votos válidos (apenas candidatos)
    const totalValidVotes = totalEleitores - (totalAbsentee + votosNulos + votosBrancos);

    // Cálculo de votantes e ausentes
    const totalVotantes = totalVotes;
    const totalAusentes = totalEleitores - totalVotantes;
    
    // Cálculo das urnas apuradas (13 salas)
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
