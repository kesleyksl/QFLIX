const genresList = document.getElementById('genre-list');
const main = document.querySelector('[data-main]');
window.addEventListener('load', async () => {
    console.log(main)
    const genres = await getCategories();
    const nowPlaying = await getNowPlaying();
    console.log(nowPlaying)
    createList(genres);
    createCards(nowPlaying);

})

function createList(genres) {
    genres.forEach((genre) => {
        genresList.insertAdjacentHTML("beforeend", `<option value="${genre.id}">${genre.name}</option>`);
    })
}

function createCards(nowPlaying) {

    nowPlaying.forEach((movie) => {
        console.log(newCard(movie.title, movie.realease_date, movie.poster_path))
        main.insertAdjacentHTML("beforeend", newCard(movie.title, movie.release_date, movie.poster_path))
    })

}

function newCard(title, releaseDate, imagePath) {
    let date = new Date(releaseDate).toLocaleDateString();
    return `<div class="card"  style="background-image: url('${baseImages}${imagePath}');">
                <div >
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">Lançamento${date}</p>
                </div>
            </div>`
}