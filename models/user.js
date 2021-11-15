var mongoose = require('mongoose');
const uri = "mongodb+srv://mukil:BreakFromToronto15@cis197.hdld0.mongodb.net/users?retryWrites=true&w=majority"
const bcrypt = require('bcrypt');

mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function (next) {
    var user = this
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, 10, function (err, hash) {
        user.password=hash
        next()
    } )
})

UserSchema.methods.checkPassword = function (possiblePass, cb) {
    bcrypt.compare(possiblePass, this.password, function (err, isRight) {
        if (err) return cb(err);
        cb(null, isRight)
    })
}

module.exports = User = mongoose.model('User', UserSchema);