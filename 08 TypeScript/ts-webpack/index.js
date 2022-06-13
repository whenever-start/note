"use strict";
function hasSelector(element, selector) {
    // const elements: HTMLElement[] = [
    //   ...document.querySelectorAll(selector)
    // ] as HTMLElement[]
    const elements = [...document.querySelectorAll(selector)];
    console.log(elements[0].nodeType);
    return elements.indexOf(element) !== -1;
}
