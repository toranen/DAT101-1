"use strict";
/**
 * info: Create a new movie element class that extends HTMLElement (shadow DOM)
 * info: The class should have a constructor that sets the innerHTML to a movie template
 *
 */

export class MoviesElement extends HTMLElement {
  constructor() {
    super();
    // Set the innerHTML to a movie template
    this.shadow = this.attachShadow({ mode: "open" });
    const template = document.getElementById("movies-template");
    const content = template.content.cloneNode(true);
    this.shadow.appendChild(content);
    this.loadMovies();
  }

  async loadMovies() {
    const movies = await fetchData();
    this.renderMovies(movies);
  }

  renderMovies(movies) {
    const tbody =  this.shadow.getElementById("tbodyMovies");
    const movieTemplate = document.getElementById("movie-template");

    movies.forEach((movie) => {
      const movieElement = movieTemplate.content.cloneNode(true);
      movieElement.getElementById("tdTitle").textContent = movie.title;
      movieElement.getElementById("tdDirector").textContent = movie.director;
      movieElement.getElementById("tdYear").textContent = movie.year;
      movieElement.getElementById("tdGenre").textContent = movie.genre.join(", ");
      movieElement.getElementById("tdRating").textContent = movie.rating;
      tbody.appendChild(movieElement);
    });
    this.shadow.getElementById("tdNumberOfMovies").innerText = movies.length.toString();
  }
}

//Define the custom element
customElements.define("movies-element", MoviesElement);

/* function for simulate fetch data */
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(JSONMovies));
    }, 2000);
  });
}

const JSONMovies = `
[
  {
    "title": "The Shawshank Redemption",
    "director": "Frank Darabont",
    "year": 1994,
    "genre": ["Drama"],
    "rating": 9.3
  },
  {
    "title": "The Godfather",
    "director": "Francis Ford Coppola",
    "year": 1972,
    "genre": ["Crime", "Drama"],
    "rating": 9.2
  },
  {
    "title": "The Dark Knight",
    "director": "Christopher Nolan",
    "year": 2008,
    "genre": ["Action", "Crime", "Drama"],
    "rating": 9.0
  },
  {
    "title": "Schindler's List",
    "director": "Steven Spielberg",
    "year": 1993,
    "genre": ["Biography", "Drama", "History"],
    "rating": 8.9
  },
  {
    "title": "The Lord of the Rings: The Return of the King",
    "director": "Peter Jackson",
    "year": 2003,
    "genre": ["Adventure", "Drama", "Fantasy"],
    "rating": 8.9
  },
  {
    "title": "Pulp Fiction",
    "director": "Quentin Tarantino",
    "year": 1994,
    "genre": ["Crime", "Drama"],
    "rating": 8.9
  },
  {
    "title": "Fight Club",
    "director": "David Fincher",
    "year": 1999,
    "genre": ["Drama"],
    "rating": 8.8
  },
  {
    "title": "Forrest Gump",
    "director": "Robert Zemeckis",
    "year": 1994,
    "genre": ["Drama", "Romance"],
    "rating": 8.8
  },
  {
    "title": "Inception",
    "director": "Christopher Nolan",
    "year": 2010,
    "genre": ["Action", "Adventure", "Sci-Fi"],
    "rating": 8.8
  },
  {
    "title": "The Matrix",
    "director": "Lana Wachowski, Lilly Wachowski",
    "year": 1999,
    "genre": ["Action", "Sci-Fi"],
    "rating": 8.7
  }
]
`;
