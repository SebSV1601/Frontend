const trainers = [
    {
        name: "Ash",
        image: "images/ash.png",
        pokemon: [
            {name: "Pikachu", id: 25},
            {name: "Bulbasaur", id: 1},
            {name: "Charizard", id: 6},
            {name: "Butterfree", id: 12},
            {name: "Snorlax", id: 143}
        ]
    },
    {
        name: "Misty",
        image: "images/misty.png",
        pokemon: [
            {name: "Psyduck", id: 54},
            {name: "Staryu", id: 120},
            {name: "Starmie", id: 121},
            {name: "Goldeen", id: 118}
        ]
    },
    {
        name: "Brock",
        image: "images/brock.png",
        pokemon: [
            {name: "Geodude", id: 74},
            {name: "Onix", id: 95},
            {name: "Zubat", id: 41}
        ]
    },
    {
        name: "Gary",
        image: "images/gary.png",
        pokemon: [
            {name: "Blastoise", id: 9},
            {name: "Eevee", id: 133},
            {name: "Arcanine", id: 59},
            {name: "Pikachu", id: 25}
        ]
    },
    {
        name: "Jessie",
        image: "images/jessie.png",
        pokemon: [
            {name: "Arbok", id: 24},
            {name: "Meowth", id: 52}
        ]
    },
    {
        name: "James",
        image: "images/james.png",
        pokemon: [
            {name: "Weezing", id: 110},
            {name: "Meowth", id: 52}
        ]
    }
];

// Find the HTML container
const trainersContainer = document.querySelector("#trainers");

// Go through every trainer
trainers.forEach(trainer => {

    let pokemonList = "";

    // Go through the Pokémon belonging to each trainer
    trainer.pokemon.forEach(pokemon => {

        // Get Pokémon picture using the Pokedex number
        const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

        pokemonList += `
            <li class="pokemon">
                ${pokemon.name}

                <img class="pokemon-image"
                     src="${pokemonImage}"
                     alt="${pokemon.name}"
                     loading="lazy">
            </li>
        `;
    });

    // Shows the trainer and their Pokémon
    trainersContainer.innerHTML += `
        <div class="trainer">

            <h2 class="trainer-name">
                ${trainer.name}

                <img class="trainer-image"
                     src="${trainer.image}"
                     alt="${trainer.name}">
            </h2>

            <ul>
                ${pokemonList}
            </ul>

        </div>
    `;
});