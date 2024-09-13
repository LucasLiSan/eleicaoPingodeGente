import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    name: String,
    viceName: String,
    party: String,
    partyNumber: Number,
    votes: {
        type: Number,
        default: 0
    }
});

const Candidate = mongoose.model('Candidate', candidateSchema);

export default Candidate;