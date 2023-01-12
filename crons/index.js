var cron = require('node-cron');

const createGames= ()=>{
    cron.schedule('* * * * *', () => {
        console.log('running a task every minute');
    });
}

module.exports = {createGames};
