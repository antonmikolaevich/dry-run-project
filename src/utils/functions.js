const {pages} = require('../po/pages/index');


async function deleteCards (){
    await browser.refresh();
    await browser.pause(2000);
    await pages('dashboard').headerComponent.rootEl.isDisplayed();
    await pages('dashboard').tasksTableComponent.rootEl.isDisplayed();
    const a = await $$('.task-list_row td.task-column span');
    const length = a.length;
    console.log(`our length is ${length}`)

    for (let i = 0; i < length; i ++){
        console.log(`================`)
        console.log(`I am here! delete the ${i} card`)
        //click on task card 1
        await pages('dashboard').taskItemComponent(1).rootEl.click();
        //create card form is dispalyed
        await pages('dashboard').taskForm.rootEl.waitForDisplayed(); 

        //delete the card 1
        await pages('dashboard').taskForm.deleteBtn.click();
        await pages('dashboard').taskForm.rootEl.waitForDisplayed({reverse: true});
        await browser.refresh();
        await browser.pause(2000);
        await pages('dashboard').headerComponent.rootEl.isDisplayed();
        await pages('dashboard').tasksTableComponent.rootEl.isDisplayed();

    }
    await pages('dashboard').taskItemComponent(1).rootEl.waitForDisplayed({reverse: true});
}

function formatDates(string){
    const arr = string.split(' ');
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 
    let dayUpd; 
    let monthInNumber;
    let year;
    for(let i = 0; i < arr.length; i ++){
        if (i === 0){
        monthInNumber = months.indexOf(arr[i]) + 1;
        console.log();
        } else if (i === 1){
           dayUpd = arr[i].replace(',', '');
        } else if (i === 2){
            year = arr[i];
        }
    }
    return (`${monthInNumber}/${dayUpd}/${year}`);
}

const todayCreationDate = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`

async function dueDate(){
    const dueDay = new Date().getDate();
    const dueDate = `${new Date().getMonth() + 1}/${dueDay + 1}/${new Date().getFullYear()}`
    return dueDate;
}







module.exports = {
    formatDates,
    todayCreationDate,
    dueDate,
    deleteCards
}