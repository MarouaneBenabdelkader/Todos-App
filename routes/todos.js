const {Router} = require('express')
const router = new Router();
const User = require("../models/user")

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.userId)
        // let limit = req.params.limit || user.todos.length
        let todos = [] ;
        if(req.query.limit)
            for(let i = 0; (i < req.query.limit) && user.todos[i]  ; i++) 
                todos.push(user.todos[i]);
        else
            todos = user.todos;

        return res.json(todos)

    } catch (err) {
        console.log("[error]", err);
        res.status(500).json({err : "Try again"})
    }
    
})

router.get("/:id", async (req, res) => {

    try {
        const user = await User.findById(req.session.userId)
        const todo = await user.todos.find(element => element._id == req.params.id);

        if(!todo) return res.status(404).json({err : "Todo not found"}) 

        res.json(todo);
    } catch (error) {
        console.log("[error]", err);
        res.status(500).json({err : "Try again"})
    }
})


router.post('/', async (req, res) => {
    try {
        let {title, completed } = req.body

        if(!title && completed == undefined) 
            return res.status(400).json({err:"userId, title and completed are required"})
        
        const user = await User.findById(req.session.userId)
        const data = {title , completed}

        user.todos.push(data)
        await user.save();
        console.log("Successfully added");
        lenght = user.todos.length
        let myTodo = user.todos[lenght - 1];
        console.log("------------------------------------");
        console.log(myTodo);
        return res.json(myTodo)
    } catch(err) {
        console.log("[error]", err);
        res.status(500).json({err : "Try again"})
    }

})

router.delete("/:id", async (req, res) => {
     try {
        const user = await User.findById(req.session.userId)
        const todo = await user.todos.find(element => element._id == req.params.id);

        if(!todo) return res.status(404).json({err : "Todo not found"}) 

        await User.updateOne({_id : req.session.userId},{$pull : {todos : todo}})
        await user.save()
        return res.json({ message : "todo deleted successfully"})
    } catch (error) {
        console.log("[error]", error);
        res.status(500).json({err : "Try again"})
    }
})

router.put("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        const todo = await user.todos.find(element => element._id == req.params.id);
        if(!todo) return res.status(404).json({err : "Todo not found"})

        const {title, completed} = req.body;

        todo.title = title || todo.title
        todo.completed = completed == undefined ? todo.completed:completed ;

        await User.updateOne({_id : req.session.userId},{$set : {todos : user.todos}})
        res.json({message : "Updated", todo : todo})

    } catch (error) {
        console.log("[error]", error);
        res.status(500).json({err : "Try again"})
    }   })
module.exports = router;