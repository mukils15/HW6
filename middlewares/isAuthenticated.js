const isAuthenticated = (req, res, next) => {
    if (req.session === undefined){
        next();
    } else {
        if (req.session.username === undefined || req.session.username ===""){
            next(new Error("Something didn't work!"))
        } else {
            next()
        }
    }
}

module.exports = isAuthenticated