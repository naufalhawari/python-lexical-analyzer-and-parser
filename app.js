function lexicalAnalyzer(terminal) {
    i = 0
    state = 0

    while (i < terminal.length) {
        switch (state) {
            case 0:
                if (terminal[i] === 'w') {
                    state = 1;
                }
                else if (terminal[i] === 'T') {
                    state = 5;
                }
                else if (terminal[i] === 'F') {
                    state = 7;
                }
                else if (terminal[i] === '/') {
                    state = 10;
                }
                else if (terminal[i] === 'i') {
                    state = 11;
                }
                else if (terminal[i] === '=' || terminal[i] === '>' || terminal[i] === '<') {
                    state = 12;
                }
                else if (terminal[i] === '*') {
                    state = 13; 
                }
                else if (terminal[i] === "!") {
                    state = 14;
                }
                else if (terminal[i] === 'x' || terminal[i] === 'y' || terminal[i] === ':' || terminal[i] === '+' || terminal[i] === '-') {
                    state = 99;
                } 
				else if (terminal[i] === 'p'){
                    state = 15;
                } 
                else {
                    state = -1;
                }
                break;
            
            case 1:
                if (terminal[i] === 'h') {
                    state = 2;
                } else {
                    state = -1;
                }
                break;

            case 2:
                if (terminal[i] === 'i') {
                    state = 3;
                } else {
                    state = -1;
                }
                break;

            case 3:
                if (terminal[i] === 'l') {
                    state = 4;
                } else {
                    state = -1;
                }
                break;

            case 4:
                if (terminal[i] === 'e') {
                    state = 99;
                } else {
                    state = -1;
                }
                break;

            case 5:
                if (terminal[i] === 'r') {
                    state = 6;
                } else {
                    state = -1;
                }
                break;

            case 6:
                if (terminal[i] === 'u') {
                    state = 4;
                } else {
                    state = -1;
                }
                break;

            case 7:
                if (terminal[i] === 'a') {
                    state = 8;
                } else {
                    state = -1;
                }
                break;

            case 8:
                if (terminal[i] === 'l') {
                    state = 9;
                } else {
                    state = -1;
                }
                break;

            case 9:
                if (terminal[i] === 's') {
                    state = 4;
                } else {
                    state = -1;
                }
                break;

            case 10:
                if (terminal[i] === '/') {
                    state = 99;
                } else {
                    state = -1;
                }
                break;

            case 11:
                if (terminal[i] === 's' || terminal[i] === 'n') {
                    state = 99;
                } else {
                    state = -1;
                }
                break;

            case 12:
                if (terminal[i] === '=') {
                    state = 99;
                } else {
                    state = -1;
                }
                break;

            case 13:
                if (terminal[i] === '*') {
                    state = 99;
                } else {
                    state = -1;
                }
                break;

            case 14:
                if (terminal[i] === '=') {
                    state = 99;
                } else {
                    state = -1
                }
                break;
			case 15:
                if (terminal[i] === 'r') {
                    state = 16;
                } else {
                    state = -1
                }
                break;
			case 16:
                if (terminal[i] === 'i') {
                    state = 17;
                } else {
                    state = -1
                }
                break;
			case 17:
                if (terminal[i] === 'n') {
                    state = 18;
                } else {
                    state = -1
                }
                break;
			case 18:
                if (terminal[i] === 't') {
                    state = 99;
                } else {
                    state = -1
                }
                break;
            case 99:
                state = -1;
                break;

            default:
                state = -1;
                break;
        }

        i++;
    }


    if (state === 10 || state === 12 || state === 13 || state === 99) {
        return true;
    }

    return false;
}

