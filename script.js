const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
const input = document.querySelector("#input");

const checkbox = document.getElementById("checkbox");

const container = document.getElementById("cards");
const pokemonCount = 150;
const colors = {
    fire: "#F5AC78",
    grass: "#A7DB8D",
	electric: "#FAE078",
	water: "#94DBEE",
	ground: "#EBD69D",
	rock: "#D1C17D",
	fairy: "#F4BDC9",
	poison: "#C183C1",
	bug: "#C6D16E",
	dragon: "#A27DFA",
	psychic: "#FA92B2",
	flying: "#C6B7F5",
	fighting: "#D67873",
	normal: "#C6C6A7"
}

const typeMap = Object.keys(colors)


const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    insertPokemonCard(data);
    filterPokemonCard(data);
    displayPokemonAbilities(data);
}

const insertPokemonCard = async (pokemon) => {
    const pokemonElem = document.createElement("div");
    pokemonElem.classList.add("pokemon");

    // Map the respective pokemon's type(s)
    const pokemonType = pokemon.types.map(type => type.type.name);
    // Grab the main type of the pokemon
    const pokemonMainType = typeMap.find(type => pokemonType.indexOf(type) > -1);
    const color = colors[pokemonMainType];

    // Grab pokemon's abilities
    const pokemonAbilities = pokemon.abilities.map(ability => ability.ability.name);
    
    // Set background of card to corresponding pokemon type
    pokemonElem.style.backgroundColor = colors[pokemonMainType];

    // Set img to corresponding theme
    if (document.body.classList.value != "dark") {
        pokemonImg = `https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/thumbnails/${pokemon.id.toString().padStart(3, "0")}.png`;
    } else {
        pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    }

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="${pokemonImg}" alt="">
    </div>
    <div class="info">
        <span class="number">${pokemon.id.toString().padStart(3, "0")}</span>
        <h3 class="name"> ${pokemon.name.toUpperCase()}</h3>
        
        <small class="type">Type: <span>${pokemonMainType[0].toUpperCase() + pokemonMainType.slice(1)}</span></small>
    </div>
    <div class="abilities">
        <button class="but${pokemon.id}">      
            <span class="btn__inner">
                <span class="btn__slide"></span>
                <span class="btn__content">Abilities</span>
            </span>
        </button>
    
        <div class="displayAbilities hide">${pokemonAbilities}</div>
    </div>`;
    pokemonElem.innerHTML = pokemonInnerHTML;
    container.appendChild(pokemonElem);
}

const displayPokemonAbilities = (pokemon) => {
    let allButtons = document.querySelectorAll("button[class^=but]");
    let displayField = document.getElementsByClassName("displayAbilities");
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener("click", function(e) {
            if (e.target && e.target.matches("button[class^=but]")) {
                // e.preventDefault();
                // e.stopPropagation();
                e.stopImmediatePropagation();
                displayField[e.target.classList.value.substring(3)-1].classList.toggle("hide");
            }
        });
    }
}

const filterPokemonCard = (pokemon) => {
    document.getElementById("input").addEventListener("keyup", function (e) {
        [].forEach.call(document.querySelectorAll(".name"), function (pokemon) {
            if (pokemon.textContent.indexOf(e.target.value.toUpperCase()) === -1) {
                // number > name > info
                pokemon.parentElement.parentElement.classList.add("hide");
            } else {
                // number > name > info
                pokemon.parentElement.parentElement.classList.remove("hide");
            }
        });
    }, false);
}

// Search bar button
btn.addEventListener("click", () => {
    search.classList.toggle("active");
    input.focus();
});

// Theme selector, toggles between modern(light)/retro(dark)
checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");

    // Delete children nodes to reapply correct img/font with theme
    container.innerHTML = '';
    // Setting a cooldown on theme button to prevent mixup of pokemon, pokemon imgs and fonts
    checkbox.disabled = true;
    setTimeout(function() {
        checkbox.disabled = false;
    }, 2500);
    // Reapply pokemon cards with correct theme
    fetchPokemons();
});

fetchPokemons();