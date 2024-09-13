import CandidateService from "../services/voteService.js";
import { ObjectId } from "mongodb";

/* ----- CREATE ----- */
/* --- Inserir candidato novo --- */
const createNewCandidate = async (req, res) => {
    try {
        const { name, viceName, party, partyNumber} = req.body;
        const newCandidate = await CandidateService.create(name, viceName, party, partyNumber);
        res.status(201).json({ Success: `Candidato '${newCandidate.name}' cadastrado com sucesso` }); // Código Status 201: Created
    } catch (error) { 
        console.log (error);
        res.status(500).json({ err: 'Erro interno do servidor' }); // Código Status 500: Internal Server Error
    }
}

/* ----- READ ----- */
    /* --- Listar todos os candidatos --- */
    const getAllCandidates = async (req, res) => {
        try {
            const candidates = await CandidateService.getAll();
            res.status(200).json({ candidates }); // Código Status 200: OK
        } catch (error) {
            console.log(error);
            res.status(500).json({ err: 'Erro interno do servidor' }); // Código Status 500: Internal Server Error
        }
    }

    /* --- Listar um candidato --- */
    const getOneCandidate = async (req, res) => {
        try {
            if(ObjectId.isValid(req.params.id)) {
                const id = req.params.id;
                const candidate = await CandidateService.getOne(id);
                if (!candidate) {
                    res.status(404).json({ err: 'Candidato não encontrado.' }); // Código Status 404: Not Found
                } else {
                    res.status(200).json({ candidate }); // Código Status 200: OK
                }
            } else {
                res.sendStatus(400); // Código Status 400: Bad Request
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ err: 'Erro interno do servidor' }); // Código Status 500: Internal Server Error
        }
    }

/* ----- UPDATE ----- */
    /* --- Atualizar informações candidato --- */
    const updateCandidates = async (req, res) => {
        try {
            if(ObjectId.isValid(req.params.id)) {
                const id = req.params.id;
                const { name, viceName, party, partyNumber } = req.body;
                const existingCandidate = await CandidateService.getOne(id);
                if (!existingCandidate) { return res.status(404).json({ err: 'Candidato não encontrado.' }); } // Código Status 404: Not Found
                await CandidateService.updateCandidates(id, name, viceName, party, partyNumber);
                res.status(200).json({ Success: `Candidato '${name}' atualizado com sucesso.` }); // Código Status 200: OK
            } else {
                res.sendStatus(400); // Código Status 400: Bad Request
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ err: 'Erro interno do servidor.' }); // Código Status 500: Internal Server Error
        }
    }

    /* --- Atualizar informações votos --- */
    const updateVotes = async (req, res) => {
        try {
            if(ObjectId.isValid(req.params.id)) {
                const id = req.params.id;
                const { votes } = req.body;
                const existingCandidate = await CandidateService.getOne(id);
                if (!existingCandidate) { return res.status(404).json({ err: 'Candidato não encontrado.' }); }  // Código Status 404: Not Found
                await CandidateService.updateVotes(id, votes);
                res.status(200).json({ Success: `Votos do candidato '${existingCandidate.name}' atualizados com sucesso.` }); // Código Status 200: OK
            } else {
                res.sendStatus(400); // Código Status 400: Bad Request
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ err: 'Erro interno do servidor.' }); // Código Status 500: Internal Server Error
        }
    }

/* ----- DELETE ----- */
/* --- Deletar candidato --- */
const deleteCandidate = async (req, res) => {
    try {
        if (ObjectId.isValid(req.params.id)) {
            const id = req.params.id;
            const existingCandidate = await CandidateService.getOne(id);
            if (!existingCandidate) { return res.status(404).json({ err: 'Candidato não encontrado.' }); } // Código Status 404: Not Found
            await CandidateService.delete(id);
            res.status(204).json({ Success: `Candidato '${existingCandidate.name}' deletado com sucesso.` }); // Código Status 204: No Content
        } else { res.sendStatus(400); } // Código Status 400: Bad Request
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: 'Erro interno do servidor.' }); // Código Status 500: Internal Server Error
    }
}

export default { createNewCandidate, getAllCandidates, getOneCandidate, updateCandidates, updateVotes, deleteCandidate };