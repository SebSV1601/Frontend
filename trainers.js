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

// Display a trainer and their Pokémon
function renderTrainer(trainer) {

    let pokemonList = "";

    trainer.pokemon.forEach(pokemon => {

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

    // Original trainers have pictures.
    // New trainers can be displayed without pictures.
    const trainerImage = trainer.image ? `
        <img class="trainer-image"
             src="${trainer.image}"
             alt="${trainer.name}">
    ` : "";

    trainersContainer.innerHTML += `
        <div class="trainer">

            <h2 class="trainer-name">
                ${trainer.name}
                ${trainerImage}
            </h2>

            <ul>
                ${pokemonList}
            </ul>

        </div>
    `;
}

// Display the original six trainers
trainers.forEach(trainer => {
    renderTrainer(trainer);
});

// Retrieve trainers created through the website
Promise.all([
    fetch("http://localhost:3000/trainers"),
    fetch("http://localhost:3000/trainer/owner")
])
    .then(responses => {

        responses.forEach(response => {
            if (!response.ok) {
                throw new Error("Could not retrieve trainers");
            }
        });

        return Promise.all(
            responses.map(response => response.json())
        );
    })
    .then(([allTrainers, ownedPokemon]) => {

        // Only display additional trainers from the database
        const originalNames = trainers.map(trainer => trainer.name);

        allTrainers.forEach(trainer => {

            if (originalNames.includes(trainer.trainer_name)) {
                return;
            }

            const pokemonList = ownedPokemon
                .filter(pokemon =>
                    pokemon.trainer_name === trainer.trainer_name
                )
                .map(pokemon => ({
                    name: pokemon.name,
                    id: null
                }));

            const newTrainer = {
                name: trainer.trainer_name,
                image: null,
                pokemon: pokemonList
            };

            renderTrainer(newTrainer);
        });

    })
    .catch(error => {
        console.error("Could not load new trainers:", error);
    });