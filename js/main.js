const genresList = document.querySelector('[data-genre-list]');
const main = document.querySelector('[data-main]');
const searchButton = document.querySelector('[data-search-button]');
const inputSearch = document.querySelector('[data-input-search]');
var movies=[];

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
        main.insertAdjacentHTML("beforeend", newCard(movie.title, movie.release_date, movie.poster_path, movie.overview))
    })

}

function newCard(title, releaseDate, imagePath, overview) {
    let date = new Date(releaseDate).toLocaleDateString();

    let image = imagePath == null?'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg':`${baseImages}${imagePath}`
    console.log(image)
    return `<div class="card"  style="background-image: url('${image}');">
                <div class="details">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">Lançamento${date}</p>
                    <div class="description">
                        ${overview}
                    </div>
                </div>
            </div>`
}

async function filter(genreId, movieName){
    let filtered = []
    if(genreId !== "" && genreId>0){
        filtered = filtered.concat(await getByGenreId(genreId))
    }

    if(movieName !==""){
        filtered = filtered.concat(await getByName(movieName))
    }

    if((genreId === "" || genreId<0) && movieName ===""){
        filtered = filtered.concat(await getNowPlaying())
    }
    return filtered;
}

searchButton.addEventListener('click',async (e)=>{
    e.preventDefault();
    main.innerHTML  = '';
    this.movies = [];
    let category = genresList.value;
    let name = inputSearch.value;
    let movies = await filter(category, name);

    this.createCards(movies)
})