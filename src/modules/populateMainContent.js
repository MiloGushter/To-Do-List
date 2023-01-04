import { createProject, createTask } from "./constructorFunctions";
import { showTaskEditModal } from "./showModals";

let projects = (() => {
	if (localStorage.getItem("myProjects") === null) {
		let sample = [
			{
				name: "Uncategorized",
				tasks: [
					{
						name: "Sample task",
						description:
							"This is some long text for the description of this task",
						date: "2023-01-05",
						fromProject: "Uncategorized",
						priority: "low",
					},
				],
			},
		];
		localStorage.setItem("myProjects", JSON.stringify(sample));
	}
	return JSON.parse(localStorage.getItem("myProjects"));
})();

let currentProject = projects[0];

export function onLoadPopulate() {
	createNewCard(projects[0].tasks);
}

export function populateProjectsListOnLoad() {
	const uncategorizedTasks = document.querySelector(".side-uncategorized");
	uncategorizedTasks.onclick = () => {
		currentProject = projects[0];
		createNewCard(projects[0].tasks);
	};

	const projectsList = document.querySelector(".side-projects-list");
	for (let project of projects) {
		if (project.name === "Uncategorized") continue;

		const projectsListItem = document.createElement("li");
		projectsListItem.classList.add("side-projects-list-item");

		const projectListItemText = document.createElement("p");
		projectListItemText.textContent = project.name;
		projectListItemText.classList.add("side-project-list-item-name");
		projectListItemText.addEventListener("click", () => {
			const items = document.querySelectorAll(".side-project-list-item-name");
			items.forEach((item) => {
				item.classList.remove("selected-project");
			});
			projectListItemText.classList.add("selected-project");

			currentProject = project;
			createNewCard(project.tasks);
		});

		const removeIcon = document.createElement("span");
		removeIcon.classList.add("material-icons-outlined");
		removeIcon.textContent = "clear";
		removeIcon.addEventListener("click", () => {
			deleteProject(projectsListItem, project.name);
			projectsListItem.remove();
			onLoadPopulate();
		});

		projectsListItem.appendChild(projectListItemText);
		projectsListItem.appendChild(removeIcon);
		projectsList.appendChild(projectsListItem);
	}
}

export const populateProjectsForTaskOnLoad = () => {
	const selectProject = document.querySelector("#task-select-project");
	const updateProject = document.querySelector("#edit-task-select-project");
	for (let project of projects) {
		if (project.name === "Uncategorized") continue;
		const selectOption = document.createElement("option");
		selectOption.textContent = project.name;
		selectOption.value = project.name;
		selectProject.append(selectOption);
		updateProject.append(selectOption.cloneNode(true));
	}
};

export function createNewProject(inputProjectName) {
	const newProject = new createProject(inputProjectName.value, []);
	projects.push(newProject);
	localStorage.setItem("myProjects", JSON.stringify(projects));

	const projectsList = document.querySelector(".side-projects-list");

	const projectsListItem = document.createElement("li");
	projectsListItem.classList.add("side-projects-list-item");

	const projectListItemText = document.createElement("p");
	projectListItemText.textContent = inputProjectName.value;
	projectListItemText.classList.add("side-project-list-item-name");
	projectListItemText.addEventListener("click", () => {
		const items = document.querySelectorAll(".side-project-list-item-name");
		console.log(items);
		items.forEach((item) => {
			item.classList.remove("selected-project");
		});
		projectListItemText.classList.add("selected-project");
		currentProject = projects[projects.length - 1];
		createNewCard(projects[projects.length - 1].tasks);
	});

	const removeIcon = document.createElement("span");
	removeIcon.classList.add("material-icons-outlined");
	removeIcon.textContent = "clear";
	removeIcon.addEventListener("click", () => {
		deleteProject(inputProjectName.value);
		projectsListItem.remove();
		onLoadPopulate();
	});

	projectsListItem.appendChild(projectListItemText);
	projectsListItem.appendChild(removeIcon);
	projectsList.appendChild(projectsListItem);
	projectsList.append(projectsListItem);

	const selectProject = document.querySelector("#task-select-project");
	const selectValue = document.createElement("option");
	selectValue.textContent = projects[projects.length - 1].name;
	selectValue.value = projects[projects.length - 1].name;
	selectProject.appendChild(selectValue);
}

export function createNewTask(
	inputTaskName,
	inputTaskDescription,
	inputTaskDate,
	selectProject,
	selectPriority
) {
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

	createNewCard(project.tasks);
}

