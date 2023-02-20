 const {Schema} = require('mongoose')

 
 
    const TodoSchema =  new Schema ({
            title:{
                type:String,
                required:true
             },
            completed:{
                type:Boolean,
                required:true
            }
        })

module.exports = TodoSchema