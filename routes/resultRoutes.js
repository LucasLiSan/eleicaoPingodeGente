import express from 'express';
import resultsController from '../controllers/resultsController.js';

const resultadoRoutes = express.Router();

resultadoRoutes.get('/resultado', resultsController.resultados);

export default resultadoRoutes;