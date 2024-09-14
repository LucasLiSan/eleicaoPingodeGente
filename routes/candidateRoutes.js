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
    candidateRoutes.get('/candidate/:id', candidateController.getOneCandidate);
        /* Ver um com o partyNumber */
        candidateRoutes.get('/candidate/party/:partyNumber', candidateController.getOneByPartyNumber);


/* --- UPDATE --- */
    /* Atualizar candidato */
    candidateRoutes.patch('/candidate/:id', candidateController.updateCandidates);

    /* Atualizar votos */
    candidateRoutes.patch('/candidate/:id/votes', candidateController.updateVotes);

/* --- DELETE --- */
candidateRoutes.delete('/candidate/:id', candidateController.deleteCandidate);

export default candidateRoutes;