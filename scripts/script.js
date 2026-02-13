// const ans = document.getElementById("ans");
// let exp = [];

// function Cleardisplay() {
//     ans.value = "";
//     exp = [];
// }

// function addtodisplay(num) {
//     if (num == "leftpara"){ exp.push("("); ans.value += "(";}
//     else if (num == "rightpara"){ exp.push(")"); ans.value += ")";}
//     else {
//         exp.push(num);
//         ans.value += num;
//     }
// }

// function calculate() {
//     try {
//         console.log(exp);
//         ans.value = eval(exp.join(""));
//         exp = ans.value.split("");
//         console.log(exp);
//     } catch (Error) {
//         ans.value = "Invalid Expression";
//     }
// }

// function removeone() {
//     exp.pop();
//     ans.value = exp.join("");
// }




const allcalculator = {
    isvalidnum: function (num) {
        return !isNaN(num) && isFinite(num);
    },

    degToRad: function (degrees) {
        return degrees * (Math.PI / 180);
    },

    formatResult: function (num) {
        if (!this.isvalidnum(num)) return "Error";
        return Math.round(num * 10000000000) / 10000000000;
    }
};



class Calculator {
    constructor() {
        this.curexp = [];

        this.display = document.getElementById("ans");
    }


    clearDisplay() {
        this.curexp = [];
        this.display.value = "";
    }

    addToDisplay(value) {

        if (value === "leftpara") {
            this.curexp.push("(");
            this.display.value += "(";
        }
        else if (value === "rightpara") {
            this.curexp.push(")");
            this.display.value += ")";
        }
        else {
            this.curexp.push(value);
            this.display.value += value;
        }
    }

    removeOne() {
        this.curexp.pop();
        this.display.value = this.curexp.join("");
    }


    square() {
        try {
            const curval = this.getcurval();
            const result = Math.pow(curval, 2);
            this.displayResult(result);
        } catch (error) {
            this.handleError("Invalid Input");
        }
    }

    squareRoot() {
        try {
            const curval = this.getcurval();

            if (curval < 0) {
                this.handleError("Invalid Input");
                return;
            }

            const result = Math.sqrt(curval);
            this.displayResult(result);
        } catch (error) {
            this.handleError("Invalid Input");
        }
    }

    addPower() {
        this.curexp.push("**");
        this.display.value += "^";
    }

    tenPower() {
        try {
            const curval = this.getcurval();
            const result = Math.pow(10, curval);
            this.displayResult(result);
        } catch (error) {
            this.handleError("Invalid Input");
        }
    }

    reciprocal() {
        try {
            const curval = this.getcurval();

            if (curval === 0) {
                this.handleError("Cannot divide by zero");
                return;
            }

            const result = 1 / curval;
            this.displayResult(result);
        } catch (error) {
            this.handleError("Invalid Input");
        }
    }

    absolute() {
        try {
            const curval = this.getcurval();
            const result = Math.abs(curval);
            this.displayResult(result);
        } catch (error) {
            this.handleError("Invalid Input");
        }
    }

    factorial() {
        try {
            const curval = this.getcurval();

            if (curval < 0 || !Number.isInteger(curval)) {
                this.handleError("Invalid Input");
                return;
            }

            if (curval > 170) {
                this.handleError("Number too large");
                return;
            }

            let result = 1;
            for (let i = 2; i <= curval; i++) {
                result *= i;
            }

            this.displayResult(result);
        } catch (error) {
            this.handleError("Invalid Input");
        }
    }

    exponential() {
        try {
            const curval = this.getcurval();
            const result = Math.exp(curval);
            this.displayResult(result);
        } catch (error) {
            this.handleError("Invalid Input");
        }
    }

    addModulo() {
        this.curexp.push("%");
        this.display.value += "%";
    }

    logarithm() {
        try {
            const curval = this.getcurval();

            if (curval <= 0) {
                this.handleError("Invalid Input");
                return;
            }

            const result = Math.log10(curval);
            this.displayResult(result);
        } catch (error) {
            this.handleError("Invalid Input");
        }
    }

