

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
    dueDate
}