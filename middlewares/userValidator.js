const {body} = require("express-validator")

module.exports = [
   body("email").isEmail(),
   body("password").isLength({
    min: 8,
    max: 12
   })
] 