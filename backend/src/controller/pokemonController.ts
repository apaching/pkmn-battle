import fetch from "node-fetch";
import { Request, Response } from "express";
import { PokemonData } from "../model/PokemonData";
import { PokeApiResponse } from "../model/PokeApiResponse";
 
const fetchPokemon = async (pokemon: string) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;

    try {
        const response = await fetch(url)

        if(!response.ok) {
            throw("Pokemon not found")
        } else {
            const pokemonData = (await response.json()) as PokeApiResponse
        
            const pokemon: PokemonData = {
                name: pokemonData.name,
                front_default: pokemonData.sprites.front_default, 
                back_default: pokemonData.sprites.back_default,
                hp: pokemonData.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0,
                attack: pokemonData.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0, // Extracting Base Attack from stats
            };
    
            return pokemon;
        }

    } catch(error) {
        console.log(error)
    } 
} 

export const returnPokemonData = async (req: Request, res: Response) => {
    const pokemon = req.params.pokemon
    const pokemonData = await fetchPokemon(pokemon)
    res.json(pokemonData)
}

export const initiateFight = async (req: Request, res: Response) => {
    const pokemonOneHP = parseInt(req.params.pokemonOneHP)
    const pokemonOneATT = parseInt(req.params.pokemonOneATT)

    const pokemonTwoHP = parseInt(req.params.pokemonTwoATT)
    const pokemonTwoATT = parseInt(req.params.pokemonTwoATT)

    const pokemonOneRemainingHP = Math.max(pokemonOneHP - pokemonTwoATT)
    const pokemonTwoRemainingHP = Math.max(pokemonTwoHP - pokemonOneATT)

    let status = ""

    if(pokemonOneRemainingHP > pokemonTwoRemainingHP) {
        status = "Your pokemon won!"
    } else if (pokemonTwoRemainingHP > pokemonOneRemainingHP) {
        status = "Enemy pokemon won!"
    } else if (pokemonOneRemainingHP === pokemonTwoRemainingHP) {
        status = "The battle is a draw!"
    }

    res.json(status)
}

export const imageUrlToBase64 = async (req: Request, res: Response) => {
    const response = await fetch(req.params.imageURL)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    res.send(buffer.toString('base64'))
};

