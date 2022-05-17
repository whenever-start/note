"use strict";
function fn(a, b) {
    console.log(this);
    return a + b;
}
console.log(window.fn(3, 4));