export function updateTask(
	taskForEdit,
	inputTaskName,
	inputTaskDescription,
	inputTaskDate,
	selectProject,
	selectPriority
) {
	const taskName = inputTaskName.value;
	const taskDescription = inputTaskDescription.value;
	const taskDate = inputTaskDate.value;
	const selectedProjectForTask = selectProject.value;
	const taskPriority = selectPriority.value;
	const updateProject = projects.find((item) => item.name === selectedProjectForTask);

	const projectForEditIndex = projects.findIndex(
		(item) => item.name === currentProject.name
	);
	// ? If selected project from drop menu in update modal is the same as project where the task is
	// ? then you only need to update the value else you need to delete task from project that is
	// ? currently selected and add new project to project from drop down menu

	const projectTasksForEdit = currentProject.tasks;
	console.log({ projectForEditIndex });
	const taskForEditIndex = projectTasksForEdit.findIndex(
		(item) => item.name === taskForEdit
	);
	if (projects[projectForEditIndex].name === selectedProjectForTask) {
		projects[projectForEditIndex].tasks[taskForEditIndex].name = taskName;
		projects[projectForEditIndex].tasks[taskForEditIndex].description =
			taskDescription;
		projects[projectForEditIndex].tasks[taskForEditIndex].date = taskDate;
		projects[projectForEditIndex].tasks[taskForEditIndex].priority = taskPriority;
		localStorage.setItem("myProjects", JSON.stringify(projects));
		createNewCard(projects[projectForEditIndex].tasks);
	} else {
		projects[projectForEditIndex].tasks.splice(taskForEditIndex, 1);
		const newProjectIndex = projects.findIndex(
			(item) => item.name === selectedProjectForTask
		);
		projects[newProjectIndex].tasks.push(
			new createTask(
				taskName,
				taskDescription,
				taskDate,
				selectedProjectForTask,
				taskPriority
			)
		);
		localStorage.setItem("myProjects", JSON.stringify(projects));
		createNewCard(projects[projectForEditIndex].tasks);
	}
}

function createNewCard(tasks) {
	const mainContainer = document.querySelector(".main-container-cards ");
	while (mainContainer.firstChild) mainContainer.removeChild(mainContainer.firstChild);
	for (let task of tasks) {
		const card = document.createElement("div");
		card.classList.add("task-card");

		const cardTitle = document.createElement("p");
		cardTitle.classList.add("task-card-title");
		cardTitle.textContent = task.name;
		const editIcon = document.createElement("i");
		editIcon.classList.add("fa-sharp", "fa-solid", "fa-pen", "fa-sm");
		cardTitle.append(editIcon);
		showTaskEditModal(editIcon);

		const cardDescription = document.createElement("p");
		cardDescription.classList.add("task-card-description");
		cardDescription.textContent = task.description;

		const cardInfo = document.createElement("div");
		cardInfo.classList.add("task-card-info");

		const cardDate = document.createElement("p");
		cardDate.classList.add("task-card-date");
		const cardDateText = document.createTextNode(task.date);
		const dateIcon = document.createElement("i");
		dateIcon.classList.add("fa-regular", "fa-calendar");
		cardDate.append(dateIcon);
		cardDate.append(cardDateText);

		const cardPriority = document.createElement("p");
		cardPriority.classList.add("task-card-priority");
		const cardPriorityText = document.createTextNode(task.priority);
		const priorityIcon = document.createElement("i");
		priorityIcon.classList.add("fa-regular", "fa-flag");
		cardPriority.append(priorityIcon);
		cardPriority.append(cardPriorityText);

		const cardButton = document.createElement("button");
		cardButton.classList.add("button", "task-card-button");
		cardButton.textContent = "FINISHED";

		cardButton.addEventListener("click", () => {
			card.remove();
			deleteTask(task.name);
		});

		cardInfo.appendChild(cardDate);
		cardInfo.appendChild(cardPriority);

		card.appendChild(cardTitle);
		card.appendChild(cardDescription);
		card.appendChild(cardInfo);
		card.appendChild(cardButton);

		mainContainer.appendChild(card);
	}
}

function deleteTask(deletionTask) {
	const indexOfCurrentProject = projects.findIndex(
		(item) => item.name === currentProject.name
	);
	const projectTasks = currentProject.tasks;

	for (let task in projectTasks) {
		if (projectTasks[task].name === deletionTask) {
			// From localStorage of projects we get project and it's tasks
			// if task matches the name of task for deletion we delete that task
			projects[indexOfCurrentProject].tasks.splice(task, 1);
			localStorage.setItem("myProjects", JSON.stringify(projects));
		}
	}
}

function deleteProject(projectName) {
	const project = projects.findIndex((item) => item.name === projectName);
	projects.splice(project, 1);
	localStorage.setItem("myProjects", JSON.stringify(projects));
}
