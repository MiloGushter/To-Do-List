export function openHamburgerMenu() {
	const hamburger = document.querySelector(".hamburger--emphatic");
	hamburger.addEventListener("click", () => {
		if (hamburger.classList.contains("is-active")) {
			hamburger.classList.remove("is-active");
			return;
		}
		hamburger.classList.add("is-active");
	});
}
