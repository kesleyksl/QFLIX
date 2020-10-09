
const baseUrl = 'https://api.themoviedb.org/3/'

const baseImages = 'http://image.tmdb.org/t/p/w188_and_h282_bestv2/'

async function getCategories(){
    const url = baseUrl + 'genre/movie/list?api_key=af19825a1a0be0a03403c1e309e9e297&language=pt-BR'
    const response = await fetch(url);
    const genres = await response.json();
    return genres.genres
}
 
async function getNowPlaying(){
    const url = baseUrl + 'movie/now_playing?api_key=af19825a1a0be0a03403c1e309e9e297&language=pt-BR&page=1'

    const response = await fetch(url);
    const data = await response.json();
    return data.results
}
