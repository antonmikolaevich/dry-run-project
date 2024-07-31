const { formatDates, todayCreationDate } = require('../utils/functions');


describe ('Dashboard Page', () => { 


    beforeEach(async() => {
       await browser.url('http://ecsb00302b2a.epam.com:8082');
    })


    it('Check Dashboard view when no data is added', async() => {
        await $('#header .header_logo').isDisplayed();
        await $('#header button#logout').isDisplayed();
        await $('#header .greeting_name').isDisplayed();
        await $('#header .greeting_question').isDisplayed();


        const greetingQuestionText = await $('#header .greeting_question').getText();
        const greetingNameText = await $('#header .greeting_name').getText();

        await $('#task-list .task-list_heading .task-column').isDisplayed();
        await $('#task-list .task-list_heading .description-column').isDisplayed();
        await $('#task-list .task-list_heading .creation-date-column').isDisplayed();
        await $('#task-list .task-list_heading .due-date-column').isDisplayed();
        await $('#task-list .task-list_heading .priority-column').isDisplayed();
        await $('#task-list .task-list_heading .status-column').isDisplayed();

        expect(greetingNameText).toEqual('Welcome Jane!');
        expect(greetingQuestionText).toEqual('What is on due today?');
    });


    it('Check that user is able to add a task', async() => {
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
        const taskCardTitle = await $('.task-list_row:nth-of-type(1) td.task-column span').getText();
        const taskDescriptionTitle =  await $('.task-list_row:nth-of-type(1) td.description-column').getText();
        const creationDateTitle =  await $('.task-list_row:nth-of-type(1) td.creation-date-column').getText();
        const dueDateValueTitle =  await $('.task-list_row:nth-of-type(1) td.due-date-column').getText();
        const priorityValueTitle =  await $('.task-list_row:nth-of-type(1) td.priority-column > div.priority').getText();
        const cardStatusTitle =  await $('.task-list_row:nth-of-type(1) td.status-column > div.status').getText(); 



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

        //click save the button
        // await pages('dashboard').taskForm.saveBtn.click();
        // await pages('dashboard').taskForm.rootEl.waitForDisplayed({reverse: true});

        // //task card 1 is displayed
        // await pages('dashboard').taskItemComponent(1).rootEl.waitForDisplayed();

        //get text of all elements in the card row 1
        // const taskCardTitle = await pages('dashboard').taskItemComponent(1).name.getText();
        // const taskDescriptionTitle =  await pages('dashboard').taskItemComponent(1).description.getText();
        // const creationDateTitle =  await pages('dashboard').taskItemComponent(1).creationDate.getText();
        // const dueDateValueTitle =  await pages('dashboard').taskItemComponent(1).dueDate.getText();
        // const priorityValueTitle =  await pages('dashboard').taskItemComponent(1).priority.getText();
        // const cardStatusTitle =  await pages('dashboard').taskItemComponent(1).status.getText(); 

        //compare the actual results of the card values with expected results
        expect(taskCardTitle).toEqual('testCard_1');
        expect(taskDescriptionTitle).toEqual('test card description');
        expect(formatDates(creationDateTitle)).toEqual(`${todayCreationDate}`);
        expect(formatDates(dueDateValueTitle)).toEqual(dueDates);
        expect(priorityValueTitle).toEqual('Low');
        expect(cardStatusTitle).toEqual('To Do');
    });
})