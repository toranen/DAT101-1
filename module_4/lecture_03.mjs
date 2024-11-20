import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

/*
This is a lecture in arrays and objects.
*/

class TMovie {
  constructor(title, rating) {
    this.title = title;
    this.rating = rating;
  }
}

//            0  1  2  3  4
const test = [1, 2, 3, 4, 5];

const movies = [];

function printMovies() {
  // iterate over the array
  for (let index = 0; index < movies.length; index++) {
    const movie = movies[index];
    printOut(movie.title + " " + movie.rating);
    printOut(""); // new line
  }
}

movies.push(new TMovie("The Shawshank Redemption", 9.8));
printMovies();
movies.push(new TMovie("The Godfather", 9.2));
printMovies();
