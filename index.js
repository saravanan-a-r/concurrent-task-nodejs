var TaskQueue = require("./task-queue");

function delayJobs(jobName, seconds) {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve(jobName);
        }, seconds*1000);
    });
}

function cbPromise() {
    return new Promise( (resolve, reject) => {
        console.log("Complete");
        resolve();
    });
}

function errorCb(err) {
    console.log(err);
}

var tasks = [
    delayJobs("Job - 1", 2),
    delayJobs("Job - 2", 5),
    delayJobs("Job - 3", 2),
    delayJobs("Job - 4", 8),
    delayJobs("Job - 5", 4),
    delayJobs("Job - 6", 3),
    delayJobs("Job - 7", 7),
    delayJobs("Job - 8", 6),
    delayJobs("Job - 9", 6),
    delayJobs("Job - 10", 3),
    delayJobs("Job - 11", 5),
];

new TaskQueue(tasks, 2, cbPromise, errorCb).run();
