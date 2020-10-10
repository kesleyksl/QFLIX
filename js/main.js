const genresList = document.querySelector('[data-genre-list]');
const main = document.querySelector('[data-main]');
const searchButton = document.querySelector('[data-search-button]');
const inputSearch = document.querySelector('[data-input-search]');
const cardDiv = document.querySelector('.card');
var movies = [];

window.addEventListener('load', async () => {
    const genres = await getCategories();
    movies = await getNowPlaying();

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

async function cardDetails(movieId){
    const details = await getMovieDetails(movieId);
    return details;
}

function renderDetails(details){
    let div = document.createElement('div');
    div.setAttribute('class', 'cardDetails');
    let date = new Date(details.release_date).toLocaleDateString('en-GB');

    main.appendChild(div);
    div.insertAdjacentHTML(
        'beforeend',
        `   
        <div class="container-details">
                <h1 class="cardDetails_title txt-purple"><center>${details.title}<center></h1>
                <p><span>Gênero:</span> ${details.genres.map( genre => genre.name )}</p>
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

function hideDetails(){
    if (main.lastElementChild.classList.contains('cardDetails')){
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
    main.innerHTML = '';
    this.movies = [];
    let category = genresList.value;
    let name = inputSearch.value;
    let movies = await filter(category, name);

    this.createCards(movies)
})

inputSearch.addEventListener('keyup', async (e) => {

    if (e.keyCode === 13 && inputSearch.value !== "") {
        e.preventDefault();
        main.innerHTML = '';
        this.movies = [];
        let category = genresList.value;
        let name = inputSearch.value;
        let movies = await filter(category, name);

        this.createCards(movies)
    }
})

main.addEventListener('click', async (e) => {
    e.preventDefault();
    hideDetails();
    if (e.target.classList.contains('card') || e.target.classList.contains('details')){
        console.log(e.target.dataset.js);
        let details = await getMovieDetails(e.target.dataset.js);
        renderDetails(details);
    }

});
