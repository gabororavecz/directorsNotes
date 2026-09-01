// FeaturedFilm displays the film that the user has selected.
//
// ArchiveRail will pass the selected film into this component
// through the "film" prop.

function FeaturedFilm({ film }) {

  // If there is no selected film, don't render anything.
  if (!film) {
    return null;
  }

  return (
    <div className="featured-film">

      {/* Film poster */}
      <div className="featured-film__poster">

        {film.poster ? (
          <img
            src={film.poster}
            alt={film.posterAlt}
          />
        ) : (
          <div className="featured-film__poster-placeholder">
            No poster available
          </div>
        )}

      </div>

      {/* Film information */}
      <div className="featured-film__content">

        {/* Film type */}
        <p className="featured-film__form">
          {film.form}
        </p>

        {/* Film title */}
        <h2>{film.title}</h2>

        {/* Country and year */}
        <p className="featured-film__meta">
          {film.country} · {film.year}
        </p>

        {/* Film description */}
        <p className="featured-film__synopsis">
          {film.synopsis}
        </p>

        {/* Themes */}
        <div className="featured-film__themes">

          {film.themes.map((theme) => (
            <span key={theme}>
              {theme}
            </span>
          ))}

        </div>

      </div>

    </div>
  );
}

export default FeaturedFilm;


