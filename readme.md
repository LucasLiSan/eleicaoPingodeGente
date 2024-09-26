# Documentação da API
![NPM](https://img.shields.io/npm/l/react)

# API Election
Esta API é utilizada para gerenciar os votos dos candidatos na simulação de eleição da EMEB PINGO DE GENTE, permitindo operações de CRUD.
> Create, Read, Update, Delete (Criar, Ler, Atualizar e Deletar)

Tecnologias utilizadas: <br>
<p>
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=mongodb,nodejs" />
  </a>
</p>
<p>
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=html,css,js" />
  </a>
</p>
Editor <br>
<p>
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=vscode" />
  </a>
</p>

## Estrutura do JSON da API
```
{
	"name": "Nome do candidato",
	"viceName": "Nome do vice candidato",
	"party": "Sigla do partido",
	"partyNumber": "Número do partido",
	"candidatePic": "Foto do candidato (url)",
	"viceCandidatePic": "Foto do vice candidato (url)",
	"votes": "Número de votos",
	"votesByRoom": "Irá receber os votos de cada seção"
}
```

> [!TIP]
> Não é obrigatório mas de preferencia usar a extensão .webp para as imagens. Tem um tamanho de arquivo menor sem perder a qualidade da imagem.

## ENDPOINTS
### <span style = "color:#00FF00; font-weight: bold">POST</span> /candidate
Esse endpoint é responsável por cadastrar uma nova chapa de candidatura no banco de dados.

#### Parâmetros:
- name: String;
- viceName: String,
- party: String,
- partyNumber: Number,
- candidatePic: String,
- viceCandidatePic: String

##### Exemplo de requisição:
```
{
	"name": "Carlos Antônio Gomes",
	"viceName": "Dílton Carlos Salomoni",
	"party": "PRN",
	"partyNumber": 36,
	"candidatePic": "/imgs/candidates/36-carlosAntônioGomes.webp",
	"viceCandidatePic": "/imgs/viceCandidates/36-díltonCarlosSalomoni.webp"
}
```

> No cadastro não é necessário inserir o a chave (key) "votes" (votos), ela é inserida automáticamente com o valor 0.

#### Respostas:
<span style = "color:#00FF00; font-weight: bold">Criado! 201</span><br>
Caso essa resposta aconteça, a chapa de candidatura foi criada com sucesso.

##### Exemplo de resposta:
```
{
	"Success": "Candidato 'Carlos Antônio Gomes' cadastrado com sucesso"
}
```

<span style = "color:#FF0000; font-weight: bold">Erro Interno do Servidor! 500</span><br>
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

##### Exemplo de resposta:
```
{
    "err": "Erro interno do servidor!"
}
```

### GET /candidates
Esse endpoint é responsável por retornar a listagem de todas as a chapas de candidatura cadastradas no banco de dados.

#### Parâmetros:
*Nenhum*

#### Respostas:
<span style = "color:#00FF00; font-weight: bold">OK! 200</span><br>
Caso essa resposta aconteça, você vai receber a listagem de todas as a chapas de candidatura cadastradas.

##### Exemplo de resposta:
```
{
	"candidates": [
		{
			"_id": "66e48371d65bab42cbeecb61",
			"name": "Fernando Henrique Cardoso",
			"viceName": "Marco Maciel",
			"party": "PSDB",
			"partyNumber": 45,
			"votes": 14744,
			"__v": 0,
			"candidatePic": "/imgs/candidates/45-fernandoHenriqueCardoso.webp",
			"viceCandidatePic": "/imgs/viceCandidates/45-marcoMaciel.webp"
		},
		{
			"_id": "66e48739d80de38d06646076",
			"name": "Luiz Inácio Lula da Silva",
			"viceName": "Aloizio Mercadante",
			"party": "PT",
			"partyNumber": 13,
			"votes": 9874,
			"__v": 0,
			"candidatePic": "/imgs/candidates/13-luizInacioLulaDaSilva.webp",
			"viceCandidatePic": "/imgs/viceCandidates/13-aloizioMercadante.webp"
		},
		{
			"_id": "66e48c4e58b0269873dac4e5",
			"name": "Carlos Antônio Gomes",
			"viceName": "Dílton Carlos Salomoni",
			"party": "PRN",
			"partyNumber": 36,
			"votes": 128,
			"__v": 0,
			"candidatePic": "/imgs/candidates/36-carlosAntônioGomes.webp",
			"viceCandidatePic": "/imgs/viceCandidates/36-díltonCarlosSalomoni.webp"
		},
		{
			"_id": "66e48ed058b0269873dac4e7",
			"name": "Esperidião Amin",
			"viceName": "Gardênia Gonçalves",
			"party": "PPR",
			"partyNumber": 11,
			"votes": 438,
			"__v": 0,
			"candidatePic": "/imgs/candidates/11-esperidiãoAmin.webp",
			"viceCandidatePic": "/imgs/viceCandidates/11-gardêniaGonçalves.webp"
		},
		{
			"_id": "66e48eec58b0269873dac4e9",
			"name": "Hernani Goulart Fortuna",
			"viceName": "Vítor Jorge Abdala Nósseis",
			"party": "PSC",
			"partyNumber": 20,
			"votes": 72,
			"__v": 0,
			"candidatePic": "/imgs/candidates/20-hernaniGoulartFortuna.webp",
			"viceCandidatePic": "/imgs/viceCandidates/20-vítorJorgeAbdalaNósseis.webp"
		},
		{
			"_id": "66e48f0858b0269873dac4eb",
			"name": "Leonel Brizola",
			"viceName": "Darcy Ribeiro",
			"party": "PDT",
			"partyNumber": 12,
			"votes": 1005,
			"__v": 0,
			"candidatePic": "/imgs/candidates/12-leonelBrizola.webp",
			"viceCandidatePic": "/imgs/viceCandidates/12-darcyRibeiro.webp"
		},
		{
			"_id": "66e48f5858b0269873dac4ee",
			"name": "Orestes Quércia",
			"viceName": "Iris de Araújo",
			"party": "PMDB",
			"partyNumber": 15,
			"votes": 335,
			"__v": 0,
			"candidatePic": "/imgs/candidates/15-orestesQuércia.webp",
			"viceCandidatePic": "/imgs/viceCandidates/15-irisDeAraújo.webp"
		},
		{
			"_id": "66e4903b58b0269873dac4f4",
			"name": "Enéas Carneiro",
			"viceName": "Roberto Gama",
			"party": "PRONA",
			"partyNumber": 56,
			"votes": 566,
			"__v": 0,
			"candidatePic": "/imgs/candidates/56-eneasCarneiro.webp",
			"viceCandidatePic": "/imgs/viceCandidates/56-robertoGama.webp"
		},
		{
			"_id": "66e4a1877173354212c25a45",
			"name": "Aldenoura de Sá Porto",
			"viceName": "Nina Maria Alexin",
			"party": "PBDDM",
			"partyNumber": 19,
			"votes": 0,
			"__v": 0,
			"candidatePic": "/imgs/candidates/19-aldenouraDeSaPorto.webp",
			"viceCandidatePic": "/imgs/viceCandidates/19-ninaMariaAlexin.webp"
		},
		{
			"_id": "66eae7b7e7ebfb784ba7a375",
			"name": "VOTO EM BRANCO",
			"party": "BRANCO",
			"partyNumber": 0,
			"votes": 4,
			"__v": 0
		},
		{
			"_id": "66eaeadbe7ebfb784ba7a378",
			"name": "VOTO NULO",
			"party": "NULO",
			"partyNumber": 999,
			"votes": 0,
			"__v": 0
		}
	]
}
```
> Inserir de preferência o ***partyNumber*** dos votos em Branco ou nulos um número com mais digitos do que os dos candidatos.

<span style = "color:#FF0000; font-weight: bold">Erro Interno do Servidor! 500</span><br>
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.
> Motivos podem incluir falhas na comunicação com o banco de dados.

##### Exemplo de resposta:
```
{
    "err": "Erro interno do servidor!"
}
```

### GET /candidate/ID
Esse endpoint é responsável por retornar as informações de uma chapa de candidatura específica pelo seu **ID**.

#### Parâmetros:
- **ID da chapa de candidatura a ser solicitado**.

##### Exemplo de requisição:
```
/candidate/66e48f5858b0269873dac4ee
```

#### Respostas:
<span style = "color:#00FF00; font-weight: bold">OK! 200</span><br>
Caso essa resposta aconteça, você vai receber as informações da chapa de candidatura solicitada.

##### Exemplo de resposta:
```
{
	"candidate": {
		"_id": "66e48f5858b0269873dac4ee",
		"name": "Orestes Quércia",
		"viceName": "Iris de Araújo",
		"party": "PMDB",
		"partyNumber": 15,
		"votes": 335,
		"__v": 0,
		"candidatePic": "/imgs/candidates/15-orestesQuércia.webp",
		"viceCandidatePic": "/imgs/viceCandidates/15-irisDeAraújo.webp"
	}
}
```

<span style = "color:#FAA500; font-weight: bold">Não Encontrado! 404</span><br>
Caso essa resposta aconteça, significa que a chapa de candidatura com o ID fornecido não foi encontrada.

##### Exemplo de resposta:
```
{
    "err": "Candidato não encontrado!"
}
```

<span style = "color:#FAA500; font-weight: bold">Requisição Inválida! 400</span><br>
Caso essa resposta aconteça, significa que o ID fornecido é inválido.

##### Exemplo de resposta:
```
{
    "err": "ID inválido!"
}
```

<span style = "color:#FF0000; font-weight: bold">Erro Interno do Servidor! 500</span><br>
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

##### Exemplo de resposta:
```
{
    "err": "Erro interno do servidor!"
}
```

### GET /candidate/party/PARTYNUMBER
Esse endpoint é responsável por retornar as informações de uma chapa de candidatura específica pelo seu ***PARTYNUMBER***.

#### Parâmetros:
- **PARTYNUMBER da chapa de candidatura a ser solicitado**.

##### Exemplo de requisição:
```
/candidate/party/56
```

#### Respostas:
<span style = "color:#00FF00; font-weight: bold">OK! 200</span><br>
Caso essa resposta aconteça, você vai receber as informações da chapa de candidatura solicitada.

##### Exemplo de resposta:
```
{
	"candidate": {
		"_id": "66e4903b58b0269873dac4f4",
		"name": "Enéas Carneiro",
		"viceName": "Roberto Gama",
		"party": "PRONA",
		"partyNumber": 56,
		"votes": 566,
		"__v": 0,
		"candidatePic": "/imgs/candidates/56-eneasCarneiro.webp",
		"viceCandidatePic": "/imgs/viceCandidates/56-robertoGama.webp"
	}
}
```

<span style = "color:#FAA500; font-weight: bold">Não Encontrado! 404</span><br>
Caso essa resposta aconteça, significa que a chapa de candidatura com o PARTYNUMBER fornecido não foi encontrada.

##### Exemplo de resposta:
```
{
    "err": "Candidato não encontrado!"
}
```

<span style = "color:#FAA500; font-weight: bold">Requisição Inválida! 400</span><br>
Caso essa resposta aconteça, significa que o PARTYNUMBER fornecido é inválido.

##### Exemplo de resposta:
```
{
    "err": "PARTYNUMBER inválido!"
}
```

<span style = "color:#FF0000; font-weight: bold">Erro Interno do Servidor! 500</span><br>
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

##### Exemplo de resposta:
```
{
    "err": "Erro interno do servidor!"
}
```

### <span style = "color:#FFFF00; font-weight: bold">PATCH</span> /candidate/ID
Esse endpoint é responsável por atualizar as informações de uma chapa de candidatura pelo seu **ID**.

#### Parâmetros:
- **ID**;
- **Valor que será alterado**.

> Não é necessário incluir todos os campos, só o que será alterado.

> [!WARNING]  
> Não inserir o número de votos nesse endpoint, pra essa situação existe o endpoint específico. 

##### Exemplo de requisição:
```
/candidate/66e48eec58b0269873dac4e9

{
	"name": "Hernani Goulart Fortuna"
}
```
> "name": "Hernani Fortuna" (Valor inicial).

#### Respostas:
<span style = "color:#00FF00; font-weight: bold">OK! 200</span><br>
Caso essa resposta aconteça, as informações da chapa de candidatura foram atualizadas com sucesso.

##### Exemplo de resposta:
```
{
	"Success": "Candidato 'Hernani Goulart Fortuna' atualizado com sucesso."
}
```

<span style = "color:#FAA500; font-weight: bold">Requisição Inválida! 400</span><br>
Caso essa resposta aconteça, significa que o ID fornecido é inválido ou a requisição contém dados malformados.

##### Exemplo de resposta:
```
{
    "err": "ID inválido ou dados malformados!"
}
```

<span style = "color:#FF0000; font-weight: bold">Erro Interno do Servidor! 500</span><br>
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

##### Exemplo de resposta:
```
{
    "err": "Erro interno do servidor!"
}
```

### <span style = "color:#FFFF00; font-weight: bold">PATCH</span> /candidate/ID/votes
Esse endpoint é responsável por atualizar o número de votos de uma chapa de candidatura pelo seu **ID**.

#### Parâmetros:
- **ID**;
- **Quantidade de votos a ser acrescida**.

> Não é necessário incluir todos os campos, apenas o de votos.

> [!WARNING]  
> Não inserir as outras informações do chapa de candidatura nesse endpoint, pra essa situação existe o endpoint específico. 

##### Exemplo de requisição:
```
/candidate/66e48371d65bab42cbeecb61/votes

{
	"votes": 14744
}
```

> [!CAUTION]
> Inserir números sem pontos ou virgulas.

#### Respostas:
<span style = "color:#00FF00; font-weight: bold">OK! 200</span><br>
Caso essa resposta aconteça, a quantidade de votos da chapa de candidatura foi atualizada com sucesso.

##### Exemplo de resposta:
```
{
	"Success": "Votos do candidato 'Fernando Henrique Cardoso' atualizados com sucesso."
}
```

<span style = "color:#FAA500; font-weight: bold">Requisição Inválida! 400</span><br>
Caso essa resposta aconteça, significa que o ID fornecido é inválido ou a requisição contém dados malformados.

##### Exemplo de resposta:
```
{
    "err": "ID inválido ou dados malformados!"
}
```

<span style = "color:#FF0000; font-weight: bold">Erro Interno do Servidor! 500</span><br>
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

##### Exemplo de resposta:
```
{
    "err": "Erro interno do servidor!"
}
```

### <span style = "color:#FFFF00; font-weight: bold">PATCH</span> /candidate/partyNumber/:partyNumber/votes
Esse endpoint é responsável por atualizar o número de votos de uma chapa de candidatura pelo seu ***PARTYNUMBER***.

#### Parâmetros:
- ***PARTYNUMBER***;
- **Quantidade de votos a ser acrescida**.

> Não é necessário incluir todos os campos, apenas o de votos.

> [!WARNING]  
> Não inserir as outras informações do chapa de candidatura nesse endpoint, pra essa situação existe o endpoint específico. 

##### Exemplo de requisição:
```
/candidate/partyNumber/13/votes

{
	"votes": 9872
}
```

> [!CAUTION]
> Inserir números sem pontos ou virgulas.

#### Respostas:
<span style = "color:#00FF00; font-weight: bold">OK! 200</span><br>
Caso essa resposta aconteça, a quantidade de votos da chapa de candidatura foi atualizada com sucesso.

##### Exemplo de resposta:
```
{
	"Success": "Votos do candidato 'Luiz Inácio Lula da Silva' atualizados com sucesso."
}
```

<span style = "color:#FAA500; font-weight: bold">Requisição Inválida! 400</span><br>
Caso essa resposta aconteça, significa que o ID fornecido é inválido ou a requisição contém dados malformados.

##### Exemplo de resposta:
```
{
    "err": "ID inválido ou dados malformados!"
}
```

<span style = "color:#FF0000; font-weight: bold">Erro Interno do Servidor! 500</span><br>
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

##### Exemplo de resposta:
```
{
    "err": "Erro interno do servidor!"
}
```

### <span style = "color:#FF0000; font-weight: bold">DELETE</span> /candidate/ID
Esse endpoint é responsável por deletar uma chapa de candidatura específica pelo seu **ID**.

#### Parâmetros:
- **ID**

##### Exemplo de requisição:
```
/candidate/66e4a1877173354212c25a45
```

#### Respostas:
<span style = "color:#00FF00; font-weight: bold">Sem Conteúdo! 204</span><br>
Caso essa resposta aconteça, a chapa de candidatura foi deletada com sucesso e não há conteúdo para retornar ao cliente.

##### Exemplo de resposta:
```
Nenhum conteúdo retornado.
```

<span style = "color:#FAA500; font-weight: bold">Requisição Inválida! 400</span><br>
Caso essa resposta aconteça, significa que o ID fornecido é inválido.

##### Exemplo de resposta:
```
{
    "err": "ID inválido!"
}
```

<span style = "color:#FF0000; font-weight: bold">Erro Interno do Servidor! 500</span><br>
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

##### Exemplo de resposta:
```
{
    "err": "Erro interno do servidor!"
}
```

## REFERÊNCIAS
Os quantitativos de votos usados nas demonstrações foram retiradas do site do [Tribunal Superior Eleitoral](https://www.tse.jus.br/#/):
- [Chapas de candidaturas](https://pt.wikipedia.org/wiki/Elei%C3%A7%C3%A3o_presidencial_no_Brasil_em_1994);
- Quantidade de votos: [Resultados das Eleições 1994 - 1º Turno - Brasil
](https://www.tse.jus.br/eleicoes/eleicoes-anteriores/eleicoes-1994/resultados-das-eleicoes-1994/brasil/resultados-das-eleicoes-1994-brasil).

### URNA ELETRÔNICA DO BRASIL
[:balance_scale: Justiça Eleitoral](https://www.justicaeleitoral.jus.br/urna-eletronica/) • ***O sistema de votação eletrônico brasileiro permite o exercício da cidadania com maior segurança. A urna foi desenvolvida para computar votos de forma segura e sigilosa, atendendo à demanda e às características específicas do Brasil.***