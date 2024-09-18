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

        res.status(200).json({ Success: `Votos do candidato '${existingCandidate.name}' atualizados com sucesso.` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: 'Erro interno do servidor.' });
    }
};

export default { urna, processVote };