import express from "express"
import { imageUrlToBase64, initiateFight, returnPokemonData } from "../controller/pokemonController"

export const pokemonRouter = express.Router()

pokemonRouter.get(`/get_pokemon/:pokemon`, returnPokemonData)
pokemonRouter.get(`/get_image/:imageURL`, imageUrlToBase64)
pokemonRouter.get(`/fight/:pokemonOneHP&:pokemonOneATT&:pokemonTwoHP&:pokemonTwoATT`, initiateFight)
