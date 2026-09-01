function FilmCard({
  film,
  onSelect,
  onToggleSelection,
  isSelected,
  isSelectionActive,
}) {
  return (
    <article
      className={`film-card ${isSelected ? "film-card--selected" : ""}`}
      onClick={() => onSelect(film)}
    >
      {/* Film poster */}
      {isSelected && <div className="film-card__featured-label">Featured</div>} {/* Displays a Featured label when this film is currently shown in the main feature area. */}
      <div className="film-card__poster">
        {film.poster ? (
          <img src={film.poster} alt={film.posterAlt} />
        ) : (
          <div className="film-card__poster-placeholder">
            No poster available
          </div>
        )}
      </div>

      {/* Film information */}
      <div className="film-card__content">
        {/* Film type */}
        <p className="film-card__form">{film.form}</p>

        {/* Film title */}
        <h3>{film.title}</h3>

        {/* Country and year */}
        <p className="film-card__meta">
          {film.country} · {film.year}
        </p>

        {/* Film description */}
        <p className="film-card__synopsis">{film.synopsis}</p>

        {/* Themes */}
        <div className="film-card__themes">
          {film.themes.map((theme) => (
            <span key={theme}>{theme}</span>
          ))}
        </div>

        {/* =================================================
            SELECT FILM BUTTON
            ================================================= */}

        <button
          type="button"
          className="film-card__select-button"
          onClick={(event) => {
            // Stop the button click from also triggering
            // the film card's onClick.
            event.stopPropagation();

            // Run the separate selection function.
            onToggleSelection(film);
          }}
        >
          {isSelectionActive ? "SELECTED ✓" : "SELECT FILM"}
        </button>
      </div>
    </article>
  );
}

export default FilmCard;
