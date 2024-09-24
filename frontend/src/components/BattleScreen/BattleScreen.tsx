import battleground_bg from "../../assets/pokemon-battleground-background.jpg";
import pokemon_one from "../../assets/charmander-back-sprite.png";
import pokemon_two from "../../assets/charmander-front-sprite.png";
import BottomPrompt from "../BottomPrompt/BottomPrompt";
import "./BattleScreen.css";
import HealthBar from "../HealthBar/HealthBar";
import { useEffect, useState } from "react";
import { PokemonData } from "../../../../backend/src/model/PokemonData";

const BattleScreen = () => {
  const [pokemonOne, setPokemonOne] = useState<PokemonData | null>(null);
  const [pokemonTwo, setPokemonTwo] = useState<PokemonData | null>(null);

  const fetchPokemon = async (pokemonName: string, side: "left" | "right") => {
    try {
      const response = await fetch(
        `http://localhost:3000/pokemon/get_pokemon/${pokemonName}`
      );

      if (!response.ok) {
        throw new Error("Pokemon not found");
      }

      const data = (await response.json()) as PokemonData;

      if (side === "left") {
        setPokemonOne(data);
      } else {
        setPokemonTwo(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [prompt, setPrompt] = useState("");

  const handleOnConfirmLeft = (pokemonName: string) => {
    fetchPokemon(pokemonName, "left");
  };

  const handleOnConfirmRight = (pokemonName: string) => {
    fetchPokemon(pokemonName, "right");
  };

  const handleOnFightClick = async () => {
    const pokemonOneHP = pokemonOne?.hp;
    const pokemonOneATT = pokemonOne?.attack;
    const pokemonTwoHP = pokemonTwo?.hp;
    const pokemonTwoATT = pokemonTwo?.attack;

    try {
      const response = await fetch(
        `http://localhost:3000/pokemon/fight/${pokemonOneHP}&${pokemonOneATT}&${pokemonTwoHP}&${pokemonTwoATT}`
      );

      const data = (await response.json()) as string;

      setPrompt(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="battle-screen">
        <img src={battleground_bg} className="battle-background"></img>
        <img
          src={pokemonOne?.back_default}
          className="pokemon bottom-left"
        ></img>
        <img
          src={pokemonTwo?.front_default}
          className="pokemon top-right"
        ></img>
        <HealthBar
          pokemonData={pokemonOne}
          side="left"
          onConfirmClick={handleOnConfirmLeft}
        />
        <HealthBar
          pokemonData={pokemonTwo}
          side="right"
          onConfirmClick={handleOnConfirmRight}
        />
        <BottomPrompt
          onFightClick={handleOnFightClick}
          prompt={prompt}
        ></BottomPrompt>
      </div>
    </>
  );
};

export default BattleScreen;
