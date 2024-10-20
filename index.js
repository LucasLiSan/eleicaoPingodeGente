//https://vinyldavyl.medium.com/how-to-deploy-a-fullstack-nodejs-and-express-app-on-vercel-c79d433eeb6

/* ----------  IMPORTAÇÃO DE MÓDULOS ---------- */
import express from "express";
import multer from "multer";
import ip from "ip";
//import mongoose from "mongoose";
import dotenv from "dotenv";

/* ----------  IMPORTAÇÃO DE CONTROLLERS ---------- */


/* ----------  IMPORTAÇÃO DE MODELS ---------- */
import Candidate from "./models/candidate.js";

/* ----------  BANCO DE DADOS ---------- */
import mongoose from "./config/dbConnection.js";

/* ----------  IMPORTAÇÃO DE ROTAS ---------- */
import candidateRoutes from "./routes/candidateRoutes.js";
import urnaRoutes from "./routes/urnaRoutes.js";
import resultadoRoutes from "./routes/resultRoutes.js";

/* ----------  CARREGANDO VARIÁVEIS DE AMBIENTE ---------- */
dotenv.config();

/* ----------  INICIANDO O EXPRESS ---------- */
const app = express();

/* ----------  DEFINIÇÕES BÁSICAS ---------- */
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* ----------\/ INICIANDO AS ROTAS(Endpoints) \/---------- */
app.use('/', candidateRoutes);
app.use('/', urnaRoutes);
app.use('/', resultadoRoutes);

/* ----------\/ INICIANDO OS CONTROLLERS \/---------- */


/* ----------\/ INICIANDO SERVIDOR \/---------- */
const port = 8080;
const myServer = ip.address();
const renderPort = '0.0.0.0';
console.log(myServer);

app.listen(port, renderPort, (error) => {
    if(error) {console.log(error); }
    console.log(`API rodando em http://localhost:${port}.`);
});
