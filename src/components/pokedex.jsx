import React, { useEffect, useState } from "react";

const getPokemon = () => {
  return fetch(
    "https://raw.githubusercontent.com/ramclen/Poke-Server/master/pokedex.json"
  ).then((res) => res.json());
};

const getPokemonInfo = () => {
  return fetch(
    "https://raw.githubusercontent.com/ramclen/Poke-Server/master/descriptions.json"
  ).then((res) => res.json());
};

export const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFiltered, setPokemonFiltered] = useState([]);
  const [value, setValue] = useState("pikachu");
  const [selected, setSelected] = useState({});
  const [pokemonInfo, setPokemonInfo] = useState({});

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  const handleClick = ({ target }) => {
    debugger;
    setSelected(value);
  };

  useEffect(() => {
    getPokemon().then((data) => {
      const { Pokedex } = data.find(
        ({ email }) => email === "george_king@equitax.lidl"
      );

      setPokemons(Pokedex);
    });
  }, []);

  useEffect(() => {
    const filtered = pokemons.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    setPokemonFiltered(filtered);
  }, [value]);

  useEffect(() => {
    getPokemonInfo().then((data) => {
      const pokemonData = data.find(({ id }) => selected.id === id);

      setPokemonInfo(pokemonData);
    });
  }, [selected]);

  return (
    <div>
      <input type="text" onChange={handleChange} value={value} />
      <ul>
        {pokemonsFiltered.map(({ name, id }) => {
          return (
            <li onClick={handleClick} key={id}>
              {name}
            </li>
          );
        })}
      </ul>

      {pokemonInfo && (
        <div>
          {selected.name} {selected.description} <img src={selected.img} />
        </div>
      )}
    </div>
  );
};
