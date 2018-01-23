const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
	// add task event
	form.addEventListener('submit', addTask);
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

	//Clear the task input
	taskInput.value = '';






	e.preventDefault();
}