function auth (req,res,next){
    if(req.session.auth) next();
    else{
        res.status(403).json({ err : "Forbidden"});
    }
}

module.exports = auth;