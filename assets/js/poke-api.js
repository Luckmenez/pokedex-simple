const pokeApi = {}

function convertPokemonResponseToModel(pokemonDetail) {
  const pokemon = new Pokemon()
  pokemon.name = pokemonDetail.name
  pokemon.number = pokemonDetail.id
  pokemon.pokemonImg = pokemonDetail.sprites.other.dream_world.front_default


  const types = pokemonDetail.types.map((pokemonSlot) => pokemonSlot.type.name)
  const [ type ] = types
  
  pokemon.type = type
  pokemon.types = types

  return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokemonResponseToModel)
}

pokeApi.getPokemons = (offset = 0, limit =10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

  return fetch(url)
    .then((response) => response.json())
    .then((jsonResponse) => jsonResponse.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailedRequests) => Promise.all(detailedRequests))
    .then((pokemonsDetailed) => pokemonsDetailed)
}