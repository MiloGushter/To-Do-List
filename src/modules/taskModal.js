import { createTask } from "./createTask";
import { populateContent } from "./populateMainContent";
let projects = JSON.parse(localStorage.getItem("myProjects"));

const resetStyles = () => {
	inputTaskDescription.value = "";
	inputTaskName.value = "";
	modal.classList.add("modal-going-out");
	setTimeout(() => {
		modal.classList.remove("modal-going-out");
		modal.style.display = "none";
	}, 300);
};

export function showTaskModal() {
	const modal = document.querySelector("#modal-task");
	const cancelButton = document.querySelector("#cancel-button-task");
	const createTaskButton = document.querySelector("#nav-create-task");
	const saveButton = document.querySelector("#save-button-task");
	const inputTaskDescription = document.querySelector("#task-input-description");

	// Making inputTaskDescription expand as you type
	inputTaskDescription.addEventListener("input", () => {
		inputTaskDescription.style.height = "auto";
		inputTaskDescription.style.height = `${inputTaskDescription.scrollHeight}px`;
	});

	createTaskButton.onclick = () => {
		modal.style.display = "block";
	};

	cancelButton.onclick = () => resetStyles();

	window.onclick = function (event) {
		if (event.target == modal) {
			resetStyles();
		}
	};

	saveButton.onclick = () => {
		createNewTask();
		resetStyles();
	};
}

export const populateProjectsForTask = () => {
	const selectProject = document.querySelector("#task-select-project");
	for (let project of projects) {
		if (project.name === "Uncategorized") continue;
		const selectOption = document.createElement("option");
		selectOption.textContent = project.name;
		selectOption.value = project.name;
		selectProject.append(selectOption);
	}
};

const createNewTask = () => {
	const inputTaskName = document.querySelector("#task-input-name");
	const inputTaskDescription = document.querySelector("#task-input-description");
	const inputTaskDate = document.querySelector("#task-input-date");
	const selectProject = document.querySelector("#task-select-project");
	const selectPriority = document.querySelector("#task-select-priority");

	const taskName = inputTaskName.value;
	const taskDescription = inputTaskDescription.value;
	const taskDate = inputTaskDate.value;
	const selectedProjectForTask = selectProject.value;
	const taskPriority = selectPriority.value;

	const project = projects.find((item) => item.name == selectedProjectForTask);
	const newTask = new createTask(
		taskName,
		taskDescription,
		taskDate,
		selectedProjectForTask,
		taskPriority
	);
	project.tasks.push(newTask);
	localStorage.setItem("myProjects", JSON.stringify(projects));
	console.log(projects);
};