function parser(code) {
    let stack = [];
    
    let state = "i";
    stack.push("#");
    state = "p";
    stack.push("statement");
    state = "q";

    let head = 0;

    code.push("EOS");
    let symbol = code[head];

    let topOfStack = stack.at(-1);
    while (symbol !== "EOS" && state !== "error") {
        switch (topOfStack) {
            case "statement": 
                if (symbol === "while") {
                    stack.pop("statement")
                    stack.push("aksi");
                    stack.push(":");
                    stack.push("kondisi");
                    stack.push("while");
                }
                else {
                    state = "error";
                }
                break;
            case "kondisi": 
                if (symbol === "True") {
                    stack.pop("kondisi");
                    stack.push("True");
                }
                else if (symbol === "False"){
                    stack.pop("kondisi")
                    stack.push("False")
                }
                else if (symbol === "x" || symbol === "y") {
                    stack.pop("kondisi");
                    stack.push("variabel");
                    stack.push("comparator");
                    stack.push("variabel");
                }
                else {
                    state = "error";
                }
                break;
            case "aksi": 
                if (symbol === "x" || symbol === "y") {
                    stack.pop("aksi");
                    stack.push("variabel");
                    stack.push("operator");
                    stack.push("variabel")
                    stack.push("=");
                    stack.push("variabel");
                }
		else if (symbol==="print"){
		    stack.pop("aksi");
		    stack.push("variabel");
		    stack.push("print");
		}
                else {
                    state = "error";
                }
                break;
            case "variabel":
                if (symbol === "x") {
                    stack.pop("variabel");
                    stack.push("x")
                } 
                else if (symbol === "y") {
                    stack.pop("variabel");
                    stack.push("y");
                }
                else {
                    state = "error";
                }
                break;
            case "comparator":
                if (symbol === "is") {
                    stack.pop("comparator");
                    stack.push("is");
                }
                else if (symbol === "in") {
                    stack.pop("comparator");
                    stack.push("in");
                }
                else if (symbol === "!=") {
                    stack.pop("comparator");
                    stack.push("!=");
                }
                else if (symbol === "==") {
                    stack.pop("comparator");
                    stack.push("==");
                }
                else if (symbol === ">") {
                    stack.pop("variabel");
                    stack.push(">");
                }
                else if (symbol === ">=") {
                    stack.pop("comparator");
                    stack.push(">=");
                }
                else if (symbol === "<") {
                    stack.pop("comparator");
                    stack.push("<");
                }
                else if (symbol === "<=") {
                    stack.pop("comparator");
                    stack.push("<=");
                }
                else {
                    state = "error";
                }
                break;
            case "operator":
                if (symbol === "+") {
                    stack.pop("operator");
                    stack.push("+");
                }
                else if (symbol === "-") {
                    stack.pop("operator");
                    stack.push("-");
                }
                else if (symbol === "*") {
                    stack.pop("operator");
                    stack.push("*");
                }
                else if (symbol === "/") {
                    stack.pop("operator");
                    stack.push("/");
                }
                else if (symbol === "//") {
                    stack.pop("operator");
                    stack.push("//");
                }
                else if (symbol === "**") {
                    stack.pop("operator");
                    stack.push("**");
                }
                else {
                    state = "error";
                }
                break;
            case "while":
                if (symbol === "while") {
                    stack.pop("while");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case ":":
                if (symbol === ":") {
                    stack.pop(":");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "True":
                if (symbol === "True") {
                    stack.pop("True");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "False":
                if (symbol === "False") {
                    stack.pop("False");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "=":
                if (symbol === "=") {
                    stack.pop("=");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "x":
                if (symbol === "x") {
                    stack.pop("x");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "y":
                if (symbol === "y") {
                    stack.pop("y");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "is":
                if (symbol === "is") {
                    stack.pop("is");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "in":
                if (symbol === "in") {
                    stack.pop("in");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "==":
                if (symbol === "==") {
                    stack.pop("==");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "!=":
                if (symbol === "!=") {
                    stack.pop("!=");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case ">":
                if (symbol === ">") {
                    stack.pop(">");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case ">=":
                if (symbol === ">=") {
                    stack.pop(">=");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "<":
                if (symbol === "<") {
                    stack.pop("<");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "<=":
                if (symbol === "<=") {
                    stack.pop("<=");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "+":
                if (symbol === "+") {
                    stack.pop("+");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "-":
                if (symbol === "-") {
                    stack.pop("-");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "/":
                if (symbol === "/") {
                    stack.pop("/");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "//":
                if (symbol === "//") {
                    stack.pop("//");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "*":
                if (symbol === "*") {
                    stack.pop("*");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "**":
                if (symbol === "**") {
                    stack.pop("**");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
	    case "print":
                if (symbol === "print") {
                    stack.pop("print");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            default:
                state = "error";
                break;
        }
        topOfStack = stack.at(-1);
    }

    if (state !== "error") {
        stack.pop("#");
        state = "f";
    }

    if (state !== "f") {
        return false;
    }

    return true;
}

const submitButton = document.getElementById("submit")

let code = "";

submitButton.addEventListener("click", () => {
    code = document.getElementById("code").value;
    let lexicalValid = true;
    let codeSplitted = code.split(/\s+/g)
    if (codeSplitted.at(-1) === '') {
        codeSplitted.pop('')
    }
    console.warn(codeSplitted);

    codeSplitted.forEach(item => {
        if (lexicalAnalyzer(item) === false) {
            lexicalValid = false;
        }
    })

    let parseValid = parser(codeSplitted);


    if (lexicalValid && parseValid) {
        alert("Lexical Analyzer Result: All Valid\nParsing Result: Valid\nYour code run succesfully!");
    }
    else if (lexicalValid) {
        alert("Lexical Analyzer Result: Valid\nParsing Result: Not Valid\nPlease check the grammar!");
    } else {
        alert("Both Lexical Analyzer and Parser Result is Not Valid\nPlease check if there is any typo and check the grammar!");
    }
    
})
