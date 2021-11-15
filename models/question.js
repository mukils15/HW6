let mongoose = require('mongoose');
const uri = "mongodb+srv://mukil:BreakFromToronto15@cis197.hdld0.mongodb.net/questions?retryWrites=true&w=majority"

mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const QuestionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    answer: {
        type: String,
    },
    author: {
        type: String,
        required: true
    }
});

module.exports = Question = mongoose.model('Question', QuestionSchema);