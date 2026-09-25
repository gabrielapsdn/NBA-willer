export default function Card({ jogador, nome, foto }) {
  const atletaNome = nome || jogador?.nome || 'Atleta NBA';
  const atletaFoto = foto || jogador?.foto || '';

  return (
    <article className="card" id={`card-${jogador?.id || atletaNome.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="card-image-container">
        <img
          src={atletaFoto}
          alt={`Foto de ${atletaNome}`}
          className="card-img"
          loading="lazy"
        />
      </div>
      <div className="card-body">
        <h3 className="card-title">{atletaNome}</h3>
      </div>
    </article>
  );
}
