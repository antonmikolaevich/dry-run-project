const DashboardPage = require("./dashboardPage.page");

function pages(name){
    const items = {
        dashboard: new DashboardPage(),
    }
    return items[name.toLowerCase()];
}

module.exports = {
    pages,
    DashboardPage
}