"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/*
Part 1: Array Creation & Traversal (5 points)
Create an array where you hard-code all the numbers from 1 to 20.
Use a for loop to "run through" the array and print all the elements in the array.
*/
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let text = "";
for(let index = 0; index < numbers.length; index++){
  text += numbers[index] + " ";
}

printOut(text);
printOut("");

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/*
Part 2: Array Joining (5 points)
Take the array from task 1 and use a built-in method found in the array object,
to print all the elements with a custom defined character separating all the elements.
*/

printOut(numbers.join(", "))
printOut("");

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/*
Part 3: String to Array & Traversal (10 points)
Create a constant that contains the text "Hei på deg, hvordan har du det?" (Hello there, how are you?)
Take this text and convert it into an array that contains all the words in the text,
i.e., each element should contain only one word from the text.
Use a loop to traverse (run through) this array so that you can print which word number,
which index the word is at, and the word itself.
*/
const grating = "Hei på deg, hvordan har du det?";
const words = grating.split(" ");

words.every(everyWord);
function everyWord(aWord, aIndex){
  printOut(aIndex + " " + (aIndex + 1) + " " + aWord);
  return true;
}

printOut("");

words.forEach(eachWord);
function eachWord(aWord, aIndex){
  printOut(aIndex + " " + (aIndex + 1) + " " + aWord);
}


printOut("");

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
const girls = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];

function removeFromArray(aArray, aItem){
  const result = aArray.indexOf(aItem);
  if(result > -1){
    printOut("Can remove " + " " + aItem + " from array");
    aArray.splice(result, 1);
  }else{
    printOut("Can not remove " + " " + aItem + " from array");
  }
}

function findAndRemoveFromArray(aArray, aItem){
  let index = -1;
  const result = aArray.find(findName);
  if(result){
    printOut("Can remove " + " " + aItem + " from array");
    aArray.splice(index, 1);
  }else{
    printOut("Can not remove " + " " + aItem + " from array");
  }

  function findName(aName, aIndex){
    index = aIndex;
    return aName === aItem;
  }
}

removeFromArray(girls, "Arne");
findAndRemoveFromArray(girls, "Ingrid");
printOut(girls.join(", "));

printOut(newLine);
printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
const boys = ["Jakob", "Lucas", "Emil", "Oskar", "Oliver", "William", "Filip", "Noah", "Elias", "Isak", "Henrik", "Aksel", "Kasper", "Mathias", "Jonas", "Tobias", "Liam", "Håkon", "Theodor", "Magnus"];
//const names = [...girls, ...boys];
const names = girls.concat(boys);
names.forEach(printName);
function printName(aName){
  printOut(aName);
}

printOut(newLine);
printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
class TBook{
  #Tile;
  #Author;
  #ISBN;
  constructor(aTile, aAuthor, aISBN){
    this.#Tile = aTile;
    this.#Author = aAuthor;
    this.#ISBN = aISBN;
  }

  toString(){
    return this.#Tile + ", " + this.#Author + ", " + this.#ISBN;
  }
}
//Create an array that contains three instances of the TBook class from different authors.
const books = [
  new TBook("The Hobbit", "J.R.R. Tolkien", "978-0-395-07122-1"),
  new TBook("The Shining", "Stephen King", "978-0-385-12167-5"),
  new TBook("The Da Vinci Code", "Dan Brown", "978-0-385-50420-5")
];

books.forEach(printBook);
function printBook(aBook){
  printOut(aBook.toString());
}

printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
const EWeekDays = {
  WeekDay1: { value: 0x01, name: "Mandag" },
  WeekDay2: { value: 0x02, name: "Tirsdag" },
  WeekDay3: { value: 0x04, name: "Onsdag" },
  WeekDay4: { value: 0x08, name: "Torsdag" },
  WeekDay5: { value: 0x10, name: "Fredag" },
  WeekDay6: { value: 0x20, name: "Lørdag"},
  WeekDay7: { value: 0x40, name: "Søndag", type: "Helligdag" },
  Workdays: { value: 0x01 + 0x02 + 0x04 + 0x08 + 0x10, name: "Arbeidsdager" },
  Weekends: { value: 0x20 + 0x40, name: "Helg" },
};

const keys = Object.keys(EWeekDays); //Dette gir oss alle nøklene i objektet EWeekDays
printOut("Keys: " + keys.join(", ")); // Her printer vi ut alle nøklene i objektet EWeekDays
const values = Object.values(EWeekDays); //Dette gir oss alle verdiene i objektet EWeekDays
printOut("Values: " + values.join(", ")); // Her printer vi ut alle verdiene i objektet EWeekDays
let valueKeys = Object.values(EWeekDays[keys[7]]); //Her ser vi på verdien til nøkkelen Workdays (7)
printOut("ValueKeys: " + valueKeys.join(", ")); // Her printer vi ut verdien til nøkkelen Workdays (7)

//Vi går igjennom alle nøklene til objektet EWeekDays
for(let index = 0; index < keys.length; index++){
  //Vi henter ut navnet på nøkkelen (f.eks. WeekDay1)
  const key = keys[index];
  printOut(key);
  //TODO: Skriv ut alle nøklene og verdiene til nøklene
  
  for(let i = 0; i < keys.length; i++){
    
  }
  //Vi henter ut alle verdiene til nøkkelen (f.eks. 0x01, Mandag)
  valueKeys = Object.values(EWeekDays[keys[index]]);
  //Vi printer ut nøkkelen og verdiene til nøkkelen
  printOut(key + " = " + valueKeys.join(", "));
}
printOut(newLine);



printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);

/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/
printOut("Replace this with you answer!");
printOut(newLine);
