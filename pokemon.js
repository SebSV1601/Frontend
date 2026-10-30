const pokemonList = document.querySelector("#pokemonList")

fetch("http://localhost:3000/pokemon")
    .then(response => response.json())
    .then(pokemon => {
        pokemon.forEach(singlePokemon => {
            const card = document.createElement("div");
            card.classList.add("pokemon-card");

            const image = document.createElement("img");

            image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${singlePokemon.pokedex_number}.png`;
            image.alt = singlePokemon.name;
            image.classList.add("pokemon-image");

            const name = document.createElement("h2");
            name.textContent = singlePokemon.name;

            const stats = document.createElement("p");
            stats.textContent =
                `Type: ${singlePokemon.primary_type} |` +
                `HP: ${singlePokemon.hp} |` +
                `Attack: ${singlePokemon.attack} |` +
                `Defence: ${singlePokemon.defence} |` +
                `Special attack ${singlePokemon.special_attack} |` +
                `Special defence ${singlePokemon.special_defence} |` +
                `Speed ${singlePokemon.speed}`;

            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(stats);
            pokemonList.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Could not find Pokemon", error);
        pokemonList.textContent = "Could not find any Pokemon. Try again later"
    });

