import express from 'express';
import urnaController from '../controllers/urnaController.js';

const urnaRoutes = express.Router();

// Rota para exibir a view da urna
urnaRoutes.get('/urna', urnaController.urna);

// Rota para receber os votos
urnaRoutes.post('/urna/vote', urnaController.processVote);

// Rota para exibir a view da tela de carregando
urnaRoutes.get('/loading', urnaController.loadingScreen);

// Rota para exibir a view da tela fim
urnaRoutes.get('/end', urnaController.endScreen);

export default urnaRoutes;