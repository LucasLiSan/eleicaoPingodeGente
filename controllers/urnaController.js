/* ---------- CONTROLLER DE MANUTENÇÃO DA URNA ELETRÔNICA ---------- */

/* ----------\/ IMPORTAÇÃO DE MÓDULOS \/---------- */
import CandidateService from "../services/candidateService.js";

/* ----------\/ CONTROLLERS \/---------- */

//Carregar a urna e as informações dos candidatos
const urna = async (req, res) => {
    try {
        const candidates = await CandidateService.getAll();
        res.render('urna', { candidates });
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao carregar a urna');
    }
}

//Processar os dados do voto e sessão
const processVote = async (req, res) => {
    try {
        const { partyNumber } = req.body;
        const roomNumber = '5'; //Sessão eleitoral. Editado manualmente

        if (!partyNumber) {
            return res.status(400).json({ err: 'Número de partido ou voto em branco não preenchido!' });
        }

        const existingCandidate = await CandidateService.getByPartyNumber(partyNumber);

        if (!existingCandidate) {
            return res.status(404).json({ err: 'Candidato não encontrado.' });
        }

        await CandidateService.updateVotesByPartyNumber(partyNumber, 1, roomNumber);

        // Redireciona para a página de loading após a atualização
        res.redirect('/loading');
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: 'Erro interno do servidor.' });
    }
}

//Carregar a pagina de loading
const loadingScreen = async (req, res) => {
    try {
        res.render('loading');
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao carregar a pagina de loading');
    }
}

//Carregar a pagina fim
const endScreen = async (req, res) => {
    try {
        res.render('end');
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao carregar a pagina final');
    }
}

export default { urna, processVote, loadingScreen, endScreen }