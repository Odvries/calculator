




const dContainer = document.querySelector("#maincontainer");
const BUTTONS = ["0","",
                 "AC","()","%","/",
                 "7","8","9","X",
                 "4","5","6","-",
                 "1","2","3","+",
                 "0",",","<-","="];

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
            operate(buttonOrder);
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

function operate(action) {
    const dScreen = document.querySelector("#text0");
    switch (action) {
        case 2:
            dScreen.text = BUTTONS[0];
            break;
        case 3:
        case 4:
        case 5:
        case 9:
        case 13:
        case 17:
        case 19:
        case 20:
        case 21:
            console.log(action);
            break;
        default:
            dScreen.text = dScreen.text===BUTTONS[0]? BUTTONS[action]:(dScreen.text + BUTTONS[action]);
    }

}


createGrid();

// eof