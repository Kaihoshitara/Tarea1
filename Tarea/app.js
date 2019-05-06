//AÑADIR ELEMENTO
//selecionar todos los ul del documento html
let list = document.querySelector("ul");

const form = document.querySelector("form");
const taskInput = document.getElementById("task");

//función para rellenar la lista desde el local storage
function refillList() {
 list = document.querySelector("ul");
 //call back por cada elemento de tasklist
 taskList.forEach(element => {
  //crea un li
  li = document.createElement("li");
  //asigna sus atributos a cada uno de los elementos de la lista
  li.setAttribute("class", "collection-item");
  li.innerHTML = `${element} 
  <a href="#" class="delete-item secondary-content">
  <i class="fa fa-times" />
  </a>`;
  //al crearlo lo agrega a la lista
  list.appendChild(li);  
 });
 deleteRefill();
}

//Función para borrar un elemento especifico de una lista
function deleteRefill() {
 //selecciona todos los iconos X del ul
 let deleteli = document.querySelectorAll(".fa-times");
//recorre las x para identificarlas
   deleteli.forEach(function (dele,index){
    //identifica cuando se les de un click a una x en especifico
    dele.onclick=function (e) {
     //remueve el elemento al que se le da click
     e.target.parentElement.parentElement.remove();
     //remueve el mismo elemento del arreglo del localstorage
     taskList.splice(index,1);
     //y reasigna la lista nueva al local storage
     localStorage.setItem("taskList", JSON.stringify(taskList));
     //borra todos los elementos de la lista
     let lis = document.querySelectorAll("li");
      lis.forEach(function (li) {
       li.remove();
      });
     //rellena la lista desde el local storage
      refillList();
    };
   });
}
//al momento de cargar la pagina revisa si hay elementos guardados en el
//local storage
if (localStorage.taskList) {
 taskList = JSON.parse(localStorage.taskList);
 refillList();
} else {
  //si no hay pone el array de elementos vacío
 taskList = [];
}


//El botón del formulario está escuchando
form.addEventListener("submit", runEvent);
//el botón al recibir un click llama esta función
function runEvent(e) {
  newTask = document.createElement("li");
  newTask.setAttribute("class", "collection-item");
  newTask.innerHTML = `${taskInput.value} 
  <a href="#" class="delete-item secondary-content">
  <i class="fa fa-times" />
  </a>`;
  list.appendChild(newTask);
  deleteRefill();
   taskList.push(taskInput.value);
   localStorage.setItem("taskList", JSON.stringify(taskList));
  e.preventDefault();
}


//Clear tasks

const clearButton = document.querySelector(".clear-tasks");
const div = document.querySelector("div.card-action");

clearButton.addEventListener("click", eventHandler);

function eventHandler(e) {
  e.preventDefault();
  let lis = document.querySelectorAll("li");
  lis.forEach(function (li) {
   li.remove();
   localStorage.taskList = [];
  });
  deleteRefill();
};

//Delete element
deleteRefill();