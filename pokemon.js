
function renderPokemon(pokemons) {

    pokemonList.replaceChildren();
    pokemons.forEach(singlePokemon => {
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
    })};



    let pokemonList = document.querySelector("#pokemonList")


    fetch("http://localhost:3000/pokemon")
        .then(response => response.json())
        .then(pokemon => {
            console.log(pokemon)
            renderPokemon(pokemon)

        }).catch(error => {
        console.error("Could not find Pokemon", error);
        pokemonList.textContent = "Could not find any Pokemon. Try again later"
    });

const nameInputPokemon = document.querySelector("#pokemonNameSearch")
const nameButtonSearchPokemon = document.querySelector("#searchButtonNamePokemon")


nameButtonSearchPokemon.addEventListener("click", () => {
    const name = nameInputPokemon.value.trim();

    fetch("http://localhost:3000/pokemon/name?name=" + name)
        .then(response => response.json())
        .then(nameSearchPokemon => {
            console.log(nameSearchPokemon)
        })
        .catch(error => {
            console.error(error);
        });
});

const primaryTypeCheckbox = document.querySelectorAll("#primaryTypeCheckbox input");

primaryTypeCheckbox.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        const selectedTypes = document.querySelectorAll("#primaryTypeCheckbox input:checked")
        const selectedValues = [];

        selectedTypes.forEach(selectedCheckbox => {
            selectedValues.push(selectedCheckbox.value);
        });
        console.log(selectedValues)

        let url;

        if (selectedValues.length === 0) {
            url = "http://localhost:3000/pokemon"
        }
        else {
            url = "http://localhost:3000/pokemon/type?primary_type=" + selectedValues.join(",");
        }
            fetch(url)
                .then(response => response.json())
                .then(pokemon => {
                    renderPokemon(pokemon);
                })


    });




});




