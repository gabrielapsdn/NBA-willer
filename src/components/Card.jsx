export default function Card({
  jogador,
  nome,
  foto,
  isSelected = false,
  onSelect = () => {},
  isFavorite = false,
  onToggleFavorite = () => {}
}) {
  const atletaNome = nome || jogador?.nome || 'Atleta NBA';
  const atletaFoto = foto || jogador?.foto || '';
  const atletaNumero = jogador?.numero || '00';
  const atletaTime = jogador?.time || 'NBA Franchise';
  const atletaSigla = jogador?.sigla || 'NBA';
  const atletaPosicao = jogador?.posicao || 'Jogador';
  const atletaConferencia = jogador?.conferencia || 'NBA';
  const atletaPontos = jogador?.pontos || '25.0+ PPG';
  const atletaRebotes = jogador?.rebotes || '-- RPG';
  const atletaAssistencias = jogador?.assistencias || '-- APG';
  const atletaConquista = jogador?.conquista || 'NBA All-Star';
  const atletaApelido = jogador?.apelido || '';
  const atletaBio = jogador?.bio || '';
  const corPrimaria = jogador?.corPrimaria || '#ec4899';
  const corSecundaria = jogador?.corSecundaria || '#f472b6';

  const handleCardClick = () => {
    if (jogador) {
      onSelect(jogador);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (jogador) {
      onToggleFavorite(jogador.id);
    }
  };

  return (
    <article
      className={`card ${isSelected ? 'is-selected' : ''} ${isFavorite ? 'is-favorite' : ''}`}
      id={`card-${jogador?.id || atletaNome.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={handleCardClick}
      style={{
        '--player-primary': corPrimaria,
        '--player-secondary': corSecundaria
      }}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalhes de ${atletaNome}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {/* Topo do Card com Número e Badges de Time */}
      <div className="card-topbar">
        <div className="card-number-wrapper">
          <span className="card-jersey-number">#{atletaNumero}</span>
          <span className="card-team-tag">{atletaSigla}</span>
        </div>

        <div className="card-actions-group">
          <span className="card-conf-badge">{atletaConferencia}</span>
          <button
            type="button"
            className={`card-heart-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            aria-label={`Favoritar ${atletaNome}`}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>

      {/* Foto do Atleta com Halo e Apelido */}
      <div className="card-image-container">
        <div className="card-player-halo" aria-hidden="true"></div>
        {atletaApelido && (
          <span className="card-nickname-pill">{atletaApelido}</span>
        )}
        <img
          src={atletaFoto}
          alt={`Foto de ${atletaNome}`}
          className="card-img"
          loading="lazy"
        />
      </div>

      {/* Corpo do Card com Dados e Estatísticas */}
      <div className="card-body">
        <div className="card-franchise-row">
          <span className="franchise-dot" aria-hidden="true"></span>
          <span className="card-franchise-name">{atletaTime}</span>
        </div>

        <h3 className="card-title">{atletaNome}</h3>
        <p className="card-position-text">{atletaPosicao}</p>

        {/* Trinca de Estatísticas Rápidas */}
        <div className="card-tri-stats">
          <div className="tri-stat">
            <span className="tri-stat-val">{atletaPontos}</span>
            <span className="tri-stat-lbl">Pontos</span>
          </div>
          <div className="tri-divider"></div>
          <div className="tri-stat">
            <span className="tri-stat-val">{atletaRebotes}</span>
            <span className="tri-stat-lbl">Rebotes</span>
          </div>
          <div className="tri-divider"></div>
          <div className="tri-stat">
            <span className="tri-stat-val">{atletaAssistencias}</span>
            <span className="tri-stat-lbl">Assists</span>
          </div>
        </div>

        {/* Faixa de Conquista */}
        <div className="card-trophy-ribbon">
          <span className="trophy-icon">🏆</span>
          <span className="trophy-text">{atletaConquista}</span>
        </div>

        {atletaBio && (
          <p className="card-bio-snippet">{atletaBio}</p>
        )}

        {/* Botão de Destaque / Selecionar */}
        <div className="card-select-btn">
          {isSelected ? '✨ Astro em Destaque' : '🎯 Focar no Palco'}
        </div>
      </div>

      {/* Linha de brilho inferior */}
      <div className="card-laser-line" aria-hidden="true"></div>
    </article>
  );
}
