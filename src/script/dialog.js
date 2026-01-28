
function fillDialogMain(pokemon) {
    const typeClass = getPokemonTypeClass(pokemon);
    document.getElementById("dialog-title").textContent =
        `#${pokemon.id} ${capitalizeFirstLetter(pokemon.name)}`;
    const img = document.getElementById("dialog-img");
    img.className = "pokemon-img dialog-img";
    img.classList.add(typeClass);
    img.src = pokemon.image;
    img.alt = pokemon.name;
    renderIconDialog(pokemon);
    renderBasicData(pokemon);
}

function renderIconDialog(pokemon) {
    const icon = document.getElementById("dialog-types");
    icon.innerHTML = "";

    icon.innerHTML += getPokemonIconTypes(pokemon);
}

function getBasicData(pokemon) {
    return {
        height: pokemon.height / 10 + " m",
        weight: pokemon.weight / 10 + " kg",
        exp: pokemon.exp,
        abilities: pokemon.abilities.join(", ")
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
        const percent = Math.min((stat.value / 255) * 100, 100);
        statsBody.innerHTML += templateStatRow(
            formatStatName(stat.name),
            percent
        );
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

function extractEvolutionChain(chain) {
    const result = [];

    function walk(node) {
        result.push({
            id: Number(node.species.url.split("/").at(-2)),
            name: node.species.name
        });
        node.evolves_to.forEach(walk);
    }

    walk(chain);
    return result;
}

function renderEvolutionChain(chain) {
    const evoContainer = document.getElementById("dialog-evo");
    evoContainer.innerHTML = "";

    chain.forEach((p, index) => {
        evoContainer.innerHTML += evoTemplate(p.id, p.name);
        if (index < chain.length - 1) {
            evoContainer.innerHTML += evoArrowTemplate();
        }
    });
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
    const closeBtn = document.getElementById("dialog-close");

    closeBtn.addEventListener("click", closeDialog);

    dialog.addEventListener("click", e => {
        if (!e.target.closest(".dialog-content")) {
            closeDialog();
        }
    });
}

function closeDialog() {
    document.getElementById("pokemon-dialog").style.display = "none";
}

function initTabSwitchButton() {
    const btn = document.getElementById("dialog-next-tab");
    const tabs = document.querySelectorAll(".dialog-leiste .tab");
    const contents = document.querySelectorAll(".tab-content");

    btn.addEventListener("click", () => {
        let activeIndex = [...tabs].findIndex(t =>
            t.classList.contains("active")
        );

        tabs[activeIndex].classList.remove("active");
        contents[activeIndex].style.display = "none";

        const nextIndex = (activeIndex + 1) % tabs.length;

        tabs[nextIndex].classList.add("active");
        contents[nextIndex].style.display = "block";
    });
}

function switchDialogPokemon(direction) {
    const index = allPokemon.findIndex(
        p => p.id === currentDialogPokemon.id
    );

    if (index === -1) return;

    let newIndex = index + direction;

    if (newIndex < 0) newIndex = allPokemon.length - 1;
    if (newIndex >= allPokemon.length) newIndex = 0;

    openPokemonDialog(allPokemon[newIndex]);
}

function initDialogNavigation() {
    document
        .getElementById("dialog-prev")
        .addEventListener("click", () => switchDialogPokemon(-1));

    document
        .getElementById("dialog-next")
        .addEventListener("click", () => switchDialogPokemon(1));
}

