import { createNewProject } from "./populateMainContent";

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
