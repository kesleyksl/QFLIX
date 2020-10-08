const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=af19825a1a0be0a03403c1e309e9e297&language=pt-BR'

const genresList = document.getElementById('genre-list');

function createList(genres) {
    for (let i = 0; i < genres.length; i++) {
        const list = document.createElement('a');
        list.setAttribute('class', 'dropdown-item');
        list.innerHTML = genres[i].name;
        genresList.appendChild(list);
    }
}

fetch(url)
    .then(function (response) {

        return response.json()
    })
    .then(function (data) {
        const genres = data.genres;
        createList(genres);
        console.log(genres);
    });
