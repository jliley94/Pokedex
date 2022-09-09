import './pokemon.css';
import React, { useEffect, useState } from "react";

const server = "https://raw.githubusercontent.com/ramclen/Poke-Server/master"

export const Pokemon = ({ pokemon = {} }) => {
    const [isMale, isFemale] = pokemon.profile.gender.split(':')
    return (
        <>
        <h1>{pokemon.name}</h1>
        <img src={`${server}/${pokemon.image.image}`} />
        <p>
        {pokemon.description} 
        </p>
        <div>
            <h2>Type</h2>
            {pokemon.type.map((type) => {
                return <div className={`pokemon-type pokemon-type--${type.toLowerCase()}`}>{type}</div>
            })}
        </div>
        <div className="pokemon-base">
            {Object.entries(pokemon.base).map(([key, value]) => {
                return (
                <>
                <div className="pokemon-profile-title">{key}</div>
                <div className="pokemon-profile-info">{value}</div>
                </>
                )
            })}
        </div>
        <div className="pokemon-profile">
            <div className="pokemon-profile-title">Height</div>
            <div className="pokemon-profile-info">{pokemon.profile.height}</div>
            <div className="pokemon-profile-title">Weight</div>
            <div className="pokemon-profile-info">{pokemon.profile.weight}</div>
            <div className="pokemon-profile-title">Gender</div>
            <div className="pokemon-profile-info">
                {isMale > 0 && 'M'}{' '}
                {isFemale > 0 && 'F'}
                </div>
        </div>
        </>
    );
}