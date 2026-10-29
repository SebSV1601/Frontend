
fetch('http://localhost:3000/pokemon')
    .then(response => response.json())
    .then(data => {

        // Vælg de første 10 Pokémon
        const pokemon = data.slice(0, 151);

        // Hent Pokémon-navne
        const names = pokemon.map(p => p.name);

        // Hent deres attack-stats
        const attacks = pokemon.map(p => p.attack);

        // Opret grafen
        new Chart(document.getElementById('pokemonChart'), {
            type: 'bar',
            data: {
                labels: names,
                datasets: [{
                    label: 'Pokemon Attack',
                    data: attacks
                }]
            }
        });

    })
    .catch(error => {
        console.error('Fejl:', error);
    });
