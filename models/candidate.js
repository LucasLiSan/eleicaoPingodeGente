import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    name: String,
    viceName: String,
    party: String,
    partyNumber: Number,
    candidatePic: String,
    viceCandidatePic: String,
    votes: {
        type: Number,
        default: 0
    }
});

const Candidate = mongoose.model('Candidate', candidateSchema);

export default Candidate;