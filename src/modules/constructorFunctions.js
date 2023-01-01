export function createProject(name, tasks) {
	this.name = name;
	this.tasks = tasks;
}

export function createTask(name, description, date, fromProject, priority) {
	this.name = name;
	this.description = description;
	this.date = date;
	this.fromProject = fromProject;
	this.priority = priority;
}
