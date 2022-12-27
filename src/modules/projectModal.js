import { createProject } from "./projectCreation";
import { populateProjects } from "./taskModal";
export let projects = [];
export function showProjectModal() {
	const modal = document.querySelector("#modal-project");
	const saveButton = document.querySelector("#save-button-project");
	const cancelButton = document.querySelector("#cancel-button-project");
	const projectName = document.querySelector("#input-project-name");
	const createProjectButton = document.querySelector(".add-projects");

	function resetStyles() {
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

	cancelButton.onclick = () => resetStyles();

	window.onclick = function (event) {
		if (event.target == modal) {
			resetStyles();
		}
	};

	saveButton.onclick = () => {
		console.log(`Name of the project is ${projectName.value}`);
		projects.push(new createProject(projectName.value, {}));
		console.log(projects);

		const projectsList = document.querySelector(".side-projects-list");
		const projectsListItem = document.createElement("li");
		projectsListItem.classList.add("side-projects-list-item");
		projectsListItem.textContent = projectName.value;
		projectsList.append(projectsListItem);

		populateProjects();
		resetStyles();
	};
}
