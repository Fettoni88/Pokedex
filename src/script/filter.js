const STEP = 10;
let visibleCount = 10;

function initFilter() {
    const input = document.getElementById("filter");

    input.addEventListener("input", () => {
        const value = input.value.toLowerCase().trim();
        filterPokemon(value);
    });
}

function filterPokemon(search) {
    const container = document.getElementById("gridcontainer");
    container.innerHTML = "";
    const filtered = allPokemon.filter(pokemon =>
        pokemon.name.includes(search) ||
        pokemon.id.toString().includes(search)
    );
    let cardsHTML = "";
    filtered.forEach(pokemon => {
        cardsHTML += createPokemonCard(pokemon);
    });
    container.innerHTML = cardsHTML;
    addCardEvents();
}

function applyFilter() {
    const input = document.getElementById("filter");
    const search = input.value.toLowerCase().trim();
    let filtered = allPokemon;
    if (search) {
        filtered = allPokemon.filter(pokemon =>
            pokemon.name.includes(search) ||
            pokemon.id.toString().includes(search)
        );
    }
    renderPokemonList(filtered);
    toggleLoadMoreButton(filtered.length);
}

function initFilter() {
    const input = document.getElementById("filter");

    input.addEventListener("input", () => {
        visibleCount = STEP;
        applyFilter();
    });
}