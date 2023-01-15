console.log('Hello!'); // returns first

setTimeout(function() {
    console.log('Goodbye!'); // returns after 2 sec and thats apparently is after all console logs
    // in that particular task it is returned last because it has longer timeout than any other message
}, 2000);

console.log('Hello again, before the goodbye message!'); // returns second

setTimeout(function() {
    console.log('Goodbye again!'); // returns after 0 sec but that again is not before the hello again
    // message because the call stack is not empty before the hello again message is returned. The call
    // stack must be empty so the setTimeout messages are returned, or any other events, because the
    // event loop is paused until the call stack is empty
}, 0);

console.log('Hello again!'); // returns third