import { createProject } from "./projectCreation";
import { populateProjectsForTask } from "./taskModal";
import { populateContent } from "./populateMainContent";

let projects = JSON.parse(localStorage.getItem("myProjects"));

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
		modal.style.display = "block";
	};

	cancelButton.onclick = () => resetForm();

	window.onclick = function (event) {
		if (event.target == modal) {
			resetForm();
		}
	};

	saveButton.onclick = () => {
		console.log(`Name of the project is ${projectName.value}`);
		projects.push(new createProject(projectName.value, []));
		localStorage.setItem("myProjects", JSON.stringify(projects));

		const projectsList = document.querySelector(".side-projects-list");
		const projectsListItem = document.createElement("li");
		projectsListItem.classList.add("side-projects-list-item");
		projectsListItem.textContent = projectName.value;
		projectsList.append(projectsListItem);

		populateProjectsForTask();
		resetForm();
	};
}

export function populateProjectsList() {
	const projectsList = document.querySelector(".side-projects-list");
	for (let project of projects) {
		const projectsListItem = document.createElement("li");
		projectsListItem.classList.add("side-projects-list-item");
		projectsListItem.textContent = project.name;
		projectsListItem.addEventListener("click", populateContent());
		projectsList.appendChild(projectsListItem);
	}
}
