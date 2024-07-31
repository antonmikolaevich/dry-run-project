const BaseComponent = require('../common/baseComponent.component')

class HeaderComponent extends BaseComponent {

    constructor(){
        super('#header')
    }

    get logoIcon(){
        return this.rootEl.$('.header_logo');
    }

    get logoutBtn(){
        return this.rootEl.$('button#logout');
    }

    get greetingName(){
        return this.rootEl.$('.greeting_name');
    }

    get greetingQuestion(){
        return this.rootEl.$('.greeting_question');
    }
}

module.exports = HeaderComponent