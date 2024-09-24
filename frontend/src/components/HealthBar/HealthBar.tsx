import { useEffect, useState } from "react";
import "./HealthBar.css";
import { PokemonData } from "../../../../backend/src/model/PokemonData";

interface Properties {
  pokemonData: PokemonData | null;
  side: string;
  onConfirmClick: (pokemonName: string) => void;
}

const HealthBar = ({ pokemonData, side, onConfirmClick }: Properties) => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(pokemonData);
  const [userInput, setPokemonName] = useState("");

  useEffect(() => {
    setPokemon(pokemonData);
  }, [pokemonData]);

  return (
    <div className={`health-bar ${side}`}>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Enter Pokémon name"
        className="pokemon-name-input"
      />
      {pokemon && pokemon?.hp > 0 && (
        <div className="health-container">
          <div className="health-label">HP</div>
          <div className="health-bar-fill" style={{ width: `${pokemon?.hp}%` }}>
            {pokemon?.hp}
          </div>
          <div className="health-label">ATT</div>
          <div
            className="attack-bar-fill"
            style={{ width: `${pokemon?.attack}%` }}
          >
            {pokemon?.attack}
          </div>
        </div>
      )}
      <button
        className={`confirm-button ${side}`}
        onClick={() => onConfirmClick(userInput)}
      >
        Confirm
      </button>
    </div>
  );
};

export default HealthBar;
