
function renderPokemon(pokemons) {
// Shows all pokemon with images and stats
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


    // Name searchbar write pokemon name and it will come up, if u write nothing it will render all pokemon again
const nameInputPokemon = document.querySelector("#pokemonNameSearch")
const nameButtonSearchPokemon = document.querySelector("#searchButtonNamePokemon")


nameButtonSearchPokemon.addEventListener("click", () => {
    const name = nameInputPokemon.value.trim();

    let url;

    if (name.length === 0) {
        url = "http://localhost:3000/pokemon"
    }
    else {
        url = "http://localhost:3000/pokemon/name?name=" + name;
    }

    fetch(url)
        .then(response => response.json())
        .then(pokemon => {
            renderPokemon(pokemon);
        })
        .catch(error => {
            console.error(error);
        });
});

// If you press a checkbox the primary type will be shown, you can select multiple primary types at the same time
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

// this dropdown menu can show you all the moods, if you select a mood the pokemons belonging to that mood id will show.
// Mood, type and name filters work independently and replace the displayed results
const moodSelectPokemon = document.querySelector("#moodSelect");

fetch("http://localhost:3000/moods")
    .then(response => response.json())
    .then(moods => {
        moods.forEach(mood => {
            const option = document.createElement("option");

            option.value = mood.mood_id;
            option.innerText = mood.mood_name;

            moodSelectPokemon.appendChild(option);
        });

    moodSelectPokemon.addEventListener("change", () => {
        const selectedMoodPokemon = moodSelectPokemon.value;

        fetch("http://localhost:3000/pokemon")
            .then(response => response.json())
            .then(pokemons => {
                if (selectedMoodPokemon === "") {
                    renderPokemon(pokemons);
                } else {
                    const filteredPokemon = pokemons.filter(singlePokemon => {
                        return singlePokemon.mood_id === Number(selectedMoodPokemon);
                    });
                    renderPokemon(filteredPokemon)
                }
            })

    });
    });




