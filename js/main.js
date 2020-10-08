const genresList = document.getElementById('genre-list');

window.addEventListener('load', async ()=>{
    const genres = await getCategories();
    createList(genres);
})

function createList(genres) {
    genres.forEach((genre) => {
        genresList.insertAdjacentHTML("beforeend", `<option value="${genre.id}">${genre.name}</option>`);
    })
}