export function openSidebar() {
	const toggleButton = document.querySelector(".hamburger");
	const sidebar = document.querySelector("aside");
	toggleButton.addEventListener("click", () => {
		sidebar.classList.toggle("open");
	});
}
