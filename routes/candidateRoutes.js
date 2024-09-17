import express from "express";
import candidateController from "../controllers/candidateController.js";

const candidateRoutes = express.Router();

/* ----- ENDPOINTS ----- */
/* --- CREATE --- */
candidateRoutes.post('/candidate', candidateController.createNewCandidate);

/* --- READ --- */
    /* Ver todos */
    candidateRoutes.get('/candidates', candidateController.getAllCandidates);

    /* Ver um */
        /* Ver um com o id */
        candidateRoutes.get('/candidate/:id', candidateController.getOneCandidate);
        /* Ver um com o partyNumber */
        candidateRoutes.get('/candidate/party/:partyNumber', candidateController.getOneByPartyNumber);

/* --- UPDATE --- */
    /* Atualizar candidato */
    candidateRoutes.patch('/candidate/:id', candidateController.updateCandidates);

    /* Atualizar votos: por id */
    candidateRoutes.patch('/candidate/:id/votes', candidateController.updateVotes);

    /* Atualizar votos usando partyNumber */
    candidateRoutes.patch('/candidate/partyNumber/:partyNumber/votes', candidateController.updateVotesByPartyNumber);

/* --- DELETE --- */
candidateRoutes.delete('/candidate/:id', candidateController.deleteCandidate);

export default candidateRoutes;