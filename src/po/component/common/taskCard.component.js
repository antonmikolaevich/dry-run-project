const BaseComponent = require('../common/baseComponent.component')

class TaskForm extends BaseComponent {

    constructor(){
        super(`.modal-form`);
    }


    get taskNameField() {
        return this.rootEl.$('.label_title input[name="title"]');
    }

    get statusField (){
        return this.rootEl.$('select[name="status"]');
    }

    get priorityField (){
        return this.rootEl.$('select[name="priority"]');
    }

    get dueDate(){
        return this.rootEl.$('input[name="dueDate"]');
    }

    get creationDate(){
        return this.rootEl.$('input[name="createdDate"]');
    }

    get descriptionField(){
        return this.rootEl.$('.label_description textarea');
    }

    get saveBtn(){
        return this.rootEl.$('button.submit-button');
    }

    get deleteBtn(){
        return this.rootEl.$('button.delete-button');
    }

    statusItem(parameter){
        const selectors = {
            todo: 'option[value="TODO"]',
            inprogress: 'option[value="IN_PROGRESS"]',
            review: 'option[value="REVIEW"]',
            done: 'option[value="DONE"]'
        }
        return this.rootEl.$(selectors[parameter.toLowerCase()]);
    }

    priorityItem(parameter){
        const selectors = {
            low: 'option[value="LOW"]',
            medium: 'option[value="MEDIUM"]',
            high: 'option[value="TOP"]'
        }
        return this.rootEl.$(selectors[parameter.toLowerCase()]);
    }

}

module.exports = TaskForm