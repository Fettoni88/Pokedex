const URL = "https://pokeapi.co/api/v2/pokemon/";
const SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species/";
const LIST_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
const STEP = 10;

let pokemonIndex = 0;
let pokemonIds = [];
let allPokemon = [];

async function init() {
    await loadPokemonIndex();
    await loadPokemon();
    changeTabs();
    initDialogClose();
    initFilter();
    initLoadMore();
    initCardClick();
}

function initCardClick() {
    const container = document.getElementById("gridcontainer");

    container.addEventListener("click", (e) => {
        const card = e.target.closest(".card");
        if (!card) return;

        const pokemonId = Number(card.dataset.id);
        const pokemon = allPokemon.find(p => p.id === pokemonId);

        if (!pokemon) return;

        openPokemonDialog(pokemon);
    });
}

function getPokemonTypeClass(pokemon) {
    if (!pokemon || !pokemon.types || pokemon.types.length === 0) {
        return "unknown";
    }

    return pokemon.types[0];
}

function getPokemonIconTypes(pokemon) {
    let iconTypes = "";
    for (let i = 0; i < pokemon.types.length; i++) {
        const typeName = pokemon.types[i];

        iconTypes += createPokemonIcon(typeName);
    }
    return iconTypes;
}

function capitalizeFirstLetter(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function renderPokemonList(list) {
    const container = document.getElementById("gridcontainer");
    container.innerHTML = "";

    let cardsHTML = "";
    list.forEach(pokemon => {
        cardsHTML += createPokemonCard(pokemon);
    });

    container.innerHTML = cardsHTML;
}

function toggleLoadMoreButton(searchActive) {
    const btn = document.getElementById("load-more");

    if (searchActive) {
        btn.style.display = "none";
        return;
    }

    btn.style.display =
        pokemonIndex < pokemonIndexData.length ? "block" : "none";
}

function showLoader() {
    document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

function objetifyPokemon(p) {
    return {
        id: p.id,
        name: p.name,
        image: p.sprites.other["official-artwork"].front_default,
        types: p.types.map(t => t.type.name),
        stats: p.stats.map(s => ({
            name: s.stat.name,
            value: s.base_stat
        })),
        height: p.height,
        weight: p.weight,
        exp: p.base_experience,
        abilities: p.abilities.map(a =>
            capitalizeFirstLetter(a.ability.name)
        )
    };
}