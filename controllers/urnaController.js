/* ---------- CONTROLLER DE MANUTENÇÃO DA URNA ELETRÔNICA ---------- */

/* ----------\/ IMPORTAÇÃO DE MÓDULOS \/---------- */
import CandidateService from "../services/candidateService.js";

const urna = async (req, res) => {
    try {
        res.render('urna');
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao carregar a urna');
    }
}

export default { urna };