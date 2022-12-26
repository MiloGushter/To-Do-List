import { projectCreation } from "./projectCreation";
export function showProjectModal() {
	const modal = document.querySelector("#modal-project");
	const saveButton = document.querySelector("#save-button-project");
	const cancelButton = document.querySelector("#cancel-button-project");
	const projectName = document.querySelector("#input-project-name");
	const createProject = document.querySelector(".add-projects");
	let projects = [];

	function addStyles() {
		projectName.value = "";
		modal.classList.add("modal-going-out");
		setTimeout(() => {
			modal.classList.remove("modal-going-out");
			modal.style.display = "none";
		}, 300);
	}

	saveButton.onclick = () => {
		console.log(`Name of the project is ${projectName.value}`);
		projects.push(new projectCreation(projectName.value, {}));
		console.log(projects);

		const projectsList = document.querySelector(".side-projects-list");
		const projectsListItem = document.createElement("li");
		projectsListItem.classList.add("side-projects-list-item");
		projectsListItem.textContent = projectName.value;
		projectsList.append(projectsListItem);

		addStyles();
	};

	createProject.onclick = () => {
		modal.style.display = "block";
	};

	cancelButton.onclick = () => addStyles();

	window.onclick = function (event) {
		if (event.target == modal) {
			addStyles();
		}
	};
}
