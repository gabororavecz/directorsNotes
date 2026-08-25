function FilmCard({ film }) {
  return (
    <article className="film-card">
      <div className="film-card__poster">
        {film.poster ? (
          <img
            src={film.poster}
            alt={film.posterAlt}
          />
        ) : (
          <div className="film-card__poster-placeholder">
            No poster available
          </div>
        )}
      </div>

      <div className="film-card__content">
        <p className="film-card__form">
          {film.form}
        </p>

        <h3>{film.title}</h3>

        <p className="film-card__meta">
          {film.country} · {film.year}
        </p>

        <p className="film-card__synopsis">
          {film.synopsis}
        </p>

        <div className="film-card__themes">
          {film.themes.map((theme) => (
            <span key={theme}>{theme}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default FilmCard;