const dContainer = document.querySelector("#maincontainer");
const BUTTONS = ["0","",
                 "AC","()","%","/",
                 "7","8","9","X",
                 "4","5","6","-",
                 "1","2","3","+",
                 "0",",","<-","="];



let operand1 = 0;
let operator = "";
let operand2 = 0;
     
function addDiv(parentElement,divXSize,divYSize,buttonOrder) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "button"+buttonOrder);
    newDiv.style = `min-height:${divYSize}px ; min-width:${divXSize}px; `;
    if (buttonOrder <= 1) {
        newDiv.setAttribute("class", "calcButton buttonScreen");
    } else {
        newDiv.setAttribute("class", "calcButton buttonBorder");
        newDiv.addEventListener("mousedown", function(){
            newDiv.style.backgroundColor = 'white';
        });
        newDiv.addEventListener("mouseup", function(){
            newDiv.style.backgroundColor = 'rgb(47, 47, 48)'
        });
        newDiv.addEventListener("click", function(){
            perform(buttonOrder);
        });
    }

    const newText = document.createElement("a");
    newText.setAttribute("id","text"+buttonOrder);
    newText.setAttribute("class","buttonText");
    newText.text = BUTTONS[buttonOrder];
    newDiv.appendChild(newText);
    parentElement.appendChild(newDiv);
}

function createGrid() {
    const GRID_X_SIZE = 4;
    const GRID_Y_SIZE = 7;
    const DIV_X_SIZE = 256;
    const DIV_Y_SIZE = 128;
    addDiv(dContainer,DIV_X_SIZE*GRID_X_SIZE,DIV_Y_SIZE*1.5,0);
    addDiv(dContainer,DIV_X_SIZE*GRID_X_SIZE,DIV_Y_SIZE/2,1);
    for (let i=0; i<GRID_X_SIZE*(GRID_Y_SIZE-2); i++) {
        addDiv(dContainer,DIV_X_SIZE,DIV_Y_SIZE,i+2);
    }
}


function clearVariables() {
    operand1 = 0;
    operator = "";
    operand2 = 0;
}

function perform(action) {
    const dScreen = document.querySelector("#text0");
    switch (action) {
        case 2:
            dScreen.text = BUTTONS[0];
            clearVariables();
            break;
        case 3:
            if (operator === "") 
                operator = "("
            else if (operator === "(") operator = ")";
            break;
        case 4:
        case 5:
        case 9:
        case 13:
        case 17:
            if (operator === "") {
                operator = BUTTONS[action];
                operand1=Number(dScreen.text);
                dScreen.text = dScreen.text + operator;
            }
            break;            
        case 19:
        case 20:
            console.log(action);
            break;
        case 21:     
            if (operator !="") {
                operand2 = dScreen.text.substring(dScreen.text.indexOf(operator) + 1);
                if (operand2 != "") {
                    operand2 = Number(operand2);
                    operate();
                }
            }    
            break;
        default:
            dScreen.text = dScreen.text===BUTTONS[0]? BUTTONS[action]:(dScreen.text + BUTTONS[action]);
    }
}

function operate() {
    const dScreen = document.querySelector("#text0");
    let calcResult = 0;
    console.log(operand1 + operator + operand2);
    switch (operator) {
        case "+":
            calcResult = operand1 + operand2;
            break;
        case "-":
            calcResult = operand1 - operand2;
            break;
        case "X":
            calcResult = operand1 * operand2;
            break;                
        case "/":
            calcResult = operand1 / operand2;
            break;
        }
    dScreen.text = calcResult;
    clearVariables();
    operand1 = calcResult;
}

createGrid();

// eof