const fs = require("fs").promises;
const util = require("util");
const path = require("path");

const getDataSet = async (amountOfPokemons) => {
  const { results } = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${amountOfPokemons}`
  ).then((res) => res.json());

  return await Promise.all(
    results.map(
      async (pokemon) => await fetch(pokemon.url).then((res) => res.json())
    )
  );
};

const formatPokemons = (dataSet) =>
  dataSet.map((pokemon) => ({
    name: pokemon.name,
    img: pokemon.sprites.front_default,
    type: pokemon.types.map((type) => type.type.name),
  }));

const writeFile = async (data) => {
  try {
    const baseDir = path.join(__dirname, "../data/pokemons.js");

    await fs.writeFile(baseDir, `export default ${util.inspect(data)}`);
  } catch (err) {
    console.error(err);
  }
};

const generateDataSet = async (amount) => {
  const dataSet = await getDataSet(amount);
  const formatedPokemons = formatPokemons(dataSet);

  return await writeFile(formatedPokemons);
};

const amount =
  process.argv.indexOf("-n") > -1
    ? parseInt(process.argv[3], 10) > 0 && parseInt(process.argv[3], 10) <= 151
      ? parseInt(process.argv[3], 10)
      : 15
    : 15;

generateDataSet(amount);
