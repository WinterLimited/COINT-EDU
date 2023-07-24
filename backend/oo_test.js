const { displayPartsToString } = require("typescript");


class base {
    hello()
    {
        console.log("hello base");
    }
};

class child extends base {
    hello()
    {
        console.log("hello child");
    }
}

function display(_up)
{
    _up.hello();
}

console.log("hello");

var caller = new child();
caller.hello();
display(caller);