import "./App.css";
import { Pokedex } from "./components/pokedex";

function App() {
  return (
    <div className="App">
      <header className="App-header">Pokedex</header>
      <section>
        <Pokedex />
      </section>
    </div>
  );
}

export default App;
