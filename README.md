# Workshop Recap DOM

At the root of the project you will find a data folder which contains a list of pokemons, your goal will be to display this list with a scrolling list to sort the pokemons by type. You will also need to display the total amount of pokemons of the selected type.

**It is very important to note that your code can be very different from the proposed solution and still be valid!**

## First step

For the first step you'll need to `import` the data in the app.js file, then, **log** it in the console.

<details>
  <summary>🙈 Answer</summary>

```js
import pokemons from "./data/pokemons.js";

console.log(pokemons);
```

</details>

## Second step

We now want to display the types of pokemons in the existing `select`, for that, we will first filter the list of our pokemons to have only uniq types and then we will create html `option` nodes to display these single types.
And finally we will put it in a function called `displayTypes` and call here.

<details>
  <summary>🙈 Answer</summary>

```js
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
```

</details>

## Third step

It is now a question of displaying all the pokemons of the list in the div which has the class pokemon-list, to do this in, in a first time we are going to create a function buildCard which will have for responsibility to create a html card which will correspond to the model in comment in the html file.
Tip: A class is present in the CSS for each typed Pokémon!

<details>
  <summary>🙈 Answer</summary>

```js
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
```

</details>

We are now going to create a function that will be in charge of displaying all the cards for each pokemon in the list and then, we are going to call this function to display all the pokemons when the page loads.

<details>
  <summary>🙈 Answer</summary>

```js
const displayPokemons = (pokemons) => {
  const pokemonList = document.querySelector(".pokemon-list");

  const pokemonCards = pokemons.map((pokemon) => buildCard(pokemon));

  pokemonCards.forEach((pokemonCard) => {
    pokemonList.appendChild(pokemonCard);
  });
};

displayPokemons(pokemons);
```

</details>

## Fourth step

We are going to move to the dynamic display of the total number of pokemon in the list, for that we are going to create a `displayLength` function, which will take in prameter a number and will display it in the span of the h1.

<details>
  <summary>🙈 Answer</summary>

```js
const displayLength = (length) => {
  const h1 = document.querySelector("h1");
  h1.querySelector("span").textContent = length;
};
```

Il ne nous reste plus qu'a appeler cette fonction avant d'appeler `displayPokemons` !

</details>

## Fifth step

Now that we have all the blocks we need, we just need to assemble them so that when the user changes the value of the select then we display a sorted list of pokemons!

<details>
  <summary>🙈 Answer</summary>

```js
const select = document.querySelector("select");

select.addEventListener("change", (event) => {
  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      pokemon.types.includes(event.target.value) || event.target.value === "All"
  );

  displayLength(filteredPokemons.length);
  displayPokemons(filteredPokemons);
});
```

</details>

## Sixth step

There is a problem, our pokemon multiply every time the user tries to filter them !
We need to create a function that erases the previous selection and call it each time we filter the list.

<details>
  <summary>🙈 Answer</summary>

```js
const removeChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
```

Once this function is created, we add it to the `displayPokemons` function!

```js
const displayPokemons = (pokemons) => {
  const pokemonList = document.querySelector(".pokemon-list");

  removeChildNodes(pokemonList);

  const pokemonCards = pokemons.map((pokemon) => buildCard(pokemon));

  pokemonCards.forEach((pokemonCard) => {
    pokemonList.appendChild(pokemonCard);
  });
};
```

</details>

Here you go, congratulations! We made our little pokedex that filters pokemons by type!
