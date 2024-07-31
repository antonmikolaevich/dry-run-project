const { Header, TasksTableComponent} = require('../component/index');

class BasePage {
    constructor(url){
        this.url = url;
        this.headerComponent = new Header();
        this.tasksTableComponent = new TasksTableComponent();
    }

    open(){
        return browser.url(this.url);
    }

}

module.exports = BasePage;