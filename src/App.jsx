import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import { jogadoresIniciais } from './data/jogadores';
import './App.css';

function App() {
  // Estado principal obrigatório para carregar os atletas
  const [jogadores, setJogadores] = useState([]);
  
  // Estado para o astro selecionado no palco principal (Spotlight)
  const [astroSelecionado, setAstroSelecionado] = useState(null);

  // Estados de busca, filtro e favoritos
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroConferencia, setFiltroConferencia] = useState('TODAS');
  const [favoritosIds, setFavoritosIds] = useState([1]); // LeBron James pré-favoritado como exemplo

  // Modo de visualização da galeria: 'cards' | 'arena' | 'tabela'
  const [modoVisualizacao, setModoVisualizacao] = useState('cards');

  // Hook useEffect obrigatório para carregar os dados simulados ao iniciar
  useEffect(() => {
    setJogadores(jogadoresIniciais);
    if (jogadoresIniciais.length > 0) {
      setAstroSelecionado(jogadoresIniciais[0]);
    }
  }, []);

  // Alternar astro favorito
  const alternarFavorito = (id) => {
    setFavoritosIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Navegação no spotlight
  const avancarDestaque = () => {
    if (!jogadores.length) return;
    const indiceAtual = jogadores.findIndex((j) => j.id === astroSelecionado?.id);
    const proximoIndice = (indiceAtual + 1) % jogadores.length;
    setAstroSelecionado(jogadores[proximoIndice]);
  };

  const voltarDestaque = () => {
    if (!jogadores.length) return;
    const indiceAtual = jogadores.findIndex((j) => j.id === astroSelecionado?.id);
    const indiceAnterior = (indiceAtual - 1 + jogadores.length) % jogadores.length;
    setAstroSelecionado(jogadores[indiceAnterior]);
  };

  // Filtragem dos atletas para a galeria
  const jogadoresFiltrados = useMemo(() => {
    return jogadores.filter((jogador) => {
      const matchConferencia =
        filtroConferencia === 'TODAS' || jogador.conferencia === filtroConferencia;

      const termo = termoBusca.toLowerCase().trim();
      const matchBusca =
        !termo ||
        jogador.nome.toLowerCase().includes(termo) ||
        (jogador.time && jogador.time.toLowerCase().includes(termo)) ||
        (jogador.posicao && jogador.posicao.toLowerCase().includes(termo)) ||
        (jogador.apelido && jogador.apelido.toLowerCase().includes(termo)) ||
        (jogador.numero && jogador.numero.toString().includes(termo));

      return matchConferencia && matchBusca;
    });
  }, [jogadores, termoBusca, filtroConferencia]);

  return (
    <div className="app">
      {/* Cabeçalho, Hero Spotlight e Controles */}
      <Header
        termoBusca={termoBusca}
        aoBuscar={setTermoBusca}
        filtroConferencia={filtroConferencia}
        aoFiltrar={setFiltroConferencia}
        astroDestaque={astroSelecionado}
        aoAvancarDestaque={avancarDestaque}
        aoVoltarDestaque={voltarDestaque}
        modoVisualizacao={modoVisualizacao}
        aoTrocarModo={setModoVisualizacao}
        qtdFavoritos={favoritosIds.length}
        totalJogadores={jogadoresFiltrados.length}
      />

      {/* Conteúdo Principal com Múltiplos Modos de Visualização */}
      <main className="gallery-container">
        {jogadoresFiltrados.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">🏀</span>
            <h3>Nenhum astro encontrado na quadra</h3>
            <p>Não encontramos nenhum atleta correspondente ao filtro informado.</p>
            <button
              type="button"
              className="reset-filter-btn"
              onClick={() => {
                setTermoBusca('');
                setFiltroConferencia('TODAS');
              }}
            >
              🔄 Limpar Filtros e Mostrar Todos
            </button>
          </div>
        ) : (
          <>
            {/* MODO 1: CARDS 3D EM GRADE */}
            {modoVisualizacao === 'cards' && (
              <section className="cards-grid" aria-label="Galeria de Astros em Cards">
                {jogadoresFiltrados.map((jogador) => (
                  <Card
                    key={jogador.id}
                    jogador={jogador}
                    nome={jogador.nome}
                    foto={jogador.foto}
                    isSelected={astroSelecionado?.id === jogador.id}
                    onSelect={setAstroSelecionado}
                    isFavorite={favoritosIds.includes(jogador.id)}
                    onToggleFavorite={alternarFavorito}
                  />
                ))}
              </section>
            )}

            {/* MODO 2: ARENA CAROUSEL & COMPARATIVO */}
            {modoVisualizacao === 'arena' && (
              <section className="arena-mode-section" aria-label="Visualização em Modo Arena">
                <div className="arena-mode-header">
                  <h2>🏟️ Arena Panorâmica dos Atletas</h2>
                  <p>Navegue pelos atletas e veja as métricas detalhadas de cada astro.</p>
                </div>

                <div className="arena-deck-track">
                  {jogadoresFiltrados.map((jogador) => {
                    const isFocado = astroSelecionado?.id === jogador.id;
                    return (
                      <div
                        key={jogador.id}
                        className={`arena-deck-item ${isFocado ? 'is-focused' : ''}`}
                        onClick={() => setAstroSelecionado(jogador)}
                        style={{
                          '--player-accent': jogador.corPrimaria,
                          '--player-glow': jogador.corSecundaria
                        }}
                      >
                        <div className="arena-deck-number">#{jogador.numero}</div>
                        <img
                          src={jogador.foto}
                          alt={jogador.nome}
                          className="arena-deck-img"
                        />
                        <div className="arena-deck-info">
                          <span className="arena-deck-name">{jogador.nome}</span>
                          <span className="arena-deck-team">{jogador.time}</span>
                          <span className="arena-deck-pts">{jogador.pontos}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* MODO 3: TABELA DE COMPARAÇÃO TÉCNICA */}
            {modoVisualizacao === 'tabela' && (
              <section className="stats-table-section" aria-label="Tabela Comparativa de Estatísticas">
                <div className="table-header-box">
                  <h2>📊 Tabela Comparativa de Estatísticas</h2>
                  <p>Métricas oficiais da temporada dos astros da liga.</p>
                </div>

                <div className="table-responsive-wrapper">
                  <table className="stats-table">
                    <thead>
                      <tr>
                        <th>Atleta</th>
                        <th>Camisa</th>
                        <th>Posição</th>
                        <th>Franquia</th>
                        <th>Conferência</th>
                        <th>Pontos (PPG)</th>
                        <th>Rebotes</th>
                        <th>Assists</th>
                        <th>Conquista</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jogadoresFiltrados.map((jogador) => (
                        <tr
                          key={jogador.id}
                          className={astroSelecionado?.id === jogador.id ? 'highlight-row' : ''}
                        >
                          <td className="player-td">
                            <img
                              src={jogador.foto}
                              alt={jogador.nome}
                              className="table-avatar"
                            />
                            <div className="table-player-text">
                              <strong>{jogador.nome}</strong>
                              <span className="table-nickname">{jogador.apelido}</span>
                            </div>
                          </td>
                          <td className="jersey-td">#{jogador.numero}</td>
                          <td>{jogador.posicao}</td>
                          <td>
                            <span className="table-team-pill" style={{ borderColor: jogador.corPrimaria }}>
                              {jogador.time}
                            </span>
                          </td>
                          <td>{jogador.conferencia}</td>
                          <td className="stat-bold">{jogador.pontos}</td>
                          <td>{jogador.rebotes}</td>
                          <td>{jogador.assistencias}</td>
                          <td className="achievement-td">{jogador.conquista}</td>
                          <td>
                            <button
                              type="button"
                              className="table-focus-btn"
                              onClick={() => {
                                setAstroSelecionado(jogador);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                            >
                              🎯 Focar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* Rodapé Premium com Autoria */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-court-logo">🏀</div>
          
          <div className="footer-author-box">
            <span className="footer-author-title">Trabalho Prático de Desenvolvimento Frontend</span>
            <h3 className="footer-author-name">Gabriela do Nascimento</h3>
            <span className="footer-author-meta">Turma 3B • Ensino Médio / Técnico</span>
          </div>

          <div className="footer-tags-row">
            <span className="footer-tag">⚡ React 19</span>
            <span className="footer-tag">⚡ Vite 8</span>
            <span className="footer-tag">⚡ Hooks (useEffect & useState)</span>
            <span className="footer-tag">⚡ Componentes Modulares</span>
            <span className="footer-tag">⚡ CSS Grid & Glassmorphism</span>
          </div>

          <p className="footer-legal">
            © {new Date().getFullYear()} NBA Astros Gallery. Todos os direitos reservados para fins educacionais.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
