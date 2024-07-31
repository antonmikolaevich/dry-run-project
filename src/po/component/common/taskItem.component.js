const BaseComponent = require('../common/baseComponent.component')

class TaskItemComponent extends BaseComponent {

    constructor(index){
        super(`.task-list_row:nth-of-type(${index})`);
    }

    get name(){
        return this.rootEl.$('td.task-column');
    }

    get description(){
        return this.rootEl.$('td.description-column');
    }

    get creationDate(){
        return this.rootEl.$('td.creation-date-column');
    }

    get dueDate(){
        return this.rootEl.$('td.due-date-column');
    }

    get priority(){
        return this.rootEl.$('td.priority-column > div.priority');
    }

    get status(){
        return this.rootEl.$('td.status-column > div.status');
    }
}

module.exports = TaskItemComponent