const form = document.querySelector("#trainerForm");
const pokemonOptions = document.querySelector("#pokemonOptions");
const message = document.querySelector("#message");

// Load all Pokémon from the backend
fetch("http://localhost:3000/pokemon")
    .then(response => {
        if (!response.ok) {
            throw new Error("Could not load Pokemon");
        }
        return response.json();
    })
    .then(pokemon => {
        pokemon.forEach(singlePokemon => {
            const label = document.createElement("label");
            const checkbox = document.createElement("input");

            checkbox.type = "checkbox";
            checkbox.name = "pokemon";
            checkbox.value = singlePokemon.pokedex_number;

            label.appendChild(checkbox);
            label.append(singlePokemon.name);

            pokemonOptions.appendChild(label);
        });
    })
    .catch(error => {
        message.textContent = error.message;
    });

// Save the trainer
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = form.querySelector("button");
    button.disabled = true;

    const trainer_name =
        document.querySelector("#trainerName").value.trim();

    const hometown =
        document.querySelector("#hometown").value.trim();

    const age =
        Number(document.querySelector("#age").value);

    const selectedPokemon =
        document.querySelectorAll('input[name="pokemon"]:checked');

    if (selectedPokemon.length === 0) {
        message.textContent = "Please select at least one Pokemon";
        button.disabled = false;
        return;
    }

    try {
        message.textContent = "Creating trainer...";

        // Create the trainer
        const response = await fetch(
            "http://localhost:3000/trainer/new/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    trainer_name,
                    hometown,
                    age
                })
            }
        );

        if (!response.ok) {
            throw new Error("Could not create trainer");
        }

        const trainer = await response.json();

        // Assign selected Pokemon to the new trainer
        for (const pokemon of selectedPokemon) {
            const pokemonResponse = await fetch(
                "http://localhost:3000/pokemon/trainer/new/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        trainer_id: trainer.trainer_id,
                        pokedex_number: Number(pokemon.value)
                    })
                }
            );

            if (!pokemonResponse.ok) {
                throw new Error(
                    "Trainer created, but a Pokemon could not be added"
                );
            }
        }

        message.textContent = "Trainer successfully created!";
        form.reset();

        // Open the trainers page
        window.location.href = "trainers.html";

    } catch (error) {
        console.error(error);
        message.textContent = error.message;
    } finally {
        button.disabled = false;
    }
});