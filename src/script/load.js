let pokemonIndexData = [];

async function loadPokemonIndex() {
    const res = await fetch(LIST_URL);
    if (!res.ok) throw new Error("Index Fehler");

    const data = await res.json();

    pokemonIndexData = data.results.map(p => {
        const m = p.url.match(/\/pokemon\/(\d+)\//);
        return {
            id: Number(m[1]),
            name: p.name
        };
    });
}

async function loadPokemon() {
    showLoader();
    const slice = pokemonIndexData.slice(pokemonIndex, pokemonIndex + STEP);

    for (const entry of slice) {
        const pokemon = await getPokemon(entry.id);
        allPokemon.push(pokemon);
    }

    pokemonIndex += STEP;
    hideLoader();
    renderPokemonList(allPokemon);
    toggleLoadMoreButton(false);
}

async function getPokemon(pokemonId) {
    const res = await fetch(URL + pokemonId);
    if (!res.ok) throw new Error("Pokemon Fehler");

    const raw = await res.json();
    return objetifyPokemon(raw);
}

async function openPokemonDialog(pokemon) {
    document.getElementById("dialog-evo").innerHTML = "";

    fillDialogMain(pokemon);
    renderStats(pokemon);

    await loadEvolutionChain(pokemon.id);

    initTabs();
    document.getElementById("pokemon-dialog").style.display = "flex";
}

async function loadEvolutionChain(pokemonId) {
    const speciesRes = await fetch(SPECIES_URL + pokemonId);
    if (!speciesRes.ok) return;

    const species = await speciesRes.json();

    const evoRes = await fetch(species.evolution_chain.url);
    if (!evoRes.ok) return;

    const evoData = await evoRes.json();
    const evoChain = extractEvolutionChain(evoData.chain);

    renderEvolutionChain(evoChain);
}

async function loadMatchingPokemon(matches) {
    showLoader();
    allPokemon = [];

    const limited = matches.slice(0, 20); // UX-Limit

    for (const m of limited) {
        const pokemon = await getPokemon(m.id);
        allPokemon.push(pokemon);
    }
    hideLoader();
    renderPokemonList(allPokemon);
}

async function resetFilter() {
    hideMessages();
    pokemonIndex = 0;
    allPokemon = [];
    await loadPokemon();
}
