let searchActive = false;
let currentPokemon = [];
let currentIndex = 0;
let popUpTimer;

function render() {
    const input = document.getElementById("filter");
    if (!input) return;

    const search = input.value.trim().toLowerCase();

    hideMessages();
    checkSearchState(search);
}

function initLoadMore() {
    const btn = document.getElementById("load-more");
    if (!btn) return;

    btn.addEventListener("click", loadPokemon);
}

function initSearchButton() {
    const btn = document.getElementById("search-btn");
    const input = document.getElementById("filter");
    if (!btn || !input) return;

    btn.addEventListener("click", render);

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") render();
    });
}

function initFilter() {
    const input = document.getElementById("filter");
    if (!input) return;

    input.addEventListener("input", renderFilter);
}

function renderFilter() {
    const input = document.getElementById("filter");
    if (!input) return;

    const val = input.value.trim().toLowerCase();
    hideMessages();

    if (val.length < 3) {
        restoreCurrentList();
    }
}

function isSearching(search) {
    currentState();
    searchActive = true;
    const matches = pokemonIndexData.filter(p => p.name.includes(search));
    toggleLoadMoreButton(true);

    if (!matches.length) {
        showNoResults();
        renderPokemonList([]);
        return;
    }

    loadMatchingPokemon(matches);
}

function currentState() {
    if (searchActive) return;
    currentPokemon = allPokemon.slice();
    currentIndex = pokemonIndex;
}

function restoreCurrentList() {
    if (currentPokemon.length) {
        allPokemon = currentPokemon.slice();
        pokemonIndex = currentIndex;
    }

    searchActive = false;
    hideMessages();
    renderPokemonList(allPokemon);
    toggleLoadMoreButton(false);
}

function checkSearchState(search) {
    if (!search) {
        restoreCurrentList();
        return;
    }

    if (search.length < 3) {
        restoreCurrentList();
        showPopUp("Bitte min. 3 Buchstaben eingeben");
        return;
    }
    isSearching(search);
}

function hideMessages() {
    hideNoResults();
}

function showPopUp(message) {
    const toast = document.getElementById("pop-up");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(popUpTimer);
    popUpTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function showNoResults() {
    const el = document.getElementById("no-results");
    if (el) el.style.display = "block";
}

function hideNoResults() {
    const el = document.getElementById("no-results");
    if (el) el.style.display = "none";
}