import "./sass/main.scss";
import toggles from "./modules/toggles";
import { changeIcons } from "./modules/changeIconFill";
import { showTaskModal, showProjectModal, showTaskEditModal } from "./modules/showModals";
import {
	onLoadPopulate,
	populateProjectsForTaskOnLoad,
	populateProjectsListOnLoad,
} from "./modules/populateMainContent";
toggles();
onLoadPopulate();
populateProjectsListOnLoad();
populateProjectsForTaskOnLoad();
changeIcons();
showProjectModal();
showTaskModal();
