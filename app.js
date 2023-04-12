import pokemons from "./data/pokemons.js";

const displayTypes = () => {
  const types = [...new Set(pokemons.map((pokemon) => pokemon.types).flat())];

  const select = document.querySelector("select");

  types.forEach((type) => {
    const opt = document.createElement("option");

    opt.value = type;
    opt.innerText = type;

    select.appendChild(opt);
  });
};

displayTypes();

const removeChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const displayLength = (length) => {
  const h1 = document.querySelector("h1");
  h1.querySelector("span").textContent = length;
};

const buildCard = (pokemon) => {
  const card = document.createElement("div");

  card.classList.add("card");

  const img = document.createElement("img");
  img.src = pokemon.img;

  const p = document.createElement("p");
  p.innerText = pokemon.name;

  const ul = document.createElement("ul");

  ul.classList.add("type-list");

  pokemon.types.forEach((type) => {
    const li = document.createElement("li");
    li.classList.add("type-list-item", type);
    li.textContent = type;

    ul.appendChild(li);
  });

  card.append(img, p, ul);

  return card;
};

const displayPokemons = (pokemons) => {
  const pokemonList = document.querySelector(".pokemon-list");

  removeChildNodes(pokemonList);

  const pokemonCards = pokemons.map((pokemon) => buildCard(pokemon));

  pokemonCards.forEach((pokemonCard) => {
    pokemonList.appendChild(pokemonCard);
  });
};

displayLength(pokemons.length);
displayPokemons(pokemons);

const select = document.querySelector("select");

select.addEventListener("change", (event) => {
  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      pokemon.types.includes(event.target.value) || event.target.value === "All"
  );

  displayLength(filteredPokemons.length);
  displayPokemons(filteredPokemons);
});
