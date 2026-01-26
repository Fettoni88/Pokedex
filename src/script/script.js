const URL = "https://pokeapi.co/api/v2/pokemon/"
let allPokemon = [];

async function loadPokemon() {
    const container = document.getElementById("gridcontainer");
    container.innerHTML = "";
    showLoader();
    try {
        await iterierePokemon(1, 151);

        visibleCount = STEP;
        applyFilter();

    } catch (error) {
        console.error("API-Fehler:", error);
    }
    finally {
        hideLoader();
    }
}

async function iterierePokemon(start, ende) {
    allPokemon = [];

    for (let id = start; id <= ende; id++) {
        const res = await fetch(URL + id);
        if (!res.ok) {
            throw new Error("HTTP Fehler: " + res.status);
        }
        const pokemon = await res.json();
        allPokemon.push(pokemon);
    }
}

function initCardClick() {
    const container = document.getElementById("gridcontainer");

    container.addEventListener("click", (e) => {
        const card = e.target.closest(".card");
        if (!card) return;

        const id = Number(card.dataset.id);
        openPokemonDialog(id);
    });
}

function getPokemonTypeClass(pokemon) {
    if (!pokemon || !pokemon.types || pokemon.types.length === 0) {
        return "unknown";
    }

    return pokemon.types[0].type.name;
}

function capitalizeFirstLetter(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function renderPokemonList(list) {
    const container = document.getElementById("gridcontainer");
    container.innerHTML = "";

    const visiblePokemon = list.slice(0, visibleCount);

    let cardsHTML = "";
    visiblePokemon.forEach(pokemon => {
        cardsHTML += createPokemonCard(pokemon);
    });

    container.innerHTML = cardsHTML;
}

function initLoadMore() {
    const btn = document.getElementById("load-more");

    btn.addEventListener("click", () => {
        visibleCount += STEP;
        applyFilter();
    });
}

function toggleLoadMoreButton(total) {
    const btn = document.getElementById("load-more");
    btn.style.display = visibleCount < total ? "block" : "none";
}

function showLoader() {
    document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

function init() {
    loadPokemon();
    changeTabs();
    initDialogClose();
    initFilter();
    initLoadMore();
    initCardClick();
}
