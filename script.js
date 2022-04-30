
// ------------ CODE IS UNREADABLE ------------

let btn = document.querySelectorAll(".btn");
let screen = document.querySelectorAll("#screen-text")[0];
let clearBtn = document.getElementById("clear-btn");
let equalBtn = document.getElementById("equal-btn");
let deleteBtn = document.getElementById("delete-btn");
let hintText = document.getElementById("hint-text");
let word = "";
let content = [];
let equation = 0;
let equationForScreen = "";
let result = 0;
let paresCheck = 0;
let lastWord = "";


let arrForNum = [4,5,6,7,8,9,10,11,12,13,14];
let arrNumber = ["7","8","9","4","5","6","1","2","3","0","."]
let arrForOperator = [0,1,2,3];
let arrOperator = ["×","÷","+","-"]
let arrForParen = [15,16];
let arrParen = ["(",")"]
let arrForAddAndSub = [2,3];
let arrAddAndSub = ["+","-"]
let num = 0;



clearBtn.addEventListener("click", allClear);
equalBtn.addEventListener("click", equal);
deleteBtn.addEventListener("click", deleteFn);


function allClear(){
    hintText.textContent = "";
    word = "";
    content = [];
    equation = 0;
    paresCheck = 0;
    equationForScreen = "";
    screen.textContent = "";
    result = 0;
}
function equal(){
    hintText.textContent = "";
    if(paresCheck == 0){
        result = eval(equation);
        content = [result];
        equation = result;
        paresCheck = 0;
        equationForScreen = result;
        screen.textContent = result;
    } else {
        hintText.textContent = "Close all parenthesis properly"
    }
}
function deleteFn(){
    hintText.textContent = "";
    lastWord = content.pop();
    if(lastWord == "("){
        paresCheck -= 1;
    } else if(lastWord == ")"){
        paresCheck += 1;
    }
    word = content.pop();
    equationForScreen = equationForScreen.split("");
    equationForScreen.pop();
    equationForScreen = equationForScreen.join("");
    removeAllEvent();
    for(let i = 4; i < 15; i++){
        btn[i].addEventListener("click",clickOnNum);
    }
    if(arrNumber.includes(word)){
        for(let i = 0; i < 4; i++){
            btn[i].addEventListener("click",clickOnOper);
        }
        btn[2].addEventListener("click",clickOnAddAndSub);
        btn[3].addEventListener("click",clickOnAddAndSub);
        btn[15].addEventListener("click",clickOnParen);
        btn[16].addEventListener("click",clickOnParen);
    } else if(arrParen.includes(word)){
        btn[2].addEventListener("click",clickOnAddAndSub);
        btn[3].addEventListener("click",clickOnAddAndSub);
        btn[15].addEventListener("click",clickOnParen);
        btn[16].addEventListener("click",clickOnParen);
    } else if(arrAddAndSub.includes(word)){
        btn[15].addEventListener("click",clickOnParen);
        btn[16].addEventListener("click",clickOnParen);
    } else if(arrOperator.includes(word)){
        btn[15].addEventListener("click",clickOnParen);
        btn[16].addEventListener("click",clickOnParen);
    } 
    makeEquation(word);
}
    
    
function makeEquation(word){
    content.push(word);
    equation = content.join("");
    screen.textContent = equationForScreen;
}



function firstList(){
    hintText.textContent = "";
    for(let x of arrForNum ){
        btn[x].addEventListener("click", clickOnNum);
    }
    for(let x of arrForAddAndSub){
        btn[x].addEventListener("click", clickOnAddAndSub);
    }
    for(let x of arrForParen){
        btn[x].addEventListener("click", clickOnParen);
    }
}
firstList();
function clickOnNum(e){
    hintText.textContent = "";
    word = e.path[0].textContent;
    equationForScreen += word;
    makeEquation(word);
    afterNum();
}
function clickOnAddAndSub(e){
    hintText.textContent = "";
    word = e.path[0].textContent;
    equationForScreen += word;
    makeEquation(word);
}
function clickOnParen(e){
    if(word == "+" || word == "-" || word == "÷" || word == "×" || word == ""){
        if(e.path[0].textContent == "("){
            hintText.textContent = "";
            word = e.path[0].textContent;
            equationForScreen += word;
            makeEquation(word);
            paresCheck += 1;
            for(let x of arrForOperator){
            btn[x].removeEventListener("click", clickOnOper);
            }
            for(let x of arrForAddAndSub){
                btn[x].addEventListener("click", clickOnAddAndSub);
            }
        } else if(e.path[0].textContent == ")"){
            hintText.textContent = 'Enter number before parenthesis"()"';
        }
    } else{
        if(e.path[0].textContent == "("){
            hintText.textContent = 'Please Enter operator "+,-,×,÷" before parenthesis"()"';
        } else if(e.path[0].textContent == ")"){
            hintText.textContent = "";
            word = e.path[0].textContent;
            equationForScreen += word;
            makeEquation(word);
            paresCheck -= 1;
            for(let x of arrForOperator){
            btn[x].addEventListener("click", clickOnOper);
            }
        }
        
    }
    
}



function afterNum(){
    hintText.textContent = "";
    for(let x of arrForAddAndSub){
        btn[x].removeEventListener("click", clickOnAddAndSub)
    }
    for(let x of arrForOperator){
        btn[x].addEventListener("click", clickOnOper);
    }

}
function clickOnOper(e){
    hintText.textContent = "";
    word = e.path[0].textContent;
    equationForScreen += word;
    if (word == "×"){
        makeEquation("*");
    } else if(word == "÷"){
        makeEquation("/")
    } else{
        makeEquation(word);
    }
    
    for(let x of arrForOperator){
        btn[x].removeEventListener("click", clickOnOper)
    }
    for(let x of arrForAddAndSub){
        btn[x].removeEventListener("click", clickOnAddAndSub)
    }
}


function removeAllEvent(){
    for(let i = 0; i < 4; i++){
        btn[i].removeEventListener("click",clickOnOper);
    }
    for(let i = 4; i < 15; i++){
        btn[i].removeEventListener("click",clickOnNum);
    }
    btn[2].removeEventListener("click",clickOnAddAndSub);
    btn[3].removeEventListener("click",clickOnAddAndSub);
    btn[15].removeEventListener("click",clickOnParen);
    btn[16].removeEventListener("click",clickOnParen);
}

