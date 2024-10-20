import Candidate from "../models/candidate.js";

class CandidateService {
    /* ----- Método CADASTRAR ----- */
    async create(name, viceName, party, partyNumber, candidatePic, viceCandidatePic)
    {
        try {
            const newCandidate = new Candidate ({ name, viceName, party, partyNumber, candidatePic, viceCandidatePic, votes:0 });
            await newCandidate.save();
            return newCandidate;
        } catch (error) { console.log(error); }
    }

    /* ----- Método READ ----- */
        /* --- Método LISTAR TODOS --- */
        async getAll() {
            try {
                const candidates = await Candidate.find();
                return candidates;
            } catch (error) { console.log(error); }
        }

        /* --- Método LISTAR UM: id --- */
        async getOne(id) {
            try {
                const candidate = await Candidate.findOne({ _id:id });
                return candidate;
            } catch (error) { console.log(error); }
        }

        /* --- Método LISTAR UM: partyNumber --- */
        async getByPartyNumber(partyNumber) {
            try {
                const candidate = await Candidate.findOne({ partyNumber: partyNumber });
                return candidate;
            } catch (error) {
                console.log(error);
                throw new Error('Erro ao buscar candidato pelo partyNumber');
            }
        }

        /* --- Método LISTAR OS CINCO MAIS VOTADOS --- */
        async getTopCandidates(limit = 5) {
            try {
                const candidates = await Candidate.find().sort({ votes: -1 }).limit(limit);
                return candidates;
            } catch (error) {
                console.log(error);
                throw new Error('Erro ao buscar os principais candidatos');
            }
        }

        /* --- Método LISTAR VOTOS NULOS --- */
        async getNullVotes() {
            const nullVoteCandidate = await Candidate.findOne({ name: "VOTO NULO" });
            return nullVoteCandidate ? nullVoteCandidate.votes : 0;
        }

        /* --- Método LISTAR VOTOS NULOS POR SALA --- */
        async getNullVotesByRoom(roomNumber) {
            try {
                const nullVoteCandidate = await Candidate.findOne({ name: "VOTO NULO" });
                return nullVoteCandidate && nullVoteCandidate.votesByRoom.has(roomNumber)
                    ? nullVoteCandidate.votesByRoom.get(roomNumber)
                    : 0;
            } catch (error) {
                console.log(error);
                throw new Error('Erro ao buscar votos nulos por sala');
            }
        }

        /* --- Método LISTAR VOTOS BRANCOS --- */
        async getBlankVotes() {
            const blankVoteCandidate = await Candidate.findOne({ name: "VOTO EM BRANCO" });
            return blankVoteCandidate ? blankVoteCandidate.votes : 0;
        }

    /* ----- Método UPDATE ----- */
        /* --- Método UPDATE CANDIDATES: id --- */
        async updateCandidates(id, name, viceName, party, partyNumber, candidatePic, viceCandidatePic) {
            try {
                await Candidate.findByIdAndUpdate(
                    id,
                    { name, viceName, party, partyNumber, candidatePic, viceCandidatePic },
                    { new : true }
                );
                console.log(`Alterações no candidato id: ${id} feitas com sucesso`);
            } catch (error) { console.log(error); }
        }

        /* --- Método UPDATE VOTES: id --- */
        async updateVotes(id, voteIncrement) {
            try {
                await Candidate.findByIdAndUpdate(
                    id,
                    { $inc: { votes: voteIncrement } },
                    { new: true }
                );
                console.log(`Votos atualizados para o candidato id: ${id}`);
            } catch (error) { console.log(error); }
        }

        /* --- Método UPDATE VOTES: partyNumber --- */
        async updateVotesByPartyNumber(partyNumber, voteIncrement, roomNumber) {
            try {
                const candidate = await Candidate.findOne({ partyNumber });
        
                if (candidate) {
                    // Atualizar o total de votos
                    candidate.votes += voteIncrement;
        
                    // Atualizar votos por sala
                    if (candidate.votesByRoom.has(roomNumber)) {
                        candidate.votesByRoom.set(roomNumber, candidate.votesByRoom.get(roomNumber) + voteIncrement);
                    } else {
                        candidate.votesByRoom.set(roomNumber, voteIncrement);
                    }
        
                    await candidate.save();
                    console.log(`Votos atualizados para o candidato com partyNumber: ${partyNumber} na sala: ${roomNumber}`);
                }
            } catch (error) {
                console.log(error);
                throw new Error('Erro ao atualizar votos por número do partido e sala.');
            }
        }

    /* ----- Método DELETAR ----- */
    async delete(id) {
        try {
            await Candidate.findByIdAndDelete(id);
            console.log(`Candidato id: ${id} deletado com sucesso.`);
        } catch (error) { console.log(error); }
    }
}

export default new CandidateService();