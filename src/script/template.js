function createPokemonCard(pokemon) {
    const typeClass = getPokemonTypeClass(pokemon);
    return `
        <div class="card" data-id="${pokemon.id}">
            <h2>#${pokemon.id} ${capitalizeFirstLetter(pokemon.name)}</h2>
            <img class="pokemon-img ${typeClass}"
                src="${pokemon.sprites.other["official-artwork"].front_default}"
                alt="${pokemon.name}">
            <div>${getPokemonIconTypes(pokemon)}</div>
        </div>
    `;
}

function getPokemonIconTypes(pokemon) {
    let iconTypes = "";
    for (let i = 0; i < pokemon.types.length; i++) {
        const typeName = pokemon.types[i].type.name;

        iconTypes +=
            '<img class="types-icons" ' +
            'src="./assets/icons/' + typeName + '.svg" ' +
            'alt="' + typeName + '">';
    }
    return iconTypes;
}

function templateStatRow(statName, percent) {
    return `
        <tr>
            <td>${formatStatName(statName)}</td>
            <td>
                <div class="stat-bar">
                    <div class="stat-fill" style="width:${percent}%"></div>
                </div>
            </td>
        </tr>
    `;
}

function renderTypes(pokemon) {
    const typesDiv = document.getElementById("dialog-types");
    typesDiv.innerHTML = "";

    pokemon.types.forEach(t => {
        typesDiv.innerHTML += `
            <img class="types-icons"
                 src="./assets/icons/${t.type.name}.svg"
                 alt="${t.type.name}">
        `;
    });
}

function evoTemplate(id, name) {
    return `
        <div class="evo-stage">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png">
            <span>${capitalizeFirstLetter(name)}</span>
        </div>
    `;
}

function evoArrowTemplate() {
    return `<span class="evo-arrow">→</span>`;
}