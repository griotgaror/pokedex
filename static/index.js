

window.onload = () => {
	const LIMIT = 151;
	const POKEMON_API = "https://pokeapi.co/api/v2/pokemon/" + "?limit=" + LIMIT;

	//fetch api
	let response = fetch(POKEMON_API)
		.then(response => response.json())
		.then(all_pokemon => {

			all_pokemon.results.forEach(pokemon_data => {

				//fetch pokemon data
				response = fetch(pokemon_data.url)
					.then(response => response.json())
					.then(pokedata => {

						// create pokemon data
						// console.log(pokedata.types[0].type.name)
						const pokemon = new Pokemon(pokedata);
					})
			});
		});
		
	const POKEMON_LIST = document.getElementById("pokedex").childNodes;
	const SEARCHBAR = document.getElementById("searchbar");
	
	SEARCHBAR.oninput = key => {
		let input = SEARCHBAR.value;

		POKEMON_LIST.forEach(pokemon => {
			if (input) {

				//filter all pokemon with char 1 = input char 1
				if (pokemon.id.charAt(0) == input.charAt(0)) {	

					for(let i = 0; i < input.length; i++) {
						pokemon.style.display = (pokemon.id.charAt(i) == input.charAt(i)) ? "flex" : "none";
					}

				} else { pokemon.style.display = "none"; }

				// show all pokemon
			} else { pokemon.style.display = "flex"};
		});
	};
};


class Pokemon {
	constructor(pokedata) {
		this.pkm_container = document.createElement("div");
		this.pkm_container.className = "pokemon";
		this.pkm_container.id = pokedata.name;

		this.sprite = new Image();
		this.sprite.className = pokedata.types[0].type.name;
		this.sprite.id = "pkm_sprite";
		this.sprite.src = pokedata.sprites.front_default;

		this.pkm_name_container = document.createElement("div");
		this.pkm_name_container.id = "pkm_name_container";

		this.name = document.createElement("h1");
		this.name.id = "pkm_name";
		this.name.textContent = pokedata.name;

		this.pokedex = document.getElementById("pokedex");
		this.pokedex.append(this.pkm_container);
		this.pkm_container.append(this.sprite);
		// this.pkm_container.append(this.pkm_type_container);
		this.pkm_container.append(this.pkm_name_container);
		this.pkm_name_container.append(this.name);
	}
}