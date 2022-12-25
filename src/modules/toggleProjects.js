export function toggleProjects() {
	const expandProjects = document.querySelector(".side-projects-paragraph");
	const expandIcon = document.querySelector(".expand-projects");
	const projectItems = document.querySelector(".side-projects-list");

	expandProjects.addEventListener("click", () => {
		projectItems.classList.toggle("visible");
		expandIcon.classList.toggle("expanded");
	});
}
