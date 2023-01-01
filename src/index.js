import "./sass/main.scss";
import toggles from "./modules/toggles";
import { changeIcons } from "./modules/changeIconFill";
import { showProjectModal } from "./modules/projectModal";
import { showTaskModal } from "./modules/taskModal";
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
