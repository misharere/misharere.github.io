const FILM_COVERS = [
  "https://i.imgur.com/ckTo08U.jpg",
  "https://i.imgur.com/y3n9xeI.jpg",
  "https://i.imgur.com/mue1y0c.jpg",
  "https://i.imgur.com/Ywdz517.jpg",
  "https://i.imgur.com/xWjYM5T.jpg",
  "https://i.imgur.com/Hb5BRRZ.jpg",
  "https://i.imgur.com/qKsb0V9.jpg",
];



class Movies {
  data;
  filmsDisplay = localStorage.getItem("display") || "films-column";
  filmsSort = localStorage.getItem("sort") || "EpisodeAsc";

  constructor(target) {
    this.target = target;
    this.covers = FILM_COVERS;
    this.getData();
  }

  async getData() {
    const response = await fetch(
      `https://desfarik.github.io/star-wars/api/film/all.json`
    );
    this.data = await response.json();
    await this.renderMovies(this.moviesSortByAscending(this.data));
    await console.log(this.data);
  }

  renderMovies(array) {
    console.log(array);
    let html = "";
    array.forEach((element) => {
      html += `
        <div class="films-container">
          <div class="film" onClick="movies.filmPage(${element.id})">
            <img class="banner" src="${this.covers[element.episode_id - 1]}" />
            <p class="release">Release date: ${element.release_date}</p>
            <p class="title">${element.title}</p>
            <p class="description">Star Wars. Episode ${element.episode_id}</p>
          </div>
        </div>
        `;
    });
    this.target.innerHTML = html;
    this.target.classList.add(this.filmsDisplay); // добавить динамический
  }

  dataCopy(array) {
    let arrayCopy = array.map((element) => element);
    console.log(array === arrayCopy);
    return arrayCopy;
  }

  moviesSortByAscending() {
    let dataCopied;
    dataCopied = this.dataCopy(this.data);
    this.renderMovies(
      dataCopied.sort((a, b) => (a.episode_id > b.episode_id ? 1 : -1))
    );
  }

  moviesSortByDescending() {
    let dataCopied;
    dataCopied = this.dataCopy(this.data);
    this.renderMovies(
      dataCopied.sort((a, b) => (a.episode_id > b.episode_id ? -1 : 1))
    );
  }

  moviesSortDefault() {
    this.renderMovies(this.data);
  }

  sortBy(param) {
    if (param === "Date") {
      console.log(this.data);
      this.moviesSortDefault();
      localStorage.setItem("sort", param);
    } else if (param === "EpisodeAsc") {
      this.moviesSortByAscending();
      localStorage.setItem("sort", param);
    } else if (param === "EpisodeDesc") {
      this.moviesSortByDescending();
      localStorage.setItem("sort", param);
    }
  }

  switchDisplay(param) {
    const target = document.querySelector(".films");
    console.log(param);
    if (param === "row") {
      target.classList.add("films-row");
      target.classList.remove("films-column");
      localStorage.setItem("display", "films-row");
      this.filmsDisplay = "films-row";
    } else if (param === "column") {
      target.classList.add("films-column");
      target.classList.remove("films-row");
      localStorage.setItem("display", "films-column");
      this.filmsDisplay = "films-column";
    }
  }

  filmPage(id) {
    window.location = `./movie.html?id=${id}`;
  }
}



class Movie {
  data;
  cast;
  castTarget = document.querySelector(".cast");

  constructor(target) {
    this.id = id;
    this.target = target;
    this.covers = FILM_COVERS;
    this.getData();
  }

  async getData() {
    if (id !== null) {
      const response = await fetch(
        `https://desfarik.github.io/star-wars/api/film/${this.id}.json`
      );
      this.data = await response.json();
      await this.renderMovies(this.data);
      await console.log(this.data);
      document.title = this.data.title;
    } else {
      window.location = `./index.html`;
    }
  }

  async getCastData() {
    const response = await fetch(
      `https://desfarik.github.io/star-wars/api/people/all.json`
    );
    this.cast = await response.json();
    return this.cast;
  }

  objFilter(array, param) {
    let filtered = param.filter((elem) => array.includes(elem.id));
    return filtered;
  }