    naturalLog() {
        try {
            const curval = this.getcurval();

            if (curval <= 0) {
                this.handleError("Invalid Input");
                return;
            }

            const result = Math.log(curval);
            this.displayResult(result);
        } catch (error) {
            this.handleError("Invalid Input");
        }
    }


    sine() {
        try {
            const curval = this.getcurval();

            const radians = allcalculator.degToRad(curval);

            const result = Math.sin(radians);
            this.displayResult(result);
        } catch (error) {
            this.handleError("Invalid Input");
        }
    }

    cos() {
        try {
            const curval = this.getcurval();

            const radians = allcalculator.degToRad(curval);

            const result = Math.cos(radians);
            this.displayResult(result);
        } catch (error) {
            this.handleError("Invalid Input");
        }
    }

    tan() {
        try {
            const curval = this.getcurval();

            const radians = allcalculator.degToRad(curval);

            const result = Math.tan(radians);
            this.displayResult(result);
        } catch (error) {
            this.handleError("Invalid Input");
        }
    }


    addPi() {
        this.curexp.push(Math.PI.toString());
        this.display.value += "π";
    }

    addE() {
        this.curexp.push(Math.E.toString());
        this.display.value += "e";
    }

    toggleSign() {
        try {
            const curval = this.getcurval();
            const result = -curval;
            this.displayResult(result);
        } catch (error) {
            this.handleError("Invalid Input");
        }
    }


    calculate() {
        try {
            const exp = this.curexp.join("");

            if (exp === "") {
                return;
            }

            const result = eval(exp);

            if (!allcalculator.isvalidnum(result)) {
                this.handleError("Invalid Expression");
                return;
            }

            const formresult = allcalculator.formatResult(result);
            this.display.value = formresult;

            this.curexp = formresult.toString().split("");

            // console.log("Result:", formresult);
        } catch (error) {
            console.error("Calculation error:", error);
            this.handleError("Invalid Expression");
        }
    }

    getcurval() {
        const exp = this.curexp.join("");

        if (exp === "") {
            throw new Error("No value to calculate");
        }

        const value = eval(exp);

        if (!allcalculator.isvalidnum(value)) {
            throw new Error("Invalid value");
        }

        return value;
    }

    displayResult(result) {
        const formatted = allcalculator.formatResult(result);
        this.display.value = formatted;
        this.curexp = formatted.toString().split("");
    }

    handleError(message) {
        this.display.value = message;
        setTimeout(() => {
            this.clearDisplay();
        }, 2000);
    }



    init() {
        document.getElementById("clear").onclick = () => this.clearDisplay();
        document.getElementById("backspace").onclick = () => this.removeOne();
        document.getElementById("equal").onclick = () => this.calculate();

        document.getElementById("x2").onclick = () => this.square();
        document.getElementById("squareroot").onclick = () => this.squareRoot();
        document.getElementById("square").onclick = () => this.addPower();
        document.getElementById("tensquare").onclick = () => this.tenPower();
        document.getElementById("1x").onclick = () => this.reciprocal();
        document.getElementById("x").onclick = () => this.absolute();
        document.getElementById("exp").onclick = () => this.exponential();
        document.getElementById("mod").onclick = () => this.addModulo();
        document.getElementById("log").onclick = () => this.logarithm();
        document.getElementById("in").onclick = () => this.naturalLog();
        document.getElementById("fact").onclick = () => this.factorial();

        document.getElementById("pi").onclick = () => this.addPi();
        document.getElementById("5e").onclick = () => this.addE();

        document.getElementById("negpos").onclick = () => this.toggleSign();

        document.getElementById("sin-btn").onclick = () => {
            this.sine();
        };

        document.getElementById("cos-btn").onclick = () => {
            this.cos();
        };

        document.getElementById("tan-btn").onclick = () => {
            this.tan();
        };

    }
}



const calculator = new Calculator();

calculator.init();

function Cleardisplay() {
    calculator.clearDisplay();
}

function addtodisplay(value) {
    calculator.addToDisplay(value);
}

function calculate() {
    calculator.calculate();
}

function removeone() {
    calculator.removeOne();
}