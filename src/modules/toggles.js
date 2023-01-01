export default function toggles() {
	(function toggleProjects() {
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
	})();
	(function toggleSidebar() {
		const toggleButton = document.querySelector(".hamburger");
		const sidebar = document.querySelector("aside");
		toggleButton.addEventListener("click", () => {
			sidebar.classList.toggle("closed");
		});
	})();

	(function openHamburgerMenu() {
		const hamburger = document.querySelector(".hamburger--emphatic");
		hamburger.addEventListener("click", () => {
			if (hamburger.classList.contains("is-active")) {
				hamburger.classList.remove("is-active");
				return;
			}
			hamburger.classList.add("is-active");
		});
	})();
}
