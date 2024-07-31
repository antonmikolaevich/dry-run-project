const BasePage = require('../pages/basePage.page');
const { TaskItemComponent } = require('../component/index');


class DashboardPage extends BasePage {

    constructor(){
        super('/')
    }

    taskItemComponent(index){
        return new TaskItemComponent(index)
    }
}

module.exports = DashboardPage;