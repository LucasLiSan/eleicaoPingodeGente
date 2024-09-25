import express from 'express';
import resultsController from '../controllers/resultsController.js';

const resultadoRoutes = express.Router();

// Rota para exibir a view dos resultados
resultadoRoutes.get('/resultado', resultsController.resultados);

export default resultadoRoutes;