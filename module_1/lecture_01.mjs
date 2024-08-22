import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));


printOut("Test");

const A = 3;
const B = 2;

let x = A+B;
printOut("verdien av x er " + x);

x = A*B;
printOut("verdien av x er " + x);
