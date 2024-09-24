import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BattleScreen from "./components/BattleScreen/BattleScreen";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BattleScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
