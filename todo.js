const todoForm = document.querySelector(".js-toDoForm"),
	toDoinput = todoForm.querySelector("input"),
	toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos'; 

let toDos = [];

function deleteToDo(event){
	const btn = event.target;
	const li = btn.parentNode;
	toDoList.removeChild(li);

	const cleanToDos = toDos.filter(function(toDo){
		return toDo.id !== parseInt(li.id);
	});

	toDos = cleanToDos;
	saveToDos();
}

function saveToDos(){
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
	const li = document.createElement("li");
	const delBtn = document.createElement("button");
	const span = document.createElement("span");
	const newId = toDos.length + 1;

	delBtn.innerText = "xx";
	delBtn.addEventListener("click", deleteToDo);
	span.innerText = text;
	li.appendChild(delBtn);	
	li.appendChild(span);
	li.id = newId;
	toDoList.appendChild(li);

	const toDoObj = {
		text: text,
		id: newId
	};

	toDos.push(toDoObj);
	saveToDos();
}

function handleSubmit(event){
	event.preventDefault();
	const currentValue = toDoinput.value;
	paintToDo(currentValue);
	toDoinput.value = "";
}

function loadToDos(){
	const loadedToDos = localStorage.getItem(TODOS_LS);

	if(loadedToDos !== null){
		const parsedToDos = JSON.parse(loadedToDos);
		parsedToDos.forEach(function(toDo){
			paintToDo(toDo.text);
		});
	}
}

function init(){
	loadToDos();
	todoForm.addEventListener("submit", handleSubmit);
}

init();