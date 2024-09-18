/* ---------- CONTROLLER DE MANUTENÇÃO DA URNA ELETRÔNICA ---------- */

/* ----------\/ IMPORTAÇÃO DE MÓDULOS \/---------- */
import CandidateService from "../services/candidateService.js";

const urna = async (req, res) => {
    try {
        const candidates = await CandidateService.getAll();
        res.render('urna', { candidates });
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao carregar a urna');
    }
}

const processVote = async (req, res) => {
    try {
        const { partyNumber } = req.body;

        if (!partyNumber) {
            return res.status(400).json({ err: 'Número de partido ou voto em branco não preenchido!' });
        }

        const existingCandidate = await CandidateService.getByPartyNumber(partyNumber);

        if (!existingCandidate) {
            return res.status(404).json({ err: 'Candidato não encontrado.' });
        }

        await CandidateService.updateVotesByPartyNumber(partyNumber, 1);

        // Redireciona para a página de loading após a atualização
        res.redirect('/loading');
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: 'Erro interno do servidor.' });
    }
}

const loadingScreen = async (req, res) => {
    try {
        res.render('loading');
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao carregar a pagina de loading');
    }
}

const endScreen = async (req, res) => {
    try {
        res.render('end');
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao carregar a pagina final');
    }
}

export default { urna, processVote, loadingScreen, endScreen };