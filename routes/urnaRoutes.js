import express from 'express';
import urnaController from '../controllers/urnaController.js';

const urnaRoutes = express.Router();

// Rota para exibir a view da urna
urnaRoutes.get('/urna', urnaController.urna);

export default urnaRoutes;