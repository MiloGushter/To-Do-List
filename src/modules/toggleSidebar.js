export function openSidebar() {
	const toggleButton = document.querySelector(".hamburger");
	const sidebar = document.querySelector("aside");
	const main = document.querySelector("main");
	toggleButton.addEventListener("click", () => {
		sidebar.classList.toggle("closed");
	});
}
