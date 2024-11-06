"use strict";

/* function for simulate fetch data */
export function fetchData(aURL, aData) {
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
