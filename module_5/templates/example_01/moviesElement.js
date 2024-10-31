"use strict";
/*
  This class is a custom element that will render a list of movies.
*/
class MoviesElement extends HTMLElement {
  #shadow;
  #movies = [];
  #genres = [];
  #selectedMovie = null;
  // Remember the last sorted column (reversed order if clicked twice)
  #lastSortedColumn = EMoveColumns.None;

  //Private html fields for editing movie
  #inpTitle = null;
  #inpDirector = null;
  #inpYear = null;
  #inpGenre = null;
  #inpRating = null;
  #selGenre = null;

  constructor() {
    super();
    // Set the innerHTML to a movie template
    this.#shadow = this.attachShadow({ mode: "open" });
    const template = document.getElementById("movies-template");
    const content = template.content.cloneNode(true);
    this.#shadow.appendChild(content);
    // Get the input fields
    this.#inpTitle = this.#shadow.getElementById("inpTitle");
    this.#inpDirector = this.#shadow.getElementById("inpDirector");
    this.#inpYear = this.#shadow.getElementById("inpYear");
    this.#inpGenre = this.#shadow.getElementById("inpGenre");
    this.#inpRating = this.#shadow.getElementById("inpRating");
    this.#selGenre = this.#shadow.getElementById("selGenre");

    // Add event listener for sorting movies
    this.#shadow.getElementById("thTitle").addEventListener("click", () => this.#sortMovies(EMoveColumns.Title));
    this.#shadow.getElementById("thDirector").addEventListener("click", () => this.#sortMovies(EMoveColumns.Director));
    this.#shadow.getElementById("thYear").addEventListener("click", () => this.#sortMovies(EMoveColumns.Year));
    this.#shadow.getElementById("thGenre").addEventListener("click", () => this.#sortMovies(EMoveColumns.Genre));
    this.#shadow.getElementById("thRating").addEventListener("click", () => this.#sortMovies(EMoveColumns.Rating));

    // Add event listener for saving movie
    this.#shadow.getElementById("btnSaveMovie").addEventListener("click", this.#saveMovie.bind(this));

    // Add event for adding movie genre
    this.#shadow.getElementById("btnAddGenre").addEventListener("click", this.#addSelGenre.bind(this));
    // Load movies
    this.#loadMovies();
  }

