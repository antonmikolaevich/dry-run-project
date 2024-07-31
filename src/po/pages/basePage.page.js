const { Header, TasksTableComponent, TaskForm} = require('../component/index');

class BasePage {
    constructor(url){
        this.url = url;
        this.headerComponent = new Header();
        this.tasksTableComponent = new TasksTableComponent();
        this.taskForm = new TaskForm();
    }

    open(){
        return browser.url(this.url);
    }

}

module.exports = BasePage;