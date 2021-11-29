const DISPLAY_W = 13;
let mem = 0;
let newOperand = true;
let current_op = null;
let display = document.querySelector("#display");
let buttons = document.querySelectorAll("button");
let operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
};


buttons.forEach((button) => {
    button.addEventListener('click', onButtonClick)
})


function onButtonClick(e) {
    text = e.target.textContent;
    if(operations.hasOwnProperty(text)) {
        if(current_op == null) {
            mem = display.textContent;
            current_op = operations[text];
            newOperand = true;
            
        } else {
            mem = formatNumber(current_op(+mem, +display.textContent));
            display.textContent = formatNumber(mem);
            current_op = operations[text];
            newOperand = true;
        }
    } else if (text == "C") {
        mem = 0;
        newOperand = true;
        display.textContent = 0;
        current_op = null;
    } else if (text == "=") {
        if( current_op !== null) {
            display.textContent = formatNumber(current_op(+mem, +display.textContent));
            current_op = null;
            mem = 0;
            newOperand = true;
        }
    } else {
        if(newOperand) {
            display.textContent = text;
            newOperand = false;
        } else if (display.textContent.length < DISPLAY_W) {
            display.textContent += text;
        }
    }
}

function formatNumber(n) {
    if(n.toFixed().toString().length > DISPLAY_W) {
        return 'Error';
    } else if (n.toString().length > DISPLAY_W) {
        return n.toFixed(DISPLAY_W - n.toFixed().toString().length - 1)
    } else {
        return n;
    }
}