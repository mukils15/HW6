const express = require('express');
const router = express.Router();
const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')


router.post('/signup', (req, res, next) => {
    const userNew = new User({
        username: req.query.username,
        password: req.query.password
    });
    userNew.save(function (err) {
        if (err){
            next(new Error("Couldn't add user"));
        } else {
            return res.send("Added user!")
        }
    });
})

router.post('/login', (req, res, next) => {
    username = req.body.username;
    password = req.body.password;
    
    if (User.findOne({username: username},
        function (err, user){
            if (err){
                next(new Error("Couldn't search for user"));
            } else {
                if (user){
                    user.checkPassword(password,
                        function(err, isRight){
                            if (err){
                                next(new Error("Login error"));
                            }
                            if (isRight){
                                req.session.username = username;
                                res.send("Signed in");
                            } else {
                                res.send("Wrong password");
                            }
                    })
                } else {
                    res.send("No such user");
                }
             
            }      
        }));
})

router.post('/logout', isAuthenticated, (req, res) => {
    req.session.username = "";
    res.send("Logged out!");
})

module.exports = router