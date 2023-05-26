const FILM_COVERS = [
    'https://i.imgur.com/ckTo08U.jpg',
    'https://i.imgur.com/y3n9xeI.jpg',
    'https://i.imgur.com/mue1y0c.jpg',
    'https://i.imgur.com/Ywdz517.jpg',
    'https://i.imgur.com/xWjYM5T.jpg',
    'https://i.imgur.com/Hb5BRRZ.jpg',
    'https://i.imgur.com/qKsb0V9.jpg',
  ]

  class Movies {
    
    data;
    filmsDisplay = localStorage.getItem('display') || 'films-column';
    filmsSort = localStorage.getItem('sort') || 'EpisodeAsc';

    constructor(target) {
      this.target = target;
      this.covers = FILM_COVERS;
      this.getData();
    }

    async getData() {
      const response = await fetch(`https://desfarik.github.io/star-wars/api/film/all.json`);
      this.data = await response.json(); 
      await this.renderMovies(this.moviesSortByAscending(this.data));
      await console.log(this.data);
    }

    renderMovies(array) {
    console.log(array);
      let html = '';
      array.forEach(element => {
        html += `
        <div class="films-container">
          <div class="film" onClick="movies.filmPage(${element.id})">
            <img class="banner" src="${this.covers[element.episode_id-1]}" />
            <p class="release">Release date: ${element.release_date}</p>
            <p class="title">${element.title}</p>
            <p class="description">Star Wars. Episode ${element.episode_id}</p>
          </div>
        </div>
        `
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
      this.renderMovies(dataCopied.sort((a, b) => a.episode_id > b.episode_id ? 1 : -1));
    }

    moviesSortByDescending() {
      let dataCopied;
      dataCopied = this.dataCopy(this.data);
      this.renderMovies(dataCopied.sort((a, b) => a.episode_id > b.episode_id ? -1 : 1));
    }

    moviesSortDefault() {
      this.renderMovies(this.data);
    }

    sortBy(param) {
      if (param === 'Date') {
        console.log(this.data);
        this.moviesSortDefault()
        localStorage.setItem('sort', param);
      } else if (param === 'EpisodeAsc') {
        this.moviesSortByAscending()
        localStorage.setItem('sort', param);
      } else if (param === 'EpisodeDesc') {
        this.moviesSortByDescending()
        localStorage.setItem('sort', param);
      }
    }

    switchDisplay(param) {
      const target = document.querySelector('.films');
      console.log(param);
      if (param === 'row') {
        target.classList.add('films-row');
        target.classList.remove('films-column');
        localStorage.setItem('display', 'films-row');
        this.filmsDisplay = 'films-row';
      } else if (param === 'column') {
        target.classList.add('films-column');
        target.classList.remove('films-row');
        localStorage.setItem('display', 'films-column');
        this.filmsDisplay = 'films-column';
      }
    }

    filmPage(id) {
        localStorage.setItem('filmID', id);
        window.location = "./movie.html"
    }

  }

  class Movie {
      
    data;
    filmsDisplay = localStorage.getItem('display') || 'films-column';
    filmsSort = localStorage.getItem('sort') || 'EpisodeAsc';
    filmID = localStorage.getItem('filmID') || 1;

    constructor(target) {
      this.target = target;
      this.covers = FILM_COVERS;
      this.getData();
    }

    async getData() {
      const response = await fetch(`https://desfarik.github.io/star-wars/api/film/${this.filmID}.json`);
      this.data = await response.json(); 
      await this.renderMovies(this.data);
      await console.log(this.data);
    }

    renderMovies(array) {
    console.log(array);
      let html = '';
      html += `
        <div class="film-container">
            <p class="film-title">Star Wars: ${array.title}</p>
            <div class="film-elem">
              <img class="film-image" src="${this.covers[array.episode_id-1]}" />
              <p class="film-desc">${array.opening_crawl}<p>
            </div>
            <div class="film-authors">
              <p class="film-release">Release date: ${array.release_date}</p>
              <p class="film-director">Director: ${array.director}</p>
              <p class="film-producer">Produced by: ${array.producer}</p>
            </div>
            <div class="film-cast">
              
            </div>
            
            
        </div>
      `;
      this.target.innerHTML = html;
    }

    dataCopy(array) {
      let arrayCopy = array.map((element) => element);
      console.log(array === arrayCopy);
      return arrayCopy;
    }

    moviesSortByAscending() {
      let dataCopied;
      dataCopied = this.dataCopy(this.data);
      this.renderMovies(dataCopied.sort((a, b) => a.episode_id > b.episode_id ? 1 : -1));
    }

    moviesSortByDescending() {
      let dataCopied;
      dataCopied = this.dataCopy(this.data);
      this.renderMovies(dataCopied.sort((a, b) => a.episode_id > b.episode_id ? -1 : 1));
    }

    moviesSortDefault() {
      this.renderMovies(this.data);
    }

    sortBy(param) {
      if (param === 'Date') {
        console.log(this.data);
        this.moviesSortDefault()
        localStorage.setItem('sort', param);
      } else if (param === 'EpisodeAsc') {
        this.moviesSortByAscending()
        localStorage.setItem('sort', param);
      } else if (param === 'EpisodeDesc') {
        this.moviesSortByDescending()
        localStorage.setItem('sort', param);
      }
    }

    switchDisplay(param) {
      const target = document.querySelector('.films');
      console.log(param);
      if (param === 'row') {
        target.classList.add('films-row');
        target.classList.remove('films-column');
        localStorage.setItem('display', 'films-row');
        this.filmsDisplay = 'films-row';
      } else if (param === 'column') {
        target.classList.add('films-column');
        target.classList.remove('films-row');
        localStorage.setItem('display', 'films-column');
        this.filmsDisplay = 'films-column';
      }
    }

  }