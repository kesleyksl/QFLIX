
const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=af19825a1a0be0a03403c1e309e9e297&language=pt-BR'


async function getCategories(){
    const response = await fetch(url);
    const genres = await response.json();
    return genres.genres
}
 

