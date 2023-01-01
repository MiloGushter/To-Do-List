export function toggleProjects() {
	const expandProjects = document.querySelector(".side-projects-paragraph");
	const expandIcon = document.querySelector(".expand-projects");
	const projectItems = document.querySelector(".side-projects-list");

	expandProjects.addEventListener("click", () => {
		projectItems.style.display = "block";
		setTimeout(() => {
			projectItems.classList.toggle("visible");
			expandIcon.classList.toggle("expanded");
			if (
				!projectItems.classList.contains("visible") &&
				!expandIcon.classList.contains("expanded")
			) {
				setTimeout(() => {
					projectItems.style.display = "none";
				}, 300);
			}
		}, 0.1);
	});
}
