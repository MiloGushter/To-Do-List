import { createNewProject, createNewTask, updateTask } from "./populateMainContent";

export function showProjectModal() {
	const modal = document.querySelector("#modal-project");
	const saveButton = document.querySelector("#save-button-project");
	const cancelButton = document.querySelector("#cancel-button-project");
	const projectName = document.querySelector("#input-project-name");
	const createProjectButton = document.querySelector(".add-projects");

	function resetForm() {
		projectName.value = "";
		modal.classList.add("modal-going-out");
		setTimeout(() => {
			modal.classList.remove("modal-going-out");
			modal.style.display = "none";
		}, 300);
	}

	createProjectButton.onclick = () => {
		modal.style.display = "flex";
	};

	cancelButton.onclick = () => resetForm();

	window.onclick = function (event) {
		if (event.target == modal) {
			resetForm();
		}
	};

	saveButton.onclick = () => {
		createNewProject(projectName);
		resetForm();
	};
}

export function showTaskModal() {
	const modal = document.querySelector("#modal-task");
	const cancelButton = document.querySelector("#cancel-button-task");
	const createTaskButton = document.querySelector("#nav-create-task");
	const saveButton = document.querySelector("#save-button-task");
	const inputTaskName = document.querySelector("#task-input-name");
	const inputTaskDescription = document.querySelector("#task-input-description");
	const inputTaskDate = document.querySelector("#task-input-date");
	const selectProject = document.querySelector("#task-select-project");
	const selectPriority = document.querySelector("#task-select-priority");

	const resetForm = () => {
		inputTaskDescription.value = "";
		inputTaskName.value = "";
		modal.classList.add("modal-going-out");
		setTimeout(() => {
			modal.classList.remove("modal-going-out");
			modal.style.display = "none";
		}, 300);
	};

	// Making inputTaskDescription expand as you type
	inputTaskDescription.addEventListener("input", () => {
		inputTaskDescription.style.height = "auto";
		inputTaskDescription.style.height = `${inputTaskDescription.scrollHeight}px`;
	});

	createTaskButton.onclick = () => {
		modal.style.display = "flex";
	};

	cancelButton.onclick = () => resetForm();

	window.onclick = function (event) {
		if (event.target == modal) {
			resetForm();
		}
	};

	saveButton.onclick = () => {
		createNewTask(
			inputTaskName,
			inputTaskDescription,
			inputTaskDate,
			selectProject,
			selectPriority
		);
		resetForm();
	};
}

let currentTask;

export function showTaskEditModal(editButton) {
	const modal = document.querySelector("#modal-edit-task");
	const cancelButton = document.querySelector("#cancel-edit-button-task");
	const updateButton = document.querySelector("#update-button-task");
	const inputTaskName = document.querySelector("#edit-task-input-name");
	const inputTaskDescription = document.querySelector("#edit-task-input-description");
	const inputTaskDate = document.querySelector("#edit-task-input-date");
	const selectProject = document.querySelector("#edit-task-select-project");
	const selectPriority = document.querySelector("#edit-task-select-priority");

	editButton.addEventListener("click", () => {
		modal.style.display = "flex";
		currentTask = editButton.previousSibling.textContent;
	});

	const resetForm = () => {
		inputTaskDescription.value = "";
		inputTaskName.value = "";
		modal.classList.add("modal-going-out");
		setTimeout(() => {
			modal.classList.remove("modal-going-out");
			modal.style.display = "none";
		}, 300);
	};

	// Making inputTaskDescription expand as you type
	inputTaskDescription.addEventListener("input", () => {
		inputTaskDescription.style.height = "auto";
		inputTaskDescription.style.height = `${inputTaskDescription.scrollHeight}px`;
	});

	cancelButton.onclick = () => resetForm();

	window.onclick = function (event) {
		if (event.target == modal) {
			resetForm();
		}
	};

	updateButton.onclick = () => {
		updateTask(
			currentTask,
			inputTaskName,
			inputTaskDescription,
			inputTaskDate,
			selectProject,
			selectPriority
		);
		resetForm();
	};
}