  #loadMovies = async () => {
    const jsonMovies = await fetchData("movies", null);
    jsonMovies.forEach((aJSONMovie) => {
      const movie = new MovieItem(aJSONMovie.movieID, aJSONMovie.title, aJSONMovie.director, aJSONMovie.year, aJSONMovie.genre, aJSONMovie.rating);
      this.#movies.push(movie);
    });
    this.#renderMovies();
  };

  #renderMovies = () => {
    const tbody = this.#shadow.getElementById("tbodyMovies");
    /* Clear the table */
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }

    const movieTemplate = document.getElementById("movie-template");

    this.#movies.forEach((aMovie) => {
      const movieElement = movieTemplate.content.cloneNode(true);
      const movieID = aMovie.movieID;
      let element = movieElement.getElementById("tdTitle");
      element.textContent = aMovie.title;
      element.id += "_" + movieID;
      // do the same for the rest...
      element = movieElement.getElementById("tdDirector");
      element.textContent = aMovie.director;
      element.id += "_" + movieID;
      element = movieElement.getElementById("tdYear");
      element.textContent = aMovie.year;
      element.id += "_" + movieID;
      element = movieElement.getElementById("tdGenre");
      element.textContent = aMovie.genre.join(", ");
      element.id += "_" + movieID;
      element = movieElement.getElementById("tdRating");
      element.textContent = aMovie.rating;
      element.id += "_" + movieID;
      element = movieElement.getElementById("btnEditMovie");
      element.id += "_" + movieID;
      element.addEventListener("click", this.#editMovie.bind(this, movieID));
      element = movieElement.getElementById("btnDeleteMovie");
      element.id += "_" + movieID;
      element.addEventListener("click", this.#deleteMovie.bind(this, movieID));

      tbody.appendChild(movieElement);
    });
    this.#shadow.getElementById("tdNumberOfMovies").innerText = this.#movies.length.toString();
  };

  /* Sort movies by column */
  #sortMovies = (aColumn) => {
    if (this.#lastSortedColumn === aColumn) {
      this.#movies.reverse();
      this.#lastSortedColumn = EMoveColumns.None;
    } else {
      this.#movies.sort((a, b) => {
        switch (aColumn) {
          case EMoveColumns.Title:
            return a.title.localeCompare(b.title);
          case EMoveColumns.Director:
            return a.director.localeCompare(b.director);
          case EMoveColumns.Year:
            return a.year - b.year;
          case EMoveColumns.Genre:
            return a.genre.join("").localeCompare(b.genre.join(""));
          case EMoveColumns.Rating:
            return a.rating - b.rating;
          default:
            return 0;
        }
      });
      this.#lastSortedColumn = aColumn;
    }
    this.#renderMovies();
  };

  #editMovie = (aMovieID) => {
    const movie = (this.#selectedMovie = this.#movies.find((aMovie) => aMovie.movieID === aMovieID));
    this.#inpTitle.value = movie.title;
    this.#inpDirector.value = movie.director;
    this.#inpYear.value = movie.year;
    this.#inpGenre.innerText = movie.genre.join(", ");
    this.#inpRating.value = movie.rating;
    this.#genres = movie.genre;
  };

  #saveMovie = () => {
    if (this.#selectedMovie) {
      this.#selectedMovie.title = this.#inpTitle.value;
      this.#selectedMovie.director = this.#inpDirector.value;
      this.#selectedMovie.year = this.#inpYear.value;
      this.#selectedMovie.genre = this.#inpGenre.innerText.split(", ");
      this.#selectedMovie.rating = this.#inpRating.value;
      this.#renderMovies();
    } else {
      const newMovie = new MovieItem(0, this.#inpTitle.value, this.#inpDirector.value, this.#inpYear.value, this.#genres, this.#inpRating.value);
      fetchData("newMovie", newMovie).then((aNewMovie) => {
        this.#movies.push(aNewMovie);
        this.#renderMovies();
      });
    }

    // Clear the form
    this.#inpTitle.value = "";
    this.#inpDirector.value = "";
    this.#inpYear.value = "";
    this.#inpGenre.innerText = "";
    this.#inpRating.value = "";
    this.#genres = [];
    // Clear the selected movie
    this.#selectedMovie = null;
  };

  #deleteMovie = async (aMovieID) => {
    // simulate delete movie from server
    const movieID = await fetchData("deleteMovie", aMovieID);
    if(movieID === aMovieID) {
      this.#movies = this.#movies.filter((aMovie) => aMovie.movieID !== aMovieID);
      this.#renderMovies();    
    }
  }

  #addSelGenre = () => {
    const inpGenre = this.#inpGenre; // span element
    const addGenre = this.#selGenre.value;
    // if genre is not present, add it. If it is present, remove it
    if (!this.#genres.includes(addGenre)) {
      this.#genres.push(addGenre);
    } else {
      this.#genres = this.#genres.filter((aGenre) => aGenre !== addGenre);
    }
    inpGenre.innerText = this.#genres.join(", ");
  };
}

/* Enumeration for movie columns (sort by click) */
const EMoveColumns = { None: 0, Title: 1, Director: 2, Year: 3, Genre: 4, Rating: 5 };

/* This Class is a movie item class */
class MovieItem {
  constructor(aMovieID, aTitle, aDirector, aYear, aGenre, aRating) {
    this.movieID = aMovieID;
    this.title = aTitle;
    this.director = aDirector;
    this.year = aYear;
    this.genre = aGenre;
    this.rating = aRating;
  }
}

