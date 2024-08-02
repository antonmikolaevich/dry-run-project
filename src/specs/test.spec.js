const { pages } = require('../po/pages/index');
const { formatDates, todayCreationDate, dueDate } = require('../utils/functions');
// go to foirthScenario

describe ('Dashboard Page', () => { 


    beforeEach(async() => {
       await pages('dashboard').open();
    })


    it('Check Dashboard view when no data is added', async() => {
        await pages('dashboard').headerComponent.logoIcon.isDisplayed();
        await pages('dashboard').headerComponent.logoutBtn.isDisplayed();
        await pages('dashboard').headerComponent.greetingName.isDisplayed();
        await pages('dashboard').headerComponent.greetingQuestion.isDisplayed();

        const greetingQuestionText = await pages('dashboard').headerComponent.greetingQuestion.getText();
        const greetingNameText = await pages('dashboard').headerComponent.greetingName.getText();

        await pages('dashboard').tasksTableComponent.taskName.isDisplayed();
        await pages('dashboard').tasksTableComponent.descriptionName.isDisplayed();
        await pages('dashboard').tasksTableComponent.creationDate.isDisplayed();
        await pages('dashboard').tasksTableComponent.dueDate.isDisplayed();
        await pages('dashboard').tasksTableComponent.priority.isDisplayed();
        await pages('dashboard').tasksTableComponent.status.isDisplayed();

        expect(greetingNameText).toEqual('Welcome Jane!');
        expect(greetingQuestionText).toEqual('What is on due today?');


        //=========================CSS Selectors =================================


        // await $('#header .header_logo').isDisplayed();
        // await $('#header button#logout').isDisplayed();
        // await $('#header .greeting_name').isDisplayed();
        // await $('#header .greeting_question').isDisplayed();


        // const greetingQuestionText = await $('#header .greeting_question').getText();
        // const greetingNameText = await $('#header .greeting_name').getText();

        // await $('#task-list .task-list_heading .task-column').isDisplayed();
        // await $('#task-list .task-list_heading .description-column').isDisplayed();
        // await $('#task-list .task-list_heading .creation-date-column').isDisplayed();
        // await $('#task-list .task-list_heading .due-date-column').isDisplayed();
        // await $('#task-list .task-list_heading .priority-column').isDisplayed();
        // await $('#task-list .task-list_heading .status-column').isDisplayed();

        // expect(greetingNameText).toEqual('Welcome Jane!');
        // expect(greetingQuestionText).toEqual('What is on due today?');

        //===================CSS Selectors =======================================
    });


    it('Check that user is able to add a task', async() => {
        //====================CSS Selectors ========================

        //header is displayed
        // await $('#header').isDisplayed();
        // await $('#task-list').isDisplayed();

        // //click add a card button
        // await $('#task-list button.add-card-button').isDisplayed();
        // await $('#task-list button.add-card-button').click();

        // //create card form is dispalyed
        // await $('.modal-form').waitForDisplayed();

        // //fill in the fields of the card form
        // await $('.modal-form .label_title input[name="title"]').waitForDisplayed();
        // await $('.modal-form .label_title input[name="title"]').setValue('testCard_1');

        // await $('.modal-form select[name="status"]').click();
        // await $('.modal-form option[value="TODO"]').click();

        // await $('.modal-form select[name="priority"]').click();
        // await $('.modal-form option[value="LOW"]').click();


        // const getDay = new Date().getDate();
        // const dueDates = `${new Date().getMonth() + 1}/${getDay}/${new Date().getFullYear()}`

        // await $('.modal-form input[name="dueDate"]').click();
        // await $('.modal-form input[name="dueDate"]').setValue(dueDates);

        // await $('.modal-form .label_description textarea').click()
        // await $('.modal-form .label_description textarea').setValue('test card description');

        // //click save the button
        // await $('.modal-form button.submit-button').click();
        // await $('.modal-form').waitForDisplayed({reverse: true});

        // //task card 1 is displayed
        // await $('.task-list_row:nth-of-type(1)').waitForDisplayed();

        // //get text of all elements in the card row 1
        // const taskCardTitle = await $('.task-list_row:nth-of-type(1) td.task-column span').getText();
        // const taskDescriptionTitle =  await $('.task-list_row:nth-of-type(1) td.description-column').getText();
        // const creationDateTitle =  await $('.task-list_row:nth-of-type(1) td.creation-date-column').getText();
        // const dueDateValueTitle =  await $('.task-list_row:nth-of-type(1) td.due-date-column').getText();
        // const priorityValueTitle =  await $('.task-list_row:nth-of-type(1) td.priority-column > div.priority').getText();
        // const cardStatusTitle =  await $('.task-list_row:nth-of-type(1) td.status-column > div.status').getText(); 

        //========================= CSS Selectors =======================

        //===============POM ==============================

        //header is displayed
        await pages('dashboard').headerComponent.rootEl.isDisplayed();
        await pages('dashboard').tasksTableComponent.rootEl.isDisplayed();

        //click add a card button
        await pages('dashboard').tasksTableComponent.addCardBtn.isDisplayed();
        await pages('dashboard').tasksTableComponent.addCardBtn.click();

        //create card form is dispalyed
        await pages('dashboard').taskForm.rootEl.waitForDisplayed();

        //fill in the fields of the card form
        await pages('dashboard').taskForm.taskNameField.click();
        await pages('dashboard').taskForm.taskNameField.setValue('testCard_1');

        await pages('dashboard').taskForm.statusField.click();
        await pages('dashboard').taskForm.statusItem('todo').click();

        await pages('dashboard').taskForm.priorityField.click();
        await pages('dashboard').taskForm.priorityItem('low').click();

        const dueDates = await dueDate();
        await pages('dashboard').taskForm.dueDate.click()
        await pages('dashboard').taskForm.dueDate.setValue(dueDates);

        await pages('dashboard').taskForm.descriptionField.click()
        await pages('dashboard').taskForm.descriptionField.setValue('test card description');

        //click save the button
        await pages('dashboard').taskForm.saveBtn.click();
        await pages('dashboard').taskForm.rootEl.waitForDisplayed({reverse: true});

        //task card 1 is displayed
        await pages('dashboard').taskItemComponent(1).rootEl.waitForDisplayed();

        //get text of all elements in the card row 1
        const taskCardTitle = await pages('dashboard').taskItemComponent(1).name.getText();
        const taskDescriptionTitle =  await pages('dashboard').taskItemComponent(1).description.getText();
        const creationDateTitle =  await pages('dashboard').taskItemComponent(1).creationDate.getText();
        const dueDateValueTitle =  await pages('dashboard').taskItemComponent(1).dueDate.getText();
        const priorityValueTitle =  await pages('dashboard').taskItemComponent(1).priority.getText();
        const cardStatusTitle =  await pages('dashboard').taskItemComponent(1).status.getText(); 

        //=================== POM =======

        //compare the actual results of the card values with expected results
        expect(taskCardTitle).toEqual('testCard_1');
        expect(taskDescriptionTitle).toEqual('test card description');
        expect(formatDates(creationDateTitle)).toEqual(`${todayCreationDate}`);
        expect(formatDates(dueDateValueTitle)).toEqual(dueDates);
        expect(priorityValueTitle).toEqual('Low');
        expect(cardStatusTitle).toEqual('To Do');
    });

    it('Check that user is able to edit already created task', async () => {

        //============================ CSS Selector =================================

        // //header is displayed
        // await $('#header').isDisplayed();
        // await $('#task-list').isDisplayed();

        // //click add a card button
        // await $('#task-list button.add-card-button').isDisplayed();
        // await $('#task-list button.add-card-button').click();

        // //create card form is dispalyed
        // await $('.modal-form').waitForDisplayed();

        // //fill in the fields of the card form
        // await $('.modal-form .label_title input[name="title"]').waitForDisplayed();
        // await $('.modal-form .label_title input[name="title"]').setValue('testCard_1');

        // await $('.modal-form select[name="status"]').click();
        // await $('.modal-form option[value="TODO"]').click();

        // await $('.modal-form select[name="priority"]').click();
        // await $('.modal-form option[value="LOW"]').click();


        // const getDay = new Date().getDate();
        // const dueDates = `${new Date().getMonth() + 1}/${getDay}/${new Date().getFullYear()}`

        // await $('.modal-form input[name="dueDate"]').click();
        // await $('.modal-form input[name="dueDate"]').setValue(dueDates);

        // await $('.modal-form .label_description textarea').click()
        // await $('.modal-form .label_description textarea').setValue('test card description');

        // //click save the button
        // await $('.modal-form button.submit-button').click();
        // await $('.modal-form').waitForDisplayed({reverse: true});

        // //task card 1 is displayed
        // await $('.task-list_row:nth-of-type(1)').waitForDisplayed();

        // //get text of all elements in the card row 1
        // const taskCardTitleOld = await $('.task-list_row:nth-of-type(1) td.task-column').getText();
        // const taskDescriptionTitleOld =  await $('.task-list_row:nth-of-type(1) td.description-column').getText();
        // const creationDateTitleOld =  await $('.task-list_row:nth-of-type(1) td.creation-date-column').getText();
        // const dueDateValueTitleOld =  await $('.task-list_row:nth-of-type(1) td.due-date-column').getText();
        // const priorityValueTitleOld =  await $('.task-list_row:nth-of-type(1) td.priority-column > div.priority').getText();
        // const cardStatusTitleOld =  await $('.task-list_row:nth-of-type(1) td.status-column > div.status').getText(); 

        // await browser.refresh();

        // await $('#header').isDisplayed();
        // await $('#task-list').isDisplayed();

        // //click on the created first card
        // await $('.task-list_row:nth-of-type(1)').waitForDisplayed();
        // await $('.task-list_row:nth-of-type(1)').click();

        // //create card form is dispalyed
        // await $('.modal-form').waitForDisplayed();

        // //fill in the fields of the card form
        // await $('.modal-form .label_title input[name="title"]').waitForDisplayed();
        // await $('.modal-form .label_title input[name="title"]').clearValue();
        // await $('.modal-form .label_title input[name="title"]').setValue('testCard_updated');

        // await $('.modal-form select[name="status"]').click();
        // await $('.modal-form option[value="IN_PROGRESS"]').click();

        // await $('.modal-form select[name="priority"]').click();
        // await $('.modal-form option[value="MEDIUM"]').click();


        // const getDaySecond = new Date().getDate();
        // const dueDatesSecond = `${new Date().getMonth() + 1}/${getDaySecond}/${new Date().getFullYear()}`

        // await $('.modal-form input[name="dueDate"]').click();
        // await $('.modal-form input[name="dueDate"]').setValue(dueDatesSecond);

        // await $('.modal-form .label_description textarea').click()
        // await $('.modal-form .label_description textarea').clearValue();
        // await $('.modal-form .label_description textarea').setValue('test card description updated');

        // //click save the button
        // await $('.modal-form button.submit-button').click();
        // await $('.modal-form').waitForDisplayed({reverse: true});


        // //task card 1 is displayed
        // await $('.task-list_row:nth-of-type(1)').waitForDisplayed();

        // //get text of all elements in the updated card row 1
        // const taskCardTitleNew = await $('.task-list_row:nth-of-type(1) td.task-column').getText();
        // console.log(`our title is ${taskCardTitleNew}`);
        // const taskDescriptionTitleNew =  await $('.task-list_row:nth-of-type(1) td.description-column').getText();
        // const creationDateTitleNew =  await $('.task-list_row:nth-of-type(1) td.creation-date-column').getText();
        // const dueDateValueTitleNew =  await $('.task-list_row:nth-of-type(1) td.due-date-column').getText();
        // const priorityValueTitleNew =  await $('.task-list_row:nth-of-type(1) td.priority-column > div.priority').getText();
        // const cardStatusTitleNew =  await $('.task-list_row:nth-of-type(1) td.status-column > div.status').getText();


        //============================================= CSS Selector =======================================
        
        
        //==================POM =============================

        //header is displayed
        await pages('dashboard').headerComponent.rootEl.isDisplayed();
        await pages('dashboard').tasksTableComponent.rootEl.isDisplayed();

        //click add a card button
        await pages('dashboard').tasksTableComponent.addCardBtn.isDisplayed();
        await pages('dashboard').tasksTableComponent.addCardBtn.click();

        //create card form is dispalyed
        await pages('dashboard').taskForm.rootEl.waitForDisplayed();

        //fill in the fields of the card form
        await pages('dashboard').taskForm.taskNameField.click();
        await pages('dashboard').taskForm.taskNameField.setValue('testCard_1');

        await pages('dashboard').taskForm.statusField.click();
        await pages('dashboard').taskForm.statusItem('todo').click();

        await pages('dashboard').taskForm.priorityField.click();
        await pages('dashboard').taskForm.priorityItem('low').click();

        const dueDates = await dueDate();
        await pages('dashboard').taskForm.dueDate.click()
        await pages('dashboard').taskForm.dueDate.setValue(dueDates);

        await pages('dashboard').taskForm.descriptionField.click()
        await pages('dashboard').taskForm.descriptionField.setValue('test card description');

        //click save the button
        await pages('dashboard').taskForm.saveBtn.click();
        await pages('dashboard').taskForm.rootEl.waitForDisplayed({reverse: true});

        //task card 1 is displayed
        await pages('dashboard').taskItemComponent(1).rootEl.waitForDisplayed();

        //get text of all elements in the card row 1
        const taskCardTitleOld = await pages('dashboard').taskItemComponent(1).name.getText();
        const taskDescriptionTitleOld =  await pages('dashboard').taskItemComponent(1).description.getText();
        const creationDateTitleOld =  await pages('dashboard').taskItemComponent(1).creationDate.getText();
        const dueDateValueTitleOld =  await pages('dashboard').taskItemComponent(1).dueDate.getText();
        const priorityValueTitleOld =  await pages('dashboard').taskItemComponent(1).priority.getText();
        const cardStatusTitleOld =  await pages('dashboard').taskItemComponent(1).status.getText(); 

        await browser.refresh();

        //header is displayed
        await pages('dashboard').headerComponent.rootEl.isDisplayed();
        await pages('dashboard').tasksTableComponent.rootEl.isDisplayed();

        //task card 1 is displayed
        await pages('dashboard').taskItemComponent(1).rootEl.waitForDisplayed();

        //click on task card 1
        await pages('dashboard').taskItemComponent(1).rootEl.click();
        //create card form is dispalyed
        await pages('dashboard').taskForm.rootEl.waitForDisplayed();       
        
        //update the task form
        await pages('dashboard').taskForm.taskNameField.click();
        await pages('dashboard').taskForm.taskNameField.clearValue();
        await pages('dashboard').taskForm.taskNameField.setValue('testCard_updated');
        await pages('dashboard').taskForm.statusField.click();
        await pages('dashboard').taskForm.statusItem('inprogress').click();
        await pages('dashboard').taskForm.priorityField.click();
        await pages('dashboard').taskForm.priorityItem('medium').click();

        const dueDatesSecond = await dueDate();
        await pages('dashboard').taskForm.dueDate.click()
        await pages('dashboard').taskForm.dueDate.setValue(dueDatesSecond);

        await pages('dashboard').taskForm.descriptionField.click();
        await pages('dashboard').taskForm.descriptionField.clearValue();
        await pages('dashboard').taskForm.descriptionField.setValue('test card description updated');

         //click save the button
        await pages('dashboard').taskForm.saveBtn.click();
        await pages('dashboard').taskForm.rootEl.waitForDisplayed({reverse: true});
 
        //task card 1 is displayed
        await pages('dashboard').taskItemComponent(1).rootEl.waitForDisplayed();

        //get text of all elements in the updated card row 1
        const taskCardTitleNew = await pages('dashboard').taskItemComponent(1).name.getText();
        const taskDescriptionTitleNew =  await pages('dashboard').taskItemComponent(1).description.getText();
        const creationDateTitleNew =  await pages('dashboard').taskItemComponent(1).creationDate.getText();
        const dueDateValueTitleNew =  await pages('dashboard').taskItemComponent(1).dueDate.getText();
        const priorityValueTitleNew =  await pages('dashboard').taskItemComponent(1).priority.getText();
        const cardStatusTitleNew =  await pages('dashboard').taskItemComponent(1).status.getText(); 


        //=====================POM============

        //compare the new and updated elements of the card 1
        expect(taskCardTitleNew).not.toEqual(taskCardTitleOld);
        expect(taskDescriptionTitleNew).not.toEqual(taskDescriptionTitleOld);
        expect(formatDates(creationDateTitleNew)).toEqual(formatDates(creationDateTitleOld));
        expect(formatDates(dueDateValueTitleNew)).toEqual(formatDates(dueDateValueTitleOld));
        expect(priorityValueTitleNew).not.toEqual(priorityValueTitleOld);
        expect(cardStatusTitleNew).not.toEqual(cardStatusTitleOld);        

      })

      it('Check Dashboard view with task', async() =>{
        //header is displayed
        await $('#header').isDisplayed();
        await $('#task-list').isDisplayed();

        //click add a card button
        await $('#task-list button.add-card-button').isDisplayed();
        await $('#task-list button.add-card-button').click();

        //create card form is dispalyed
        await $('.modal-form').waitForDisplayed();

        //fill in the fields of the card form
        await $('.modal-form .label_title input[name="title"]').waitForDisplayed();
        await $('.modal-form .label_title input[name="title"]').setValue('testCard_1');

        await $('.modal-form select[name="status"]').click();
        await $('.modal-form option[value="TODO"]').click();

        await $('.modal-form select[name="priority"]').click();
        await $('.modal-form option[value="LOW"]').click();


        const getDay = new Date().getDate();
        const dueDates = `${new Date().getMonth() + 1}/${getDay}/${new Date().getFullYear()}`

        await $('.modal-form input[name="dueDate"]').click();
        await $('.modal-form input[name="dueDate"]').setValue(dueDates);

        await $('.modal-form .label_description textarea').click()
        await $('.modal-form .label_description textarea').setValue('test card description');

        //click save the button
        await $('.modal-form button.submit-button').click();
        await $('.modal-form').waitForDisplayed({reverse: true});

        //task card 1 is displayed
        await $('.task-list_row:nth-of-type(1)').waitForDisplayed();

        //get text of all elements in the card row 1
        const taskCardTitle = await $('.task-list_row:nth-of-type(1) td.task-column').getText();
        const taskDescriptionTitle =  await $('.task-list_row:nth-of-type(1) td.description-column').getText();
        const creationDateTitle =  await $('.task-list_row:nth-of-type(1) td.creation-date-column').getText();
        const dueDateValueTitle =  await $('.task-list_row:nth-of-type(1) td.due-date-column').getText();
        const priorityValueTitle =  await $('.task-list_row:nth-of-type(1) td.priority-column > div.priority').getText();
        const cardStatusTitle =  await $('.task-list_row:nth-of-type(1) td.status-column > div.status').getText(); 

        expect(taskCardTitle).toEqual('testCard_1');
        expect(taskDescriptionTitle).toEqual('test card description');
        expect(formatDates(creationDateTitle)).toEqual(`${todayCreationDate}`);
        expect(formatDates(dueDateValueTitle)).toEqual(dueDates);
        expect(priorityValueTitle).toEqual('Low');
        expect(cardStatusTitle).toEqual('To Do');

        //task card 1 is displayed
        await $('.task-list_row:nth-of-type(1)').waitForDisplayed();
        await $('#task-list button.add-card-button').isDisplayed();

        //====================POM=============================

        // //header is displayed
        // await pages('dashboard').headerComponent.rootEl.isDisplayed();
        // await pages('dashboard').tasksTableComponent.rootEl.isDisplayed();

        // //click add a card button
        // await pages('dashboard').tasksTableComponent.addCardBtn.isDisplayed();
        // await pages('dashboard').tasksTableComponent.addCardBtn.click();

        // //create card form is dispalyed
        // await pages('dashboard').taskForm.rootEl.waitForDisplayed();

        // //fill in the fields of the card form
        // await pages('dashboard').taskForm.taskNameField.click();
        // await pages('dashboard').taskForm.taskNameField.setValue('testCard_1');

        // await pages('dashboard').taskForm.statusField.click();
        // await pages('dashboard').taskForm.statusItem('todo').click();

        // await pages('dashboard').taskForm.priorityField.click();
        // await pages('dashboard').taskForm.priorityItem('low').click();

        // const dueDates = await dueDate();
        // await pages('dashboard').taskForm.dueDate.click()
        // await pages('dashboard').taskForm.dueDate.setValue(dueDates);

        // await pages('dashboard').taskForm.descriptionField.click()
        // await pages('dashboard').taskForm.descriptionField.setValue('test card description');

        // //click save the button
        // await pages('dashboard').taskForm.saveBtn.click();
        // await pages('dashboard').taskForm.rootEl.waitForDisplayed({reverse: true});

        // //get text of all elements in the card row 1
        // const taskCardTitle = await pages('dashboard').taskItemComponent(1).name.getText();
        // const taskDescriptionTitle =  await pages('dashboard').taskItemComponent(1).description.getText();
        // const creationDateTitle =  await pages('dashboard').taskItemComponent(1).creationDate.getText();
        // const dueDateValueTitle =  await pages('dashboard').taskItemComponent(1).dueDate.getText();
        // const priorityValueTitle =  await pages('dashboard').taskItemComponent(1).priority.getText();
        // const cardStatusTitle =  await pages('dashboard').taskItemComponent(1).status.getText(); 

        // expect(taskCardTitle).toEqual('testCard_1');
        // expect(taskDescriptionTitle).toEqual('test card description');
        // expect(formatDates(creationDateTitle)).toEqual(`${todayCreationDate}`);
        // expect(formatDates(dueDateValueTitle)).toEqual(dueDates);
        // expect(priorityValueTitle).toEqual('Low');
        // expect(cardStatusTitle).toEqual('To Do');

        // //task card 1 is displayed
        // await pages('dashboard').taskItemComponent(1).rootEl.waitForDisplayed();
        // await pages('dashboard').tasksTableComponent.addCardBtn.isDisplayed();
      })


      it('Check Task sorting in the Dashboard Table', async () => {
        //header is displayed
        await $('#header').isDisplayed();
        await $('#task-list').isDisplayed();

        //click add a card button
        await $('#task-list button.add-card-button').isDisplayed();
        await $('#task-list button.add-card-button').click();

        //create card form is dispalyed
        await $('.modal-form').waitForDisplayed();

        //fill in the fields of the card form
        await $('.modal-form .label_title input[name="title"]').waitForDisplayed();
        await $('.modal-form .label_title input[name="title"]').setValue('testCard_1');

        await $('.modal-form select[name="status"]').click();
        await $('.modal-form option[value="TODO"]').click();

        await $('.modal-form select[name="priority"]').click();
        await $('.modal-form option[value="LOW"]').click();


        const getDay = new Date().getDate();
        const dueDates = `${new Date().getMonth() + 1}/${getDay}/${new Date().getFullYear()}`

        await $('.modal-form input[name="dueDate"]').click();
        await $('.modal-form input[name="dueDate"]').setValue(dueDates);

        await $('.modal-form .label_description textarea').click()
        await $('.modal-form .label_description textarea').setValue('test card description');

        //click save the button
        await $('.modal-form button.submit-button').click();
        await $('.modal-form').waitForDisplayed({reverse: true});

        //task card 1 is displayed
        await $('.task-list_row:nth-of-type(1)').waitForDisplayed();

        //get text of all elements in the card row 1
        const taskCardTitleFirst = await $('.task-list_row:nth-of-type(1) td.task-column').getText();
        const taskDescriptionTitleFirst =  await $('.task-list_row:nth-of-type(1) td.description-column').getText();
        const creationDateTitleFirst =  await $('.task-list_row:nth-of-type(1) td.creation-date-column').getText();
        const dueDateValueTitleFirst =  await $('.task-list_row:nth-of-type(1) td.due-date-column').getText();
        const priorityValueTitleFirst =  await $('.task-list_row:nth-of-type(1) td.priority-column > div.priority').getText();
        const cardStatusTitleFirst =  await $('.task-list_row:nth-of-type(1) td.status-column > div.status').getText(); 

        await $('#task-list button.add-card-button').isDisplayed();
        await $('#task-list button.add-card-button').click();

        //create card 2 form is dispalyed
        await $('.modal-form').waitForDisplayed();

        //fill in the fields of the card form
        await $('.modal-form .label_title input[name="title"]').waitForDisplayed();
        await $('.modal-form .label_title input[name="title"]').setValue('testCard_2');

        await $('.modal-form select[name="status"]').click();
        await $('.modal-form option[value="IN_PROGRESS"]').click();

        await $('.modal-form select[name="priority"]').click();
        await $('.modal-form option[value="MEDIUM"]').click();


        const getDaySecond = new Date().getDate();
        const dueDatesSecond = `${new Date().getMonth() + 1}/${getDaySecond}/${new Date().getFullYear()}`

        await $('.modal-form input[name="dueDate"]').click();
        await $('.modal-form input[name="dueDate"]').setValue(dueDatesSecond);

        await $('.modal-form .label_description textarea').click()
        await $('.modal-form .label_description textarea').setValue('test card description number the second');

        //click save the button
        await $('.modal-form button.submit-button').click();
        await $('.modal-form').waitForDisplayed({reverse: true});

        //task card 1 is displayed
        await $('.task-list_row:nth-of-type(2)').waitForDisplayed();

        //get text of all elements in the card row 2
        const taskCardTitleSecond = await $('.task-list_row:nth-of-type(2) td.task-column').getText();
        const taskDescriptionTitleSecond =  await $('.task-list_row:nth-of-type(2) td.description-column').getText();
        const creationDateTitleSecond =  await $('.task-list_row:nth-of-type(2) td.creation-date-column').getText();
        const dueDateValueTitleSecond =  await $('.task-list_row:nth-of-type(2) td.due-date-column').getText();
        const priorityValueTitleSecond =  await $('.task-list_row:nth-of-type(2) td.priority-column > div.priority').getText();
        const cardStatusTitleSecond =  await $('.task-list_row:nth-of-type(2) td.status-column > div.status').getText(); 


        //==========================POM======================


        // //header is displayed
        // await pages('dashboard').headerComponent.rootEl.isDisplayed();
        // await pages('dashboard').tasksTableComponent.rootEl.isDisplayed();

        // //click add a card button
        // await pages('dashboard').tasksTableComponent.addCardBtn.isDisplayed();
        // await pages('dashboard').tasksTableComponent.addCardBtn.click();

        // //create card form  is dispalyed
        // await pages('dashboard').taskForm.rootEl.waitForDisplayed();

        // //fill in the fields of the card form to create card 1
        // await pages('dashboard').taskForm.taskNameField.click();
        // await pages('dashboard').taskForm.taskNameField.setValue('testCard_1');

        // await pages('dashboard').taskForm.statusField.click();
        // await pages('dashboard').taskForm.statusItem('todo').click();

        // await pages('dashboard').taskForm.priorityField.click();
        // await pages('dashboard').taskForm.priorityItem('low').click();

        // const dueDates = await dueDate();
        // await pages('dashboard').taskForm.dueDate.click()
        // await pages('dashboard').taskForm.dueDate.setValue(dueDates);

        // await pages('dashboard').taskForm.descriptionField.click()
        // await pages('dashboard').taskForm.descriptionField.setValue('test card description');

        // //click save the button
        // await pages('dashboard').taskForm.saveBtn.click();
        // await pages('dashboard').taskForm.rootEl.waitForDisplayed({reverse: true});

        // //get text of all elements in the card row 1
        // const taskCardTitleFirst = await pages('dashboard').taskItemComponent(1).name.getText();
        // const taskDescriptionTitleFirst =  await pages('dashboard').taskItemComponent(1).description.getText();
        // const creationDateTitleFirst =  await pages('dashboard').taskItemComponent(1).creationDate.getText();
        // const dueDateValueTitleFirst =  await pages('dashboard').taskItemComponent(1).dueDate.getText();
        // const priorityValueTitleFirst =  await pages('dashboard').taskItemComponent(1).priority.getText();
        // const cardStatusTitleFirst =  await pages('dashboard').taskItemComponent(1).status.getText(); 

        // //click add a card button to create card 2
        // await pages('dashboard').tasksTableComponent.addCardBtn.isDisplayed();
        // await pages('dashboard').tasksTableComponent.addCardBtn.click();

        // //create card form is dispalyed
        // await pages('dashboard').taskForm.rootEl.waitForDisplayed();

        // //fill in the fields of the card form 2
        // await pages('dashboard').taskForm.taskNameField.click();
        // await pages('dashboard').taskForm.taskNameField.setValue('testCard_2');

        // await pages('dashboard').taskForm.statusField.click();
        // await pages('dashboard').taskForm.statusItem('inprogress').click();

        // await pages('dashboard').taskForm.priorityField.click();
        // await pages('dashboard').taskForm.priorityItem('medium').click();

        // const dueDatesSecond = await dueDate();
        // await pages('dashboard').taskForm.dueDate.click()
        // await pages('dashboard').taskForm.dueDate.setValue(dueDatesSecond);

        // await pages('dashboard').taskForm.descriptionField.click()
        // await pages('dashboard').taskForm.descriptionField.setValue('test card description number the second');

        // //click save the button
        // await pages('dashboard').taskForm.saveBtn.click();
        // await pages('dashboard').taskForm.rootEl.waitForDisplayed({reverse: true});

        // //get text of all elements in the card row 2
        // const taskCardTitleSecond = await pages('dashboard').taskItemComponent(2).name.getText();
        // const taskDescriptionTitleSecond =  await pages('dashboard').taskItemComponent(2).description.getText();
        // const creationDateTitleSecond =  await pages('dashboard').taskItemComponent(2).creationDate.getText();
        // const dueDateValueTitleSecond =  await pages('dashboard').taskItemComponent(2).dueDate.getText();
        // const priorityValueTitleSecond =  await pages('dashboard').taskItemComponent(2).priority.getText();
        // const cardStatusTitleSecond =  await pages('dashboard').taskItemComponent(2).status.getText(); 

        //==================POM========

        expect(taskCardTitleFirst).toEqual('testCard_1');
        expect(taskDescriptionTitleFirst).toEqual('test card description');
        expect(formatDates(creationDateTitleFirst)).toEqual(`${todayCreationDate}`);
        expect(formatDates(dueDateValueTitleFirst)).toEqual(dueDates);
        expect(priorityValueTitleFirst).toEqual('Low');
        expect(cardStatusTitleFirst).toEqual('To Do');

        expect(taskCardTitleSecond).toEqual('testCard_2');
        expect(taskDescriptionTitleSecond).toEqual('test card description number the second');
        expect(formatDates(creationDateTitleSecond)).toEqual(`${todayCreationDate}`);
        expect(formatDates(dueDateValueTitleSecond)).toEqual(dueDatesSecond);
        expect(priorityValueTitleSecond).toEqual('Medium');
        expect(cardStatusTitleSecond).toEqual('In Progress');
      })

      it('Check "New Task" modal view', async () => {
        //header is displayed
        await $('#header').isDisplayed();
        await $('#task-list').isDisplayed();

        //click add a card button
        await $('#task-list button.add-card-button').isDisplayed();
        await $('#task-list button.add-card-button').click();

        //create card form is dispalyed
        await $('.modal-form').waitForDisplayed();

        await $('.modal-form .label_title input[name="title"]').isEnabled();
        await $('.modal-form select[name="status"]').isEnabled();
        await $('.modal-form select[name="status"]').click();

        await $('.modal-form option[value="TODO"]').isEnabled();
        await $('.modal-form option[value="IN_PROGRESS"]').isEnabled();
        await $('.modal-form option[value="REVIEW"]').isEnabled();
        await $('.modal-form option[value="DONE"]').isEnabled();

        await $('.modal-form select[name="priority"]').isEnabled();
        await $('.modal-form select[name="priority"]').click();

        await $('.modal-form option[value="LOW"]').isEnabled();
        await $('.modal-form option[value="MEDIUM"]').isEnabled();
        await $('.modal-form option[value="TOP"]').isEnabled();

        const isCreationDateEnabled = await $('.modal-form input[name="createdDate"]').isEnabled();
        expect(isCreationDateEnabled).toEqual(false);

        await $('.modal-form input[name="dueDate"]').isEnabled();

        await $('.modal-form .label_description textarea').click();
        await $('.modal-form .label_description textarea').isDisplayed();
        await $('.modal-form .label_description textarea').isEnabled();

        await $('.modal-form button.submit-button').isDisplayed();
        await $('.modal-form button.submit-button').isEnabled();



        //=====================================POM==================================


        // //header is displayed
        // await pages('dashboard').headerComponent.rootEl.isDisplayed();
        // await pages('dashboard').tasksTableComponent.rootEl.isDisplayed();

        // //click add a card button
        // await pages('dashboard').tasksTableComponent.addCardBtn.isDisplayed();
        // await pages('dashboard').tasksTableComponent.addCardBtn.click();

        // //create card form is dispalyed
        // await pages('dashboard').taskForm.rootEl.waitForDisplayed();

        // await pages('dashboard').taskForm.taskNameField.isEnabled();

        // await pages('dashboard').taskForm.statusField.isEnabled();
        // await pages('dashboard').taskForm.statusField.click();

        // await pages('dashboard').taskForm.statusItem('todo').isEnabled();
        // await pages('dashboard').taskForm.statusItem('review').isEnabled();
        // await pages('dashboard').taskForm.statusItem('inprogress').isEnabled();
        // await pages('dashboard').taskForm.statusItem('done').isEnabled();

        // await pages('dashboard').taskForm.priorityField.isEnabled();
        // await pages('dashboard').taskForm.priorityField.click();

        // await pages('dashboard').taskForm.priorityItem('low').isEnabled();
        // await pages('dashboard').taskForm.priorityItem('medium').isEnabled();
        // await pages('dashboard').taskForm.priorityItem('high').isEnabled();

        // const isCreationDateEnabled = await pages('dashboard').taskForm.creationDate.isEnabled();
        // expect(isCreationDateEnabled).toEqual(false);

        // await pages('dashboard').taskForm.dueDate.isEnabled();

        // await pages('dashboard').taskForm.descriptionField.click();
        // await pages('dashboard').taskForm.descriptionField.isDisplayed();
        // await pages('dashboard').taskForm.descriptionField.isEnabled();

        // await pages('dashboard').taskForm.saveBtn.isDisplayed();
        // await pages('dashboard').taskForm.saveBtn.isEnabled();
      })

      it('Check task modal view', async () => {
         //header is displayed
         await $('#header').isDisplayed();
         await $('#task-list').isDisplayed();
 
         //click add a card button
         await $('#task-list button.add-card-button').isDisplayed();
         await $('#task-list button.add-card-button').click();
 
         //create card form is dispalyed
         await $('.modal-form').waitForDisplayed();
 
         //fill in the fields of the card form
         await $('.modal-form .label_title input[name="title"]').waitForDisplayed();
         await $('.modal-form .label_title input[name="title"]').setValue('testCard_1');
 
         await $('.modal-form select[name="status"]').click();
         await $('.modal-form option[value="TODO"]').click();
 
         await $('.modal-form select[name="priority"]').click();
         await $('.modal-form option[value="LOW"]').click();
 
 
         const getDay = new Date().getDate();
         const dueDates = `${new Date().getMonth() + 1}/${getDay}/${new Date().getFullYear()}`
 
         await $('.modal-form input[name="dueDate"]').click();
         await $('.modal-form input[name="dueDate"]').setValue(dueDates);
 
         await $('.modal-form .label_description textarea').click()
         await $('.modal-form .label_description textarea').setValue('test card description');
 
         //click save the button
         await $('.modal-form button.submit-button').click();
         await $('.modal-form').waitForDisplayed({reverse: true});
 
         //task card 1 is displayed
         await $('.task-list_row:nth-of-type(1)').waitForDisplayed();
          
         //click on task card 1 is displayed
        await $('.task-list_row:nth-of-type(1)').click();
        
         //create card form is dispalyed
         await $('.modal-form').waitForDisplayed();

        await $('.modal-form .label_title input[name="title"]').isEnabled();
        await $('.modal-form select[name="status"]').isEnabled();
        await $('.modal-form select[name="status"]').click();

        await $('.modal-form option[value="TODO"]').isEnabled();
        await $('.modal-form option[value="IN_PROGRESS"]').isEnabled();
        await $('.modal-form option[value="REVIEW"]').isEnabled();
        await $('.modal-form option[value="DONE"]').isEnabled();

        await $('.modal-form select[name="priority"]').isEnabled();
        await $('.modal-form select[name="priority"]').click();

        await $('.modal-form option[value="LOW"]').isEnabled();
        await $('.modal-form option[value="MEDIUM"]').isEnabled();
        await $('.modal-form option[value="TOP"]').isEnabled();

        const isCreationDateEnabled = await $('.modal-form input[name="createdDate"]').isEnabled();
        expect(isCreationDateEnabled).toEqual(false);

        await $('.modal-form input[name="dueDate"]').isEnabled();

        await $('.modal-form .label_description textarea').click();
        await $('.modal-form .label_description textarea').isDisplayed();
        await $('.modal-form .label_description textarea').isEnabled();

        await $('.modal-form button.submit-button').isDisplayed();
        await $('.modal-form button.submit-button').isEnabled();

        await $('.modal-form button.delete-button').isDisplayed();
        await $('.modal-form button.delete-button').isEnabled();

        //============================POM==================================

        // //header is displayed
        // await pages('dashboard').headerComponent.rootEl.isDisplayed();
        // await pages('dashboard').tasksTableComponent.rootEl.isDisplayed();

        // //click add a card button
        // await pages('dashboard').tasksTableComponent.addCardBtn.isDisplayed();
        // await pages('dashboard').tasksTableComponent.addCardBtn.click();

        // //create card form is dispalyed
        // await pages('dashboard').taskForm.rootEl.waitForDisplayed();

        // //fill in the fields of the card form
        // await pages('dashboard').taskForm.taskNameField.click();
        // await pages('dashboard').taskForm.taskNameField.setValue('testCard_1');

        // await pages('dashboard').taskForm.statusField.click();
        // await pages('dashboard').taskForm.statusItem('todo').click();

        // await pages('dashboard').taskForm.priorityField.click();
        // await pages('dashboard').taskForm.priorityItem('low').click();

        // const dueDates = await dueDate();
        // await pages('dashboard').taskForm.dueDate.click()
        // await pages('dashboard').taskForm.dueDate.setValue(dueDates);

        // await pages('dashboard').taskForm.descriptionField.click()
        // await pages('dashboard').taskForm.descriptionField.setValue('test card description');

        // //click save the button
        // await pages('dashboard').taskForm.saveBtn.click();
        // await pages('dashboard').taskForm.rootEl.waitForDisplayed({reverse: true});

        // //task card 1 is displayed
        // await pages('dashboard').taskItemComponent(1).rootEl.waitForDisplayed();

        //click on created card 1
        // await pages('dashboard').taskItemComponent(1).name.click();
        // await pages('dashboard').taskForm.rootEl.waitForDisplayed();

        // await pages('dashboard').taskForm.taskNameField.isEnabled();

        // await pages('dashboard').taskForm.statusField.isEnabled();
        // await pages('dashboard').taskForm.statusField.click();

        // await pages('dashboard').taskForm.statusItem('todo').isEnabled();
        // await pages('dashboard').taskForm.statusItem('review').isEnabled();
        // await pages('dashboard').taskForm.statusItem('inprogress').isEnabled();
        // await pages('dashboard').taskForm.statusItem('done').isEnabled();

        // await pages('dashboard').taskForm.priorityField.isEnabled();
        // await pages('dashboard').taskForm.priorityField.click();

        // await pages('dashboard').taskForm.priorityItem('low').isEnabled();
        // await pages('dashboard').taskForm.priorityItem('medium').isEnabled();
        // await pages('dashboard').taskForm.priorityItem('high').isEnabled();

        // const isCreationDateEnabled = await pages('dashboard').taskForm.creationDate.isEnabled();
        // expect(isCreationDateEnabled).toEqual(false);

        // await pages('dashboard').taskForm.dueDate.isEnabled();

        // await pages('dashboard').taskForm.descriptionField.click();
        // await pages('dashboard').taskForm.descriptionField.isDisplayed();
        // await pages('dashboard').taskForm.descriptionField.isEnabled();

        // await pages('dashboard').taskForm.saveBtn.isDisplayed();
        // await pages('dashboard').taskForm.saveBtn.isEnabled();

        // await pages('dashboard').taskForm.deleteBtn.isDisplayed();
        // await pages('dashboard').taskForm.deleteBtn.isEnabled(); 
      })

      it('Check that user is able to delete a task', async () => {
        //header is displayed
        await $('#header').isDisplayed();
        await $('#task-list').isDisplayed();

        //click add a card button
        await $('#task-list button.add-card-button').isDisplayed();
        await $('#task-list button.add-card-button').click();

        //create card form is dispalyed
        await $('.modal-form').waitForDisplayed();

        //fill in the fields of the card form
        await $('.modal-form .label_title input[name="title"]').waitForDisplayed();
        await $('.modal-form .label_title input[name="title"]').setValue('testCard_1');

        await $('.modal-form select[name="status"]').click();
        await $('.modal-form option[value="TODO"]').click();

        await $('.modal-form select[name="priority"]').click();
        await $('.modal-form option[value="LOW"]').click();

        const getDay = new Date().getDate();
         const dueDates = `${new Date().getMonth() + 1}/${getDay}/${new Date().getFullYear()}`
 
         await $('.modal-form input[name="dueDate"]').click();
         await $('.modal-form input[name="dueDate"]').setValue(dueDates);
 
         await $('.modal-form .label_description textarea').click()
         await $('.modal-form .label_description textarea').setValue('test card description');
 
         //click save the button
         await $('.modal-form button.submit-button').click();
         await $('.modal-form').waitForDisplayed({reverse: true});

        await browser.refresh();

        //task card 1 is displayed
        await $('.task-list_row:nth-of-type(1)').waitForDisplayed();

        //click on task card 1 is displayed
        await $('.task-list_row:nth-of-type(1)').click();
        
        //create card form is dispalyed
        await $('.modal-form').waitForDisplayed();

        await $('.modal-form button.delete-button').click();
        await $('.modal-form').waitForDisplayed({reverse: true});
        await $('.task-list_row:nth-of-type(1)').waitForDisplayed({reverse:true});

        //======================================POM==================================

        // //header is displayed
        // await pages('dashboard').headerComponent.rootEl.isDisplayed();
        // await pages('dashboard').tasksTableComponent.rootEl.isDisplayed();

        // //click add a card button
        // await pages('dashboard').tasksTableComponent.addCardBtn.isDisplayed();
        // await pages('dashboard').tasksTableComponent.addCardBtn.click();

        // //create card form is dispalyed
        // await pages('dashboard').taskForm.rootEl.waitForDisplayed();

        // //fill in the fields of the card form
        // await pages('dashboard').taskForm.taskNameField.click();
        // await pages('dashboard').taskForm.taskNameField.setValue('testCard_1');

        // await pages('dashboard').taskForm.statusField.click();
        // await pages('dashboard').taskForm.statusItem('todo').click();

        // await pages('dashboard').taskForm.priorityField.click();
        // await pages('dashboard').taskForm.priorityItem('low').click();

        // const dueDates = await dueDate();
        // await pages('dashboard').taskForm.dueDate.click()
        // await pages('dashboard').taskForm.dueDate.setValue(dueDates);

        // await pages('dashboard').taskForm.descriptionField.click()
        // await pages('dashboard').taskForm.descriptionField.setValue('test card description');

        // //click save the button
        // await pages('dashboard').taskForm.saveBtn.click();
        // await pages('dashboard').taskForm.rootEl.waitForDisplayed({reverse: true});

        // await browser.refresh();

        // //task card 1 is displayed
        // await pages('dashboard').taskItemComponent(1).rootEl.waitForDisplayed();

        // //click on created card 1
        // await pages('dashboard').taskItemComponent(1).name.click();
        // await pages('dashboard').taskForm.rootEl.waitForDisplayed();

        // //delete the card 1
        // await pages('dashboard').taskForm.deleteBtn.click();
        // await pages('dashboard').taskForm.rootEl.waitForDisplayed({reverse: true});
        // await pages('dashboard').taskItemComponent(1).rootEl.waitForDisplayed({reverse: true});
      })
})