import { loginForm, urlApi, registerForm, resetBtn, saveBtn, titleField, completedField, id } from "./config.js";
import { checkAuth } from "./router.js";
import { addTodo, formToJson, resetInputField } from "./utils.js";

loginForm.addEventListener('submit',async (event)=>{
    event.preventDefault();
    try{
    let response =await fetch(urlApi+"users/login",{
        method:"POST",
        body:JSON.stringify(formToJson('loginForm')),
        headers:{
            "Content-Type":"application/json"
        }
    })
    let res=  await response.json()
    if(response.ok)
        {         
          loginForm.elements[0].value = ""
          loginForm.elements[1].value = "" 
          alert(res.message)
          return checkAuth()
        }else{
            alert(res.message)
        }
    }
    catch(e)
    {
        console.log(e)
        alert("error")
    }
})


registerForm.addEventListener('submit',async (event)=>{
    event.preventDefault();
    let datas = formToJson('registerForm');
    let {password ,password2} = datas;
    if(password != password2){
        return alert("not matched")
    }
    try{
    let data = {
        email:datas.email,
        password:datas.password
    }
    let response =await fetch(urlApi+"users/register",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(response.ok)
        {
            window.location.hash = "login"
            loginForm.elements[0].value = data.email
            return;
        }
    let res=  await response.json()
    alert(res.message)
    }
    catch(e)
    {
        console.log(e)
        alert("error")
    }
})

 
logout.addEventListener("click", async (e) => {
    e.preventDefault();
     let response =await fetch(urlApi+"users/logout")
    if(response.ok){
        window.location.hash = "login";
        return checkAuth();
    }
})

resetBtn.addEventListener("click", async (e) => {
    resetInputField();
})


saveBtn.addEventListener("click", async (e) => {
    let todo = {
        title : titleField.value,
        completed : completedField.value
    }
    if(todo.completed == undefined || todo.title == "") return;
    e.preventDefault()
    if(saveBtn.innerText == "save"){
        try{
            let response =await fetch("http://localhost:3000/todos",{
                method:"POST",
                body:JSON.stringify(todo),
                headers:{
                    "Content-Type":"application/json"
                }
        })
            let res =  await response.json()
            addTodo(res);
        }
        catch(e)
        {
            console.log(e)
            alert("error")
        }
    }else{
        let idTodo = id.value
        fetch("http://localhost:3000/todos/" + idTodo,{
            method:"Put",
            body: JSON.stringify(todo),
            headers:{
                "Content-Type":"application/json"
            }
        })
            .then(response=>{
                if(response.ok)
                {
                    addTodo(todo);
                }
                else
                    throw "error"
        })  
        .catch(err=>alert("error on Updating"))
        saveBtn.innerText = "save"
    }

})