//Define the custom element
customElements.define("movies-element", MoviesElement);

/*
The part below is just for testing purposes.
It is simulating server side data fetching.
*/

/* function for simulate fetch data */
function fetchData(aURL, aData) {
  switch (aURL) {
    case "movies":
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(JSON.parse(JSONMovies));
        }, 2000);
      });
    case "newMovie":
      return new Promise((resolve) => {
        setTimeout(() => {
          //Get max movieID
          let newMovieID = 0;
          const movies = JSON.parse(JSONMovies);
          movies.forEach((aMovie) => {
            if (aMovie.movieID > newMovieID) {
              newMovieID = aMovie.movieID;
            }
          });
          const newMovie = {
            movieID: newMovieID + 1,
            title: aData.title,
            director: aData.director,
            year: aData.year,
            genre: aData.genre,
            rating: aData.rating,
          };
          movies.push(newMovie);
          //update JSONMovies
          JSONMovies = JSON.stringify(movies);
          resolve(newMovie);
        }, 2000);
      });
      case "deleteMovie":
        return new Promise((resolve) => {
          setTimeout(() => {
            // Find the movie by movieID and remove it from JSONMovies
            const movies = JSON.parse(JSONMovies);
            const newMovies = movies.filter((aMovie) => aMovie.movieID !== aData);
            JSONMovies = JSON.stringify(newMovies);
            //return the deleted movieID
            resolve(aData);
          }, 2000);
        });
    default:
      // simulate client request error
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject("Error: URL not found");
        }, 2000);
      });
  }
}

/* JSON data for movies */
let JSONMovies = `
[
  {
    "movieID": 1,
    "title": "The Shawshank Redemption",
    "director": "Frank Darabont",
    "year": 1994,
    "genre": ["Drama"],
    "rating": 9.3
  },
  {
    "movieID": 2,
    "title": "The Godfather",
    "director": "Francis Ford Coppola",
    "year": 1972,
    "genre": ["Kriminalitet", "Drama"], 
    "rating": 9.2
  },
  {
    "movieID": 3,
    "title": "The Dark Knight",
    "director": "Christopher Nolan",
    "year": 2008,
    "genre": ["Action", "Kriminalitet", "Drama"],
    "rating": 9.0
  },
  {
    "movieID": 4,
    "title": "Schindler's List",
    "director": "Steven Spielberg",
    "year": 1993,
    "genre": ["Biografi", "Drama", "Historie"], 
    "rating": 8.9
  },
  {
    "movieID": 5,
    "title": "The Lord of the Rings: The Return of the King",
    "director": "Peter Jackson",
    "year": 2003,
    "genre": ["Eventyr", "Drama", "Fantasy"], 
    "rating": 8.9
  },
  {
    "moveID": 6,
    "title": "Pulp Fiction",
    "director": "Quentin Tarantino",
    "year": 1994,
    "genre": ["Kriminalitet", "Drama"], 
    "rating": 8.9
  },
  {
    "movieID": 7,
    "title": "Fight Club",
    "director": "David Fincher",
    "year": 1999,
    "genre": ["Drama"],
    "rating": 8.8
  },
  {
    "movieID": 8,
    "title": "Forrest Gump",
    "director": "Robert Zemeckis",
    "year": 1994,
    "genre": ["Drama", "Romantikk"], 
    "rating": 8.8
  },
  {
    "movieID": 9,
    "title": "Inception",
    "director": "Christopher Nolan",
    "year": 2010,
    "genre": ["Action", "Eventyr", "Sci-Fi"], 
    "rating": 8.8
  },
  {
    "movieID": 10,
    "title": "The Matrix",
    "director": "Lana Wachowski, Lilly Wachowski",
    "year": 1999,
    "genre": ["Action", "Sci-Fi"],
    "rating": 8.7
  }
]
`;
