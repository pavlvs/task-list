const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
	// document loaded event
	document.addEventListener('DOMContentLoaded', getTasks);
	// add task event
	form.addEventListener('submit', addTask);
	// remove task event
	taskList.addEventListener('click', removeTask);
	// Clear tasks event
	clearBtn.addEventListener('click', clearTasks);
	// Task filter event
	filter.addEventListener('keyup', filterTasks);
}
// get tasks
function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function(task) {
		// Create li element
		const li = document.createElement('li');
		// Add class
		li.className = 'collection-item';
		// create text node append to li
		li.appendChild(document.createTextNode(task));
		// create new link eement
		const link = document.createElement('a');
		// add class
		link.className = 'delete-item secondary-content';
		// add icon HTML
		link.innerHTML = '<i class="fa fa-remove"></i>';
		// Append the link to li
		li.appendChild(link);

		// append li to ul
		taskList.appendChild(li);
	});
}
// Add Task
function addTask(e) {
	if (taskInput.value === '') {
		alert('Add a task');
	}

	// Create li element
	const li = document.createElement('li');
	// Add class
	li.className = 'collection-item';
	// create text node append to li
	li.appendChild(document.createTextNode(taskInput.value));
	// create new link eement
	const link = document.createElement('a');
	// add class
	link.className = 'delete-item secondary-content';
	// add icon HTML
	link.innerHTML = '<i class="fa fa-remove"></i>';
	// Append the link to li
	li.appendChild(link);

	// append li to ul
	taskList.appendChild(li);

	// store in LS
	storeTaskInLocalStorage(taskInput.value);

	//Clear the task input
	taskInput.value = '';

	e.preventDefault();
}
// Store task in LS
function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}
// remove task
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are you sure?')) {
			e.target.parentElement.parentElement.remove();

			// remove task from LS
			removeTaskFromLS(e.target.parentElement.parentElement);
		}
	}
}
// clear tasks
function clearTasks() {
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}
	// clear tasks from LS
	clearTasksFromLS();
}
// filter tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();
	document.querySelectorAll('.collection-item').forEach(function(task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}

function removeTaskFromLS(taskItem) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasksFromLS() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		localStorage.removeItem('tasks');
	}
}
