export default function Header({
  termoBusca = '',
  aoBuscar = () => {},
  filtroConferencia = 'TODAS',
  aoFiltrar = () => {},
  astroDestaque = null,
  aoAvancarDestaque = () => {},
  aoVoltarDestaque = () => {},
  modoVisualizacao = 'cards',
  aoTrocarModo = () => {},
  qtdFavoritos = 0,
  totalJogadores = 6
}) {
  const conferencias = [
    { id: 'TODAS', label: '🌸 Todos os Astros', count: 6 },
    { id: 'Oeste', label: '🏆 Conf. Oeste', count: 4 },
    { id: 'Leste', label: '⚡ Conf. Leste', count: 2 }
  ];

  return (
    <header className="header" id="main-header">
      {/* 1. BARRA DE NAVEGAÇÃO SUPERIOR FIXA */}
      <nav className="top-navbar" aria-label="Navegação Principal">
        <div className="nav-brand">
          <div className="brand-logo-circle">🏀</div>
          <div className="brand-text">
            <span className="brand-title">NBA ASTROS</span>
            <span className="brand-badge">ROSE GOLD EDITION</span>
          </div>
        </div>

        <div className="student-pill-header">
          <span className="student-icon" aria-hidden="true">🌸</span>
          <div className="student-info-inline">
            <strong>Gabriela do Nascimento</strong>
            <span className="student-tag">Turma 3B</span>
          </div>
        </div>

        <div className="nav-controls">
          <div className="view-mode-toggle" role="group" aria-label="Modo de visualização">
            <button
              type="button"
              className={`mode-btn ${modoVisualizacao === 'cards' ? 'active' : ''}`}
              onClick={() => aoTrocarModo('cards')}
              title="Visualização em Cards 3D"
            >
              <span className="mode-icon">🃏</span>
              <span className="mode-text">Cards 3D</span>
            </button>
            <button
              type="button"
              className={`mode-btn ${modoVisualizacao === 'arena' ? 'active' : ''}`}
              onClick={() => aoTrocarModo('arena')}
              title="Modo Arena Spotlight"
            >
              <span className="mode-icon">🏟️</span>
              <span className="mode-text">Arena</span>
            </button>
            <button
              type="button"
              className={`mode-btn ${modoVisualizacao === 'tabela' ? 'active' : ''}`}
              onClick={() => aoTrocarModo('tabela')}
              title="Modo Comparação em Tabela"
            >
              <span className="mode-icon">📊</span>
              <span className="mode-text">Tabela</span>
            </button>
          </div>

          <div className="favorites-indicator" title="Atletas favoritados">
            <span className="fav-heart">❤️</span>
            <span className="fav-count">{qtdFavoritos}</span>
          </div>
        </div>
      </nav>

      {/* 2. HERO SHOWCASE: ARENA SPOTLIGHT BANNER */}
      <section className="hero-showcase">
        <div className="hero-grid">
          {/* Lado Esquerdo: Textos, Título e Controles */}
          <div className="hero-content">
            <div className="season-pill">
              <span className="pulsing-green-dot"></span>
              TEMPORADA OFICIAL NBA 2024-25
            </div>

            <h1 className="header-title">
              🏀 NBA Astros Gallery
            </h1>

            <p className="hero-description">
              Uma galeria elegante e interativa reunindo os maiores ícones do basquete mundial.
              Projeto frontend modular desenvolvido por <strong>Gabriela do Nascimento</strong> com <strong>React 19</strong> e <strong>useEffect</strong>.
            </p>

            {/* Barra de Busca Rápida */}
            <div className="hero-search-wrapper">
              <span className="search-symbol" aria-hidden="true">🔍</span>
              <input
                type="text"
                placeholder="Pesquise por astro, time, posição ou camisa..."
                value={termoBusca}
                onChange={(e) => aoBuscar(e.target.value)}
                className="hero-search-input"
                aria-label="Buscar atleta na galeria"
              />
              {termoBusca && (
                <button
                  type="button"
                  className="hero-search-clear"
                  onClick={() => aoBuscar('')}
                  title="Limpar busca"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filtros em Pílulas */}
            <div className="conference-filter-row">
              <span className="filter-label">Filtrar por:</span>
              <div className="filter-chips-list">
                {conferencias.map((conf) => (
                  <button
                    key={conf.id}
                    type="button"
                    className={`conf-chip ${filtroConferencia === conf.id ? 'active' : ''}`}
                    onClick={() => aoFiltrar(conf.id)}
                  >
                    {conf.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lado Direito: Palco 3D do Astro em Destaque */}
          {astroDestaque && (
            <div className="hero-spotlight-stage">
              <div className="spotlight-card">
                {/* Cabeçalho do Card Spotlight */}
                <div className="spotlight-header">
                  <div className="spotlight-badge-mvp">
                    <span className="fire-icon">✨</span> ASTRO EM DESTAQUE
                  </div>
                  <div className="spotlight-jersey-tag">
                    #{astroDestaque.numero} • {astroDestaque.sigla}
                  </div>
                </div>

                {/* Recorte da Imagem do Atleta com Halo Iluminado */}
                <div className="spotlight-image-holder">
                  <div className="spotlight-halo"></div>
                  <img
                    src={astroDestaque.foto}
                    alt={`Foto de ${astroDestaque.nome}`}
                    className="spotlight-player-img"
                  />
                  <div className="spotlight-nickname-banner">
                    {astroDestaque.apelido}
                  </div>
                </div>

                {/* Dados do Jogador Selecionado */}
                <div className="spotlight-details">
                  <h2 className="spotlight-player-name">{astroDestaque.nome}</h2>
                  <p className="spotlight-player-team">
                    {astroDestaque.posicao} • <strong>{astroDestaque.time}</strong>
                  </p>

                  <div className="spotlight-stats-row">
                    <div className="mini-stat">
                      <span className="val">{astroDestaque.pontos}</span>
                      <span className="lbl">Pontos</span>
                    </div>
                    <div className="mini-stat">
                      <span className="val">{astroDestaque.rebotes}</span>
                      <span className="lbl">Rebotes</span>
                    </div>
                    <div className="mini-stat">
                      <span className="val">{astroDestaque.assistencias}</span>
                      <span className="lbl">Assistências</span>
                    </div>
                  </div>

                  <p className="spotlight-curiosity">
                    💡 <em>{astroDestaque.curiosidade}</em>
                  </p>
                </div>

                {/* Navegação entre astros do spotlight */}
                <div className="spotlight-nav-actions">
                  <button
                    type="button"
                    className="spotlight-arrow-btn"
                    onClick={aoVoltarDestaque}
                    title="Astro anterior"
                  >
                    ◀ Anterior
                  </button>
                  <span className="spotlight-counter">
                    Clique em qualquer card abaixo para focar
                  </span>
                  <button
                    type="button"
                    className="spotlight-arrow-btn"
                    onClick={aoAvancarDestaque}
                    title="Próximo astro"
                  >
                    Próximo ▶
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. BARRA DE RESUMO INFORMATIVO */}
      <div className="gallery-status-bar">
        <div className="status-item">
          <span className="status-icon">🌸</span>
          <span>Exibindo <strong>{totalJogadores}</strong> astros na quadra</span>
        </div>
        <div className="status-separator"></div>
        <div className="status-item">
          <span className="status-icon">🏆</span>
          <span>Conferências Leste e Oeste</span>
        </div>
        <div className="status-separator"></div>
        <div className="status-item">
          <span className="status-icon">✨</span>
          <span>Atualizado via <strong>useEffect</strong></span>
        </div>
      </div>
    </header>
  );
}
