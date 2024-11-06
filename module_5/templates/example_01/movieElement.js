// @ts-nocheck
"use strict";

export class MovieElement extends HTMLElement {
  #shadow;
  #movieID;
  #tdTitle;
  #tdDirector;
  #tdYear;
  #tdGenre;
  #tdRating;
  #trElement;

  // constructor
  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });

    // Add Bootstrap CSS to shadow DOM
    const bootstrapLink = document.createElement("link");
    bootstrapLink.rel = "stylesheet";
    bootstrapLink.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css";
    this.#shadow.appendChild(bootstrapLink);

    const bootstrapIconsLink = document.createElement("link");
    bootstrapIconsLink.rel = "stylesheet";
    bootstrapIconsLink.href = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css";
    this.#shadow.appendChild(bootstrapIconsLink);

    const template = document.getElementById("movie-template");
    const movieElement = template.content.cloneNode(true);
    this.#tdTitle = movieElement.getElementById("tdTitle");
    this.#tdTitle.id = ""; // clear the id
    this.#tdDirector = movieElement.getElementById("tdDirector");
    this.#tdDirector.id = ""; // clear the id
    this.#tdYear = movieElement.getElementById("tdYear");
    this.#tdYear.id = ""; // clear the id
    this.#tdGenre = movieElement.getElementById("tdGenre");
    this.#tdGenre.id = ""; // clear the id
    this.#tdRating = movieElement.getElementById("tdRating");
    this.#tdRating.id = ""; // clear the id
    // Only append the tr element
    this.#trElement = movieElement.querySelector("tr");
    this.#shadow.appendChild(this.#trElement);
  }

  get movieID() {
    return this.#movieID;
  }

  get title() {
    return this.#tdTitle.innerText;
  }

  get director() {
    return this.#tdDirector.innerText;
  }

  get year() {
    return parseInt(this.#tdYear.innerText);
  }

  get genre() {
    return this.#tdGenre.innerText.split(",");
  }

  get rating() {
    return parseFloat(this.#tdRating.innerText);
  }

  // setter for movie property
  set data({ title, director, year, genre, rating }) {
    this.#tdTitle.innerText = title;
    this.#tdDirector.innerText = director;
    this.#tdYear.innerText = year.toString();
    this.#tdGenre.innerText = genre.join(", ");
    this.#tdRating.innerText = rating.toString();
  }

  get tr() {
    return this.#shadow.querySelector("tr");
  }
}
