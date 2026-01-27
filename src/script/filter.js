let isSearching = false;

function render() {
    const search = document.getElementById("filter").value
        .toLowerCase()
        .trim();
    if (search) {
        isSearching = true;
        searchingPokemon(search);
        return;
    }
    if (isSearching) {
        resetFilter();
        return;
    }
    renderPokemonList(allPokemon);
    toggleLoadMoreButton(false);
}

function searchingPokemon(search) {
    const matches = pokemonIndexData.filter(p =>
        p.name.includes(search) ||
        String(p.id).includes(search)
    );

    loadMatchingPokemon(matches);
    toggleLoadMoreButton(true);
}

function resetFilter() {
    isSearching = false;
    pokemonIndex = 0;
    allPokemon = [];
    loadPokemon();
}

function initFilter() {
    document.getElementById("filter")
        .addEventListener("input", render);
}

function initLoadMore() {
    document.getElementById("load-more")
        .addEventListener("click", loadPokemon);
}
