const genresList = document.querySelector('[data-genre-list]');
const main = document.querySelector('[data-main]');
const searchButton = document.querySelector('[data-search-button]');
const inputSearch = document.querySelector('[data-input-search]');
const cardDiv = document.querySelector('.card');
var movies = [];

window.addEventListener('load', async () => {
    loading(main)
    const genres = await getCategories();
    movies = await getNowPlaying();
    main.innerHTML = '';
    createList(genres);
    createCards(movies);

})

function createList(genres) {
    genres.forEach((genre) => {
        genresList.insertAdjacentHTML("beforeend", `<option value="${genre.id}">${genre.name}</option>`);
    })
}

function createCards(nowPlaying) {

    nowPlaying.forEach((movie) => {
        main.insertAdjacentHTML("beforeend", newCard(movie.title, movie.id, movie.release_date, movie.poster_path, movie.overview))
    })
}

function newCard(title, id, releaseDate, imagePath) {
    let date = new Date(releaseDate).toLocaleDateString('en-GB');
    let image = imagePath == null ? 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg' : `${baseImages}${imagePath}`
    return `<div class="card" data-js="${id}"  style="background-image: url('${image}');">
                <div class="details" data-js="${id}">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">Lançamento - ${date}</p>
                </div>
            </div>`
}

async function cardDetails(movieId) {
    const details = await getMovieDetails(movieId);
    return details;
}

function renderDetails(details) {
    let div = document.createElement('div');
    div.setAttribute('class', 'cardDetails');
    let date = new Date(details.release_date).toLocaleDateString('en-GB');

    main.appendChild(div);
    div.insertAdjacentHTML(
        'beforeend',
        `   
        <div class="container-details">
                <h1 class="cardDetails_title txt-purple"><center>${details.title}<center></h1>
                <p><span>Gênero:</span> ${details.genres.map(genre => genre.name)}</p>
                <p><span>Overview:</span> ${details.overview}</p>
                <p><span>Lançamento:</span> ${date}</p>
                <p><span>Duração:</span> ${details.runtime} minutos</p>
                <p><span>Nota média:</span> ${details.vote_average}</p>
            <div class="footer-details">
                <center>
                    <button type="button" onclick="hideDetails(event)" class="btn bg-purple txt-white" data-dismiss="modal">Fechar</button>
                </center>
                </div>
        </div>
`
    )

}

function hideDetails() {
    if (main.lastElementChild.classList.contains('cardDetails')) {
        main.removeChild(main.lastElementChild);
    }
}

async function filter(genreId, movieName) {
    let filtered = []
    if (genreId !== "" && genreId > 0) {
        filtered = filtered.concat(await getByGenreId(genreId))
    }

    if (movieName.trim() !== "") {
        filtered = filtered.concat(await getByName(movieName))
    }

    if ((genreId === "" || genreId < 0) && movieName.trim() === "") {
        filtered = filtered.concat(await getNowPlaying())
    }
    return filtered;
}

searchButton.addEventListener('click', async (e) => {
    e.preventDefault();
    loading(main)

    this.movies = [];
    let category = genresList.value;
    let name = inputSearch.value;
    let movies = await filter(category, name);
    main.innerHTML = '';


    this.createCards(movies)
    if (isNotFound(movies, main))
        return;
})

inputSearch.addEventListener('keyup', async (e) => {

    if (e.keyCode === 13) {
        e.preventDefault();
        loading(main)

        this.movies = [];
        let category = genresList.value;
        let name = inputSearch.value;
        let movies = await filter(category, name);

        this.createCards(movies)
        if (isNotFound(movies, main))
            return;
    }
})

main.addEventListener('click', async (e) => {
    e.preventDefault();
    hideDetails();
    if (e.target.classList.contains('card') || e.target.classList.contains('details')) {
        let details = await getMovieDetails(e.target.dataset.js);
        renderDetails(details);
    }

});

//Modal

