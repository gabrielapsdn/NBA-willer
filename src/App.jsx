import { useState, useEffect } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import { jogadoresIniciais } from './data/jogadores';
import './App.css';

function App() {
  // Estado para armazenar os atletas
  const [jogadores, setJogadores] = useState([]);

  // Hook useEffect para carregar os dados simulados ao iniciar a tela
  useEffect(() => {
    setJogadores(jogadoresIniciais);
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="gallery-container">
        <section className="cards-grid" aria-label="Galeria de Astros da NBA">
          {jogadores.map((jogador) => (
            <Card
              key={jogador.id}
              jogador={jogador}
              nome={jogador.nome}
              foto={jogador.foto}
            />
          ))}
        </section>
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} NBA Astros Gallery • Projeto React Componentizado</p>
      </footer>
    </div>
  );
}

export default App;
