export function showProjectModal() {
	const modal = document.querySelector(".modal");
	const saveButton = document.querySelector(".save-button");
	const cancelButton = document.querySelector(".cancel-button");
	const createProject = document.querySelector(".add-projects");

	saveButton.onclick = () => {
		const projectName = document.querySelector("#inputField");
		console.log(`Name of the project is ${projectName.value}`);

		modal.classList.add("modal-going-out");
		setTimeout(() => {
			modal.classList.remove("modal-going-out");
			modal.style.display = "none";
		}, 300);
	};

	createProject.onclick = () => {
		modal.style.display = "block";
	};

	cancelButton.onclick = () => {
		modal.classList.add("modal-going-out");
		setTimeout(() => {
			modal.classList.remove("modal-going-out");
			modal.style.display = "none";
		}, 300);
	};

	window.onclick = function (event) {
		if (event.target == modal) {
			modal.classList.add("modal-going-out");
			setTimeout(() => {
				modal.classList.remove("modal-going-out");
				modal.style.display = "none";
			}, 300);
		}
	};
}
