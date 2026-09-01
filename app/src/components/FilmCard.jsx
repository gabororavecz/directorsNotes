
// FilmCard displays one individual film from the archive.
//
// ArchiveRail passes two things into this component:
//
// film     → the film's data
// onSelect → the function that selects the film

function FilmCard({ film, onSelect, isSelected }) {

  return (
    <article 
  className={`film-card ${isSelected ? "film-card--selected" : ""}`}
    // When the user clicks anywhere on the card,
      // send this film back to ArchiveRail.
  onClick={() => onSelect(film)}
>
    
   

      {/* Film poster */}
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


      {/* Film information */}
      <div className="film-card__content">

        {/* Film type */}
        <p className="film-card__form">
          {film.form}
        </p>

        {/* Film title */}
        <h3>{film.title}</h3>

        {/* Country and year */}
        <p className="film-card__meta">
          {film.country} · {film.year}
        </p>

        {/* Film synopsis */}
        <p className="film-card__synopsis">
          {film.synopsis}
        </p>

        {/* Film themes */}
        <div className="film-card__themes">

          {film.themes.map((theme) => (
            <span key={theme}>
              {theme}
            </span>
          ))}

        </div>

      </div>

    </article>
  );
}

export default FilmCard;
