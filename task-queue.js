class TaskQueue {

    /*
        @taskQueue -> Array of promised actions
        @taskCount -> Maximum number of tasks to execute at a time
        @processCallback -> A callback which will get invoke whenever a promise resolve
        @errorCallback -> A callback which will get invoke whenever a promise reject
    */
    constructor(taskQueue, taskCount, processCallback, errorCallback) {
        this.taskQueue = taskQueue;
        this.taskCount = taskCount; 
        this.processCallback = processCallback;
        this.errorCallback = errorCallback;
    }

    setTaskQueue(taskQueue) {
        this.taskQueue = taskQueue;
        return this;
    }

    setLimit(taskCount) {
        this.taskCount = taskCount;
        return this;
    }

    setProcessCallback(processCallback) {
        this.processCallback = processCallback;
        return this;
    }

    setErrorCallback(errorCallback) {
        this.errorCallback = errorCallback;
        return this;
    }

    run() {
        var taskQueue = this.taskQueue;
        var taskLen = taskQueue.length;

        while(this.taskCount && this.taskCount-- && taskLen) {
            var task = taskQueue.shift();
            /* use finally here to avoid code repeatation */
            task.then( async (result) => {
                this.taskCount++;
                await this.processCallback();
                this.run();
            }).catch( async (err) => {
                this.taskCount++;
                this.errorCallback(err);
                this.run();
            });
        }
    }
}

module.exports = TaskQueue;