const modalHTML = `
    <div class="modal fade" id="modal-roleta" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="ring2"></div>
            <div class="modal-content">
                <div id="modal-header-m1" class="modal-header">
                    <h5 class="modal-title" id="TituloModalCentralizado">Roleta de sugestões</h5>
                    <button id="button-close" type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="modal-body-m1" class="modal-body">
                    <span class="items-body-modal">Escolha suas preferências (opcional)</span>
                    <span class="items-body-modal title-input">Nota média mínima (0 a 10)</span>
                    <input id="input-nota" class="form-control items-body-modal" input" type="number" data-input-search placeholder="Exemplo (7.5)" aria-label="Exemplo (7.5)">
                    <span class="items-body-modal title-input">Ano de lançamento</span>
                    <input id="input-ano" class="form-control items-body-modal" input" type="number" data-input-search placeholder="Exemplo (2014)" aria-label="Exemplo (2014)">
                </div>
                <div id="modal-footer-m1" class="modal-footer">
                    <button type="button" class="btn btn-secondary button-close" data-dismiss="modal">Cancelar</button>
                    <button id="card-button" type="button" class="btn btn-purple" data-dismiss="modal" data-toggle="modal" data-target="#modal-card">Rodar Roleta</button>
                </div>
            </div>
        </div>
    </div>`

const modalCard = `
    <div class="modal fade" id="modal-card" tabindex="-1" role="dialog" aria-labelledby="TituloModalCentralizado" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="ring2"></div>
            <div class="modal-content">
                <div id="modal-header-m2" class="modal-header">
                    <h5 class="modal-title" id="TituloModalCentralizado">Bora assistir esse?</h5>
                    <button id="button-close" type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="modal-body-m2" class="modal-body">
                </div>
                <div id="modal-footer-m2" class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" data-toggle="modal" data-target="#modal-roleta">Quero outro</button>
                    <button id="card-button" type="button" class="btn btn-purple button-close" data-dismiss="modal">Gostei!</button>
                </div>
            </div>
        </div>
    </div>`



const modalButton = document.getElementById('modal-button');

modalButton.addEventListener('click', (e) => {
    e.preventDefault();
    const modalDiv = document.getElementById('modal-div');
    modalDiv.innerHTML = modalHTML;
    const cardDiv = document.getElementById('card-div');
    cardDiv.innerHTML = modalCard;

    const inputNota = document.getElementById('input-nota');
    const inputAno = document.getElementById('input-ano');
    const cardButton = document.getElementById('card-button');

    cardButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const modalBodyCard = document.getElementById('modal-body-m2');
        loading(modalBodyCard)


        const inputreleaseDate = inputAno.value;
        const inputvoteAverage = inputNota.value;
        var movie = [];

        for (var i = 1; i < 10; i++) {
            var pageResult = i;
            var moviePage = [];
            moviePage = await getDiscoverRoleta(pageResult, inputreleaseDate, inputvoteAverage);

            if (moviePage.total_pages == 0)
                i = 99999;
            movie.push(...moviePage.results);
        }
        main.innerHTML = '';

        const indexRoleta = Math.floor(Math.random() * movie.length - 1);
        var resultadoRoleta = movie[indexRoleta];

        if (isNotFound(movie, modalBodyCard))
            return;
        modalBodyCard.innerHTML = newCard(resultadoRoleta.title, resultadoRoleta.id, resultadoRoleta.release_date, resultadoRoleta.poster_path, resultadoRoleta.overview);

    })
});


function hasResult(movies) {
    return movies.length > 0;
}

function renderNotFound(reference) {
    reference.innerHTML = `<h1 style="color:white;">Resultado não encontrado</h1>`
}

function isNotFound(movies, element) {
    if (!hasResult(movies)) {
        renderNotFound(element);
        return true;
    }
    return false;
}

function loading(element) {
    element.innerHTML = `<div class="spinner-border text-light" role="status">
    <span class="sr-only">Loading...</span>
  </div>`
}