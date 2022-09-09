import './pokedex.css';
import React, { useEffect, useState } from "react";
import { Pokemon } from './pokemon';

const server = "https://raw.githubusercontent.com/ramclen/Poke-Server/master"

const getPokemon = () => {
  return fetch(
    `${server}/pokedex.json`
  ).then((res) => res.json());
};

const getPokemonInfo = () => {
  return fetch(
    `${server}/descriptions.json`
  ).then((res) => res.json());
};

export const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFiltered, setPokemonFiltered] = useState([]);
  const [value, setValue] = useState(""); //why pikachu
  const [selected, setSelected] = useState({});
  // const [pokemonInfo, setPokemonInfo] = useState({});

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  const handleClick = (poke) => {
    setSelected(poke);
  };

  const loadData = async () => {
    let [description, pokeFetch] = await Promise.all([getPokemonInfo(), getPokemon()]);

    pokeFetch = pokeFetch[3].Pokedex;

    pokeFetch = pokeFetch.map((pokemon, index) => {
      return {...pokemon, ...description[index]}
    });

    setPokemons(pokeFetch);
    setPokemonFiltered(pokeFetch);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const filtered = pokemons.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    setPokemonFiltered(filtered);
  }, [value]);

  return (
    <div>
      {!!Object.keys(selected).length ? (
        <div>
        <Pokemon pokemon={selected} />
        
        <button type="button" onClick={() => setSelected({})}>
            Back
          </button>
        </div>
      ) : (
        <>
        <input type="text" onChange={handleChange} value={value} />
        <ul>
          {pokemonsFiltered.map((pokemon) => {
            return (
              <li className="pokedex-item" onClick={() => handleClick(pokemon)} key={pokemon.id}>
                {pokemon.name}
              </li>
            );
          })}
        </ul>
        </>
      )}
    </div>
  );
};
