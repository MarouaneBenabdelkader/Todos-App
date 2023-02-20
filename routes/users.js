const {Router} = require('express')
const bcrypt = require('bcrypt');
const User = require('../models/user');
const {validationResult} = require("express-validator")
const validator = require('../middlewares/userValidator');
const router = new Router();


router.post('/register',...validator, async  (req, res) => {
    const errs = validationResult(req)
    if(!errs.isEmpty()){
        return res.status(404).json({errors: errs.array()});
    }

    const {email, password} = req.body;

    let user = await User.findOne({email : email})

    if(user){
        res.status(400).json({message: "User already exists"})
    }

    let hash = await bcrypt.hash(password , 10);

    let newUser = new User({
        email,
        password : hash,
        todos : []
     })

     try{
        await newUser.save();
        console.log("User saved successfully");
        res.status(201).json({message : "Registration successful" , email : newUser.email})
     }catch(err) {
        console.log("error saving user");
     }
})

router.post('/login', ...validator, async (req, res) => {
    
    try {
        const errs = validationResult(req)

        if(!errs.isEmpty()){
            return res.status(404).json({errors: errs.array()});
        }

        let {email, password} = req.body;

        let user = await User.findOne({email : email})

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        let result = await bcrypt.compare(password, user.password)

        if(result){
            req.session.auth = true;
            req.session.userId = user._id;
            return res.status(200).json({message: "login successfully"})
        }

        res.status(400).json({message: "wrong password"})
    
    } catch(err) {
        console.log("[login] Error: " + err);
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({message: "logout successfully"})
})

router.get("/isConnected", async (req, res) => {
    if(!req.session.auth)
        res.json({auth:false})
    else
        {
          let user =   await User.findById(req.session.userId)
          res.json({auth:true,email:user.email})
        }
})

module.exports = router;