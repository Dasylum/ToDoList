import {todosFunction} from './todo';
import todoList from './todolist';

const form = document.querySelector('.project-div');
const todoForm = document.querySelector('.js-form');
let proj = document.querySelector('.projects-display');
let todo = document.querySelector('.todos');

let projectsList = [];

var projects = function(name) {
	var name = name;
	var list = [];

	return {name, list};
}

var projects_display = (function() {

	var update = function(e) {

		while(todo.firstChild) {
			todo.removeChild(todo.firstChild);
		}

		var names = e.target.innerText;

		if(document.querySelector('.active')){
			var activeProject = document.querySelector('.active');
		activeProject.classList.remove('active'); }


		for(var i = 0; i < projectsList.length; i++){
			if(names == projectsList[i].name){



				e.target.classList.add('active');
				render(projectsList[i].list);

			}
			else {

			}			
		};
		
	};

		var display = function() {
		while(proj.firstChild) {
			proj.removeChild(proj.firstChild);
		}

		projectsList.forEach(function(projects) {
			var div = document.createElement('div');
			div.innerHTML += `<li> ${projects.name}`;
			div.dataset.name = projects.name;
			proj.appendChild(div);
			div.addEventListener("click", update);
			
		})
		
	}

	return {display};

})();

form.addEventListener('submit', event => {
	event.preventDefault();
	const input = document.querySelector('.js-project-input');
	projectsList.push(projects(input.value.trim()));
	input.value = '';
	projects_display.display(projects);
})

todoForm.addEventListener('submit', event => {
	event.preventDefault();
	const input = document.querySelector('.js-todo-input');
	const activeProject = document.querySelector('.active');
	for(var i = 0; i < projectsList.length; i++) {
		if(activeProject.innerText == projectsList[i].name){
			var newList = projectsList[i].list;
			newList.push(todoList(input.value.trim()));
			newList.forEach(function(title) {
				console.log(title);
			})
		}
	}
	input.value = '';
	input.focus();
	render(newList);

});

var toggleDone = function(key) {
	
	for(var i = 0; i<projectsList.length; i++) {
		for(var j = 0; j<projectsList[i].list.length; j++) {
			if(projectsList[i].list[j].id == Number(key)) {
				projectsList[i].list[j].check = !projectsList[i].list[j].check;
				var currentTodo = projectsList[i].list[j];
			}
		}
	}
	const item = document.querySelector(`[data-key='${key}']`);

	if (currentTodo.check) {
   	 	item.classList.add('done');
  	} 
  	else {
    	item.classList.remove('done');
    }
}

const list = document.querySelector('.todos');
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
});


const render = function(newList) {

	const li = document.createElement('div');

	while(todo.firstChild) {
		todo.removeChild(todo.firstChild);
	}

	for(var i = 0; i < newList.length; i++) {

		if(newList[i].check == true) {
			li.innerHTML += `<p data-key="${newList[i].id}" class="done">${newList[i].title} <input type="checkbox" id="${i}" class="js-tick">`
		}

		else {
			li.innerHTML += `<p data-key="${newList[i].id}">${newList[i].title} <input type="checkbox" id="${i}" class="js-tick">`
		}
		todo.appendChild(li);
	} 

}

projects_display.display();
