const resultados = async (req, res) => {
    try {
        res.render('resultado');
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao carregar a urna');
    }
}

export default { resultados }