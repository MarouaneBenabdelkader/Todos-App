import { completedField, id, saveBtn, titleField } from "./config.js"

export const formToJson=(idForm)=>{
    let form=document.getElementById(idForm)
    let formData=new FormData(form)
    let datas={}
    formData.forEach((element,ok)=>datas[ok]=element)
    return datas;
}

export const resetInputField = function(){
    titleField.value = "";
    completedField.value = "";
}

export const addTodo = function(todo) {
    const tr = document.createElement("tr")
    const td1 = document.createElement("td")
    const td2 = document.createElement("td")
    const td3 = document.createElement("td")
    const btnDelete = document.createElement("button")
    const btnUpdate = document.createElement("button")
    btnUpdate.innerHTML = "Update"
    btnDelete.innerHTML = "Delete"
    td3.classList.add("btnOptions")
    btnDelete.classList.add("btnsOptions")
    btnUpdate.classList.add("btnsOptions")
    td3.appendChild(btnDelete)
    td3.appendChild(btnUpdate)
    td1.innerText = todo.title;
    td2.innerText = todo.completed;
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tbody.appendChild(tr)
    btnDelete.addEventListener('click',()=>{
        fetch("http://localhost:3000/todos/" + todo._id,{
            method:"DELETE"})
            .then(response=>{
                if(response.ok)
                {
                    tr.remove();
                }
                else
                    throw "error"
        })  
        .catch(err=>alert("error on deleting"))
    })
    btnUpdate.addEventListener('click',()=>{
            titleField.value = todo.title;
            completedField.value = todo.completed;
            id.value = todo._id
            saveBtn.innerText = "Update"
            tr.remove();
            
    })
    resetInputField();
}


