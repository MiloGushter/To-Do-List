export function changeIcons() {
	const icons = document.querySelectorAll(".material-icons-outlined");
	icons.forEach((icon) => {
		icon.addEventListener("mouseover", () => {
			icon.classList.remove("material-icons-outlined");
			icon.classList.add("material-icons");
		});
		icon.addEventListener("mouseout", () => {
			icon.classList.add("material-icons-outlined");
			icon.classList.remove("material-icons");
		});
	});
}
