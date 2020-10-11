
const baseUrl = 'https://api.themoviedb.org/3/'

const baseImages = 'http://image.tmdb.org/t/p/w188_and_h282_bestv2/'

const key = 'af19825a1a0be0a03403c1e309e9e297';

async function getCategories(){
    const url = baseUrl + `genre/movie/list?api_key=${key}&language=pt-BR`
    const response = await fetch(url);
    const genres = await response.json();
    return genres.genres
}
 
async function getNowPlaying(){
    const url = baseUrl + `movie/now_playing?api_key=${key}&language=pt-BR&page=1`
    const response = await fetch(url);
    const data = await response.json();
    return data.results
}


async function getByName(name){
    const url = baseUrl + `search/movie?api_key=${key}&language=pt-br&query=${name}&page=1&include_adult=false`
    const response = await fetch(url);
    const data = await response.json();
    return data.results
}


async function getByGenreId(genreId){
    const url = baseUrl + `discover/movie?api_key=af19825a1a0be0a03403c1e309e9e297&language=pt-br&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`
    const response = await fetch(url);
    const data = await response.json();
    return data.results
}

async function getMovieDetails(movieId){
    const url = baseUrl + `movie/${movieId}?api_key=${key}&language=pt-br`
    const response = await fetch(url);
    const details = await response.json();
    return details;
}

async function getDiscoverRoleta(inputreleaseDate, inputvoteAverage) {
    const url = baseUrl + `discover/movie?api_key=af19825a1a0be0a03403c1e309e9e297&language=pt-br&include_adult=false&include_video=false&release_date.gte=${inputreleaseDate}&vote_average.gte=${inputvoteAverage}`
    const response = await fetch(url);
    const data = await response.json();
    return data.results
}