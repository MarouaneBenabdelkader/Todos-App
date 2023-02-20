import { urlApi, authApp, todoApp, registerComponent, loginComponent, emailCatch, tbody } from "./config.js";
import { addTodo } from "./utils.js";
let isConnected;

export let checkAuth = async ()=>{
    let data= await (await fetch(urlApi+"users/isConnected")).json()
    isConnected = data.auth;
    let emailCatchup = data.email;
    if(isConnected) 
    {
        todoApp.classList.remove("hidden")
        authApp.classList.add("hidden")
        fetch("http://localhost:3000/todos").then(response=>response.json())
            .then(data=>{
                data.forEach(element => {
                    addTodo(element)
                });
            })
            .catch(err=>alert("error on loading" + err))
            emailCatch.innerText = emailCatchup;

    }
    else{
        tbody.innerText = ""
        authApp.classList.remove("hidden")
        todoApp.classList.add("hidden")
    }
}
checkAuth();

window.addEventListener('popstate', function (event) {
    checkUrl();
});
const checkUrl=()=>{
    if(isConnected) return   

    if(window.location.hash=="#register")
    {
        registerComponent.classList.remove("hidden")
        loginComponent.classList.add("hidden")
    }
    else{
        registerComponent.classList.add("hidden")
        loginComponent.classList.remove("hidden")
    }
}
checkUrl();

