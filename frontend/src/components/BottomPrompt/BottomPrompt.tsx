import { Children, ReactNode, useEffect, useState } from "react";
import "./BottomPrompt.css";

interface Properties {
  prompt: string;
  onFightClick: () => void;
}

const BottomPrompt = ({ prompt, onFightClick }: Properties) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayText("");
    setIndex(0);
  }, [prompt]);

  useEffect(() => {
    if (index < prompt.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + prompt.charAt(index));
        setIndex((prev) => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [index, prompt]);

  return (
    <div className="bottom-prompt">
      <p className="prompt-text">{displayText}</p>
      <button onClick={onFightClick} className="button">
        FIGHT!
      </button>
    </div>
  );
};

export default BottomPrompt;
