import "./sass/main.scss";
import toggles from "./modules/toggles";
import { changeIcons } from "./modules/changeIconFill";
import { showTaskModal, showProjectModal } from "./modules/showModals";
import {
	onLoadPopulate,
	populateProjectsForTaskOnLoad,
	populateProjectsListOnLoad,
} from "./modules/populateMainContent";
toggles();
changeIcons();
showProjectModal();
showTaskModal();
onLoadPopulate();
populateProjectsListOnLoad();
populateProjectsForTaskOnLoad();
