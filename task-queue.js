class TaskQueue {

    /*
        @taskQueue -> Array of promised actions
        @taskCount -> Maximum number of tasks to execute at a time
    */
    constructor(taskQueue, taskCount) {
        this.taskQueue = taskQueue;
        this.taskCount = taskCount; 
    }

    run() {
        var taskQueue = this.taskQueue;
        var taskLen = taskQueue.length;

        while(this.taskCount && this.taskCount-- && taskLen) {
            var task = taskQueue.shift();
            /* use finally here to avoid code repeatation */
            task.then( (result) => {
                console.log(result);
                this.taskCount++;
                this.run();
            }).catch( (err) => {
                console.log(err);
                this.taskCount++;
                this.run();
            });
        }
    }
}

module.exports = TaskQueue;