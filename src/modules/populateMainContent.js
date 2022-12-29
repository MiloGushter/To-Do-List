let projects = JSON.parse(localStorage.getItem("myProjects"));

export function populateContent() {
	/* 
		TODO: Figure out better way to make global variable
		! There is an error if I put it in global scope after import
	*/
	window.currentProject = projects[0];
	createNewCard(projects[0].tasks);
	const uncategorizedTasks = document.querySelector(".side-uncategorized");
	uncategorizedTasks.onclick = () => createNewCard(projects[0].tasks);
	const itemsOfProjects = document.querySelectorAll(".side-projects-list-item");
	for (let item of itemsOfProjects)
		item.addEventListener("click", () => {
			const nameOfProject = item.textContent;
			const project = projects.find((item) => item.name == nameOfProject);
			item.addEventListener("click", () => {
				window.currentProject = project;
				createNewCard(project.tasks);
			});
		});
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
	console.log(`before:`);
	console.log(currentProject);

	const projectTasks = currentProject.tasks;
	for (let task in projectTasks) {
		if (projectTasks[task].name === deletionTask) projectTasks.splice(task, 1);
	}
	console.log(`after:`);
	console.log(currentProject);
}
