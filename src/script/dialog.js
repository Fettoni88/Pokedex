const POKE_URL = "https://pokeapi.co/api/v2/pokemon/";
const SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species/";

async function openPokemonDialog(id) {
    const dialog = document.getElementById("pokemon-dialog");
    const res = await fetch(POKE_URL + id);
    const pokemon = await res.json();
    fillDialogMain(pokemon);
    renderStats(pokemon);
    await loadEvolutionChain(id);
    initTabs();
    dialog.style.display = "flex";
}

async function loadEvolutionChain(id) {
    const speciesRes = await fetch(SPECIES_URL + id);
    const species = await speciesRes.json();
    const evoRes = await fetch(species.evolution_chain.url);
    const evoData = await evoRes.json();
    renderEvolutionChain(evoData.chain);
}

function fillDialogMain(pokemon) {
    const typeClass = getPokemonTypeClass(pokemon);
    document.getElementById("dialog-title").textContent =
        `#${pokemon.id} ${capitalizeFirstLetter(pokemon.name)}`;
    const img = document.getElementById("dialog-img");
    img.className = "pokemon-img dialog-img";
    img.classList.add(typeClass);
    img.src = pokemon.sprites.other["official-artwork"].front_default;
    img.alt = pokemon.name;
    renderTypes(pokemon);
    renderBasicData(pokemon);
}

function getBasicData(pokemon) {
    return {
        height: pokemon.height / 10 + " m",
        weight: pokemon.weight / 10 + " kg",
        exp: pokemon.base_experience,
        abilities: pokemon.abilities
            .map(a => capitalizeFirstLetter(a.ability.name))
            .join(", ")
    };
}

function renderBasicData(pokemon) {
    const data = getBasicData(pokemon);
    document.getElementById("dialog-height").textContent = data.height;
    document.getElementById("dialog-weight").textContent = data.weight;
    document.getElementById("dialog-exp").textContent = data.exp;
    document.getElementById("dialog-abilities").textContent = data.abilities;
}

function renderStats(pokemon) {
    const statsBody = document.getElementById("dialog-stats");
    statsBody.innerHTML = "";
    pokemon.stats.forEach(stat => {
        const percent = Math.min((stat.base_stat / 255) * 100, 100);
        statsBody.innerHTML += templateStatRow(stat.stat.name, percent);
    });
}

function formatStatName(name) {
    return capitalizeFirstLetter(
        name
            .replace("special-attack", "Sp. Atk")
            .replace("special-defense", "Sp. Def")
            .replace("-", " ")
    );
}

function renderEvolutionChain(chain) {
    const evoContainer = document.getElementById("dialog-evo");
    evoContainer.innerHTML = createEvoChain(chain);
}

function createEvoChain(chain) {
    let evoChain = "";
    let current = chain;
    while (current) {
        const evoId = extractIdFromUrl(current.species.url);
        evoChain += evoTemplate(evoId, current.species.name);
        if (current.evolves_to.length > 0) {
            evoChain += evoArrowTemplate();
            current = current.evolves_to[0];
        } else {
            current = null;
        }
    }
    return evoChain;
}

function extractIdFromUrl(url) {
    const parts = url.split("/");
    return parts[parts.length - 2];
}

function changeTabs() {
    const tabs = document.querySelectorAll(".dialog-leiste .tab");
    const contents = document.querySelectorAll(".tab-content");
    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            document.querySelector(".dialog-leiste .tab.active")
                ?.classList.remove("active");
            tab.classList.add("active");
            contents.forEach(c => c.style.display = "none");
            contents[index].style.display = "block";
        });
    });
}

function initTabs() {
    const tabs = document.querySelectorAll(".dialog-leiste .tab");
    const contents = document.querySelectorAll(".tab-content");
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.style.display = "none");
    tabs[0].classList.add("active");
    contents[0].style.display = "block";
}

function initDialogClose() {
    const dialog = document.getElementById("pokemon-dialog");
    dialog.addEventListener("click", e => {
        if (!e.target.closest(".dialog-content")) {
            dialog.style.display = "none";
        }
    });
}
