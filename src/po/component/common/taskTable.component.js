const BaseComponent = require('../common/baseComponent.component');

class TasksTableComponent extends BaseComponent {

    constructor(){
        super('#task-list')
    }

    get taskName (){
        return this.rootEl.$('.task-list_heading .task-column');
    }

    get descriptionName (){
        return this.rootEl.$('.task-list_heading .description-column');
    }

    get creationDate (){
        return this.rootEl.$('.task-list_heading .creation-date-column');
    }

    get dueDate (){
        return this.rootEl.$('.task-list_heading .due-date-column');
    }

    get priority (){
        return this.rootEl.$('.task-list_heading .priority-column');
    }

    get status (){
        return this.rootEl.$('.task-list_heading .status-column');
    }

    get addCardBtn (){
        return this.rootEl.$('button.add-card-button');
    }


}


module.exports = TasksTableComponent