//Dashboard med sammenligning af pokemon's stats

const select1 = document.querySelector("#pokemonSelect");
const select2 = document.querySelector("#pokemonSelect2");
let allPokemon = [];
let chart;
const statlabels = ["hp", "attack", "defence", "speed", "special_attack", "special_defence"]

//data fetcher
fetch("http://localhost:3000/pokemon", {})
.then(response => response.json())
.then(data => {
    allPokemon = data;
    console.log(data[0])

    //drop down 1
data.forEach((pokemon) => {
    const option1 = document.createElement("option");
    option1.value = pokemon.pokedex_number;
    option1.textContent = pokemon.name;
    select1.appendChild(option1);

    //drop down 2
    const option2 = document.createElement("option");
    option2.value = pokemon.pokedex_number;
    option2.textContent = pokemon.name;
    select2.appendChild(option2);
});
})
.catch(error => console.error("Fejl:", error));

// Når brugeren vælger en Pokémon i dropdown 1
select1.addEventListener("change", (e) => {
    const chosen1 = allPokemon.find(pokemon => pokemon.pokedex_number == select1.value);
    console.log(chosen1);
    const stats1 = [chosen1.hp, chosen1.attack, chosen1.defence, chosen1.speed, chosen1.special_attack, chosen1.special_defence];
    console.log(stats1);
    });
    select2.addEventListener("change", (e) => {
        const chosen1 = allPokemon.find(pokemon => pokemon.pokedex_number == select1.value);         
        console.log(chosen1);
            const stats1 = [chosen1.hp, chosen1.attack, chosen1.defence, chosen1.speed, chosen1.special_attack, chosen1.special_defence];
        const chosen2 = allPokemon.find(pokemon => pokemon.pokedex_number == select2.value);
        console.log(chosen2);
        const stats2 = [chosen2.hp, chosen2.attack, chosen2.defence, chosen2.speed, chosen2.special_attack, chosen2.special_defence];
        console.log(stats2);
        // slet den gamle graf (ai generert - efter fejl)
        if (chart) {
            chart.destroy();
        }

//grafen
        chart = new Chart(document.getElementById("pokemonChart"), {
            type: "line",
            data: {
                labels: statlabels,
                datasets: [{
                    label: chosen1.name,
                    data: stats1
                }, {
                    label: chosen2.name,
                    data: stats2
                }]
            }
        });
    });