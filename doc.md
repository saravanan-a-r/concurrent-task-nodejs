# Concurrent task with node module

A small node js module by which we can organize the handling of promises.
This module takes two argument
        1) An array of promises
        2) An integer which denotes how many promises that we want to handle at a time
We can pass these arguements in two ways, either by passing in the constructor or by builder design pattern.

1) Passing in the constructor:
new TaskQueue(<array_of_promises>, <concurrent_limit>, <callback_when_promise_resolve>, <callback_when_promise_reject>);

2) By builder design pattern:
new TaskQueue()
.setTaskQueue(<array_of_promises>)
.setLimit(<concurrent_count>)
.setProcessCallback(<callback_when_promise_resolve>)
.setErrorCallback(<callback_when_promise_reject>)

Use case:
    If the node js app wants to download 100 images and wants to resize those 100 images.
    In this case, we can use this library to limit the number of images that we want to resize at a time without affecting the downloading call. Let say, 
    
    
    new TaskQueue(<array_of_download_image_promises>, 2, <imageProcessfunction>)

    