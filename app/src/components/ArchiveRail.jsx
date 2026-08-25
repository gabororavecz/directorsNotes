import films from "../data/films";
import FilmCard from "./FilmCard";

function ArchiveRail() {
  return (
    <section className="archive-rail">
      <div className="archive-rail__intro">
        <p>Directors Notes Archive</p>

        <h2>From the Archive</h2>

        <p>
          Discover films from the archive, selected for their
          distinctive visual style and storytelling.
        </p>
      </div>

      <div className="archive-rail__films">
        {films.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </section>
  );
}

export default ArchiveRail;