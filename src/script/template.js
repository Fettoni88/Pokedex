function createPokemonCard(pokemon) {
    return `
        <div class="card" data-id="${pokemon.id}">
            <h2>#${pokemon.id} ${capitalizeFirstLetter(pokemon.name)}</h2>
            <img class="pokemon-img ${getPokemonTypeClass(pokemon)}"
                src="${pokemon.image}"
                alt="${pokemon.name}">
            <div>${getPokemonIconTypes(pokemon)}</div>
        </div>
    `;
}

function createPokemonIcon(typeName) {
    return `
        <img class="types-icons"
             src="./assets/icons/${typeName}.svg"
             alt="${typeName}">
    `;
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