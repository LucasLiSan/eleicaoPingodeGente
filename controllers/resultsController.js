import CandidateService from "../services/candidateService.js";

const resultados = async (req, res) => {
    try {
        // Recupera os top 5 candidatos ordenados por votos
        const topCandidates = await CandidateService.getTopCandidates(5);
        
        // Calcula o total de votos para calcular porcentagens
        const totalVotes = topCandidates.reduce((sum, candidate) => sum + candidate.votes, 0);
        
        res.render('resultado', { candidates: topCandidates, totalVotes });
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao carregar a urna');
    }
}

export default { resultados };