  renderMovies(obj) {
    console.log(obj);
    let html = "";
    html += `
        <div class="film-container">
            <p class="film-title">Star Wars: ${obj.title}</p>
            <div class="film-elem">
              <div class="film-elem-image">
                <img class="film-image" src="${
                  this.covers[obj.episode_id - 1]
                }" />
              </div>
              <p class="film-desc">${obj.opening_crawl}<p>
            </div>
            <div class="film-authors">
              <p class="film-release">Release date: ${obj.release_date}</p>
              <p class="film-director">Director: ${obj.director}</p>
              <p class="film-producer">Produced by: ${obj.producer}</p>
            </div>
            <p class="cast-title">Show cast 
              <span class="material-symbols-outlined" id="cast-switch" onClick="movie.showCast()">visibility_off</span>
            </p>
        </div>
      `;
    this.target.innerHTML = html;
    this.renderCast(obj.characters);
  }

  async renderCast(array) {
    console.log(123);
    let allCharacters = await this.getCastData();
    let characters = await array.map((e) => +Number(e));
    let movieCast = await this.objFilter(characters, this.cast);
    let html = "";
    await movieCast.forEach((elem) => {
      html += `
        <div class="cast-container">
          <div class="cast-pic-container" onClick="movie.openWindow(${elem.id})">
            <img class="cast-pic" src="${elem.image}" alt="${elem.name}" />
          </div>
          <p class="cast-name">${elem.name}</p>
        </div>
      `;
    });
    this.castTarget.innerHTML = html;
  }

  dataCopy(array) {
    let arrayCopy = array.map((element) => element);
    console.log(array === arrayCopy);
    return arrayCopy;
  }

  openWindow(id) {
    window.location = `./person.html?id=${id}`;
  }

  showCast() {
    let target = document.querySelector(".cast");
    let switchTarget = document.querySelector("#cast-switch");
    target.classList.remove("hidden");
    switchTarget.setAttribute("onClick", "movie.hideCast()");
    switchTarget.textContent = "visibility";
  }

  hideCast() {
    let target = document.querySelector(".cast");
    let switchTarget = document.querySelector("#cast-switch");
    target.classList.add("hidden");
    switchTarget.setAttribute("onClick", "movie.showCast()");
    switchTarget.textContent = "visibility_off";
  }
}



class Person extends Movie {
  movies;
  moviesTarget = document.querySelector(".cast");

  async getData() {
    if (id !== null) {
      const response = await fetch(
        `https://desfarik.github.io/star-wars/api/people/${this.id}.json`
      );
      this.data = await response.json();
      await this.renderPerson(this.data);
      await console.log(this.data);
      document.title = this.data.name;
    } else {
      window.location = `./index.html`;
    }
  }

  async getMovieData() {
    const response = await fetch(
      `https://desfarik.github.io/star-wars/api/film/all.json`
    );
    this.movies = await response.json();
    return this.movies;
  }

  renderPerson(obj) {
    console.log(obj);
    let html = "";
    html += `
      <div class="person-container">
        <p class="person-title">${obj.name}</p>
        <div class="person-params">
            <div class="person-image-container">
                <img class="film-image" src="${obj.image}" /> 
            </div>
            <div class="person-info">
                <p class="film-release">Birth date: ${obj.birth_year}</p>
                <p class="film-release">Birth location: ${obj.bornLocation}</p>
                <p class="film-release">Species: ${obj.species}</p>
                <p class="film-release">Gender: ${obj.gender}</p>
                <p class="film-release">Height: ${obj.height}</p>
                <p class="film-release">Mass: ${obj.mass}</p>
                <p class="film-release">Eye color: ${obj.eye_color}</p>
                <p class="film-release">Hair color: ${obj.hair_color}</p>
                <p class="film-release">Skin color: ${obj.skin_color}</p>
            </div>
        </div>
        <div class="person-films-title">APPEARS IN FILMS</div>
        <div class="person-films">

        </div>
      </div>
    `;
    this.target.innerHTML = html;
    this.renderMovies(obj.films);
  }

  async renderMovies(array) {
    let allMovies = await this.getMovieData();
    let characters = await array.map((e) => +Number(e));
    let personMovies = await this.objFilter(characters, this.movies);
    let html = "";
    await personMovies.forEach((elem) => {
      console.log(elem);
      html += `
        <div class="cast-container">
        <div class="cast-pic-container" onClick="person.openWindow(${elem.id})">
            <img class="cast-pic" src="${
              this.covers[elem.episode_id - 1]
            }" alt="${elem.title}" />
        </div>
            <p class="cast-name">${elem.title}</p>
        </div>
        `;
    });
    this.moviesTarget.innerHTML = html;
  }

  dataCopy(array) {
    let arrayCopy = array.map((element) => element);
    console.log(array === arrayCopy);
    return arrayCopy;
  }

  openWindow(id) {
    window.location = `./movie.html?id=${id}`;
  }
}
