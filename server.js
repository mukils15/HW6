const express = require('express');
const session = require('cookie-session');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000

const accountRouter = require('./routes/account')
const apiRouter = require('./routes/api')

app.use('/account', accountRouter);
app.use('/api/questions', apiRouter);
app.use(express.json());

app.use(session({
    name: 'session',
    username: "",
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000 
}))

function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.json({ message: err.message,
        error: err })
}

const uri = "mongodb+srv://mukil:BreakFromToronto15@cis197.hdld0.mongodb.net/questions?retryWrites=true&w=majority"

try {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
} catch (e) {
    console.log("could not connect");
}

app.use(errorHandler);
app.listen(port, () =>{
    console.log('Listening on port ' + port);
})
