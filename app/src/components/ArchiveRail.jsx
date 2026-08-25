import { useState } from "react"; /* useState is a React Hook. It allows a component to remember information that can change while the user interacts with the page. */
import films from "../data/films";
import FilmCard from "./FilmCard";

function ArchiveRail() /* This defines a React component called ArchiveRail */ {
  const [filter, setFilter] = useState("All"); /* stores the currently selected filter */ 
                                                /* It creates two things: filter = the current value & setFilter = the function we use to change that value. */
                                                /* useState("All") means the initial value is: All */
  const [sortOrder, setSortOrder] = useState("newest"); 

  const [displayMode, setDisplayMode] = useState(() => { /* Browsers provide a small storage mechanism called: localStorage It lets websites store small pieces of information. */
    return localStorage.getItem("archive-display-mode") || "grid";  /* Use the saved value if there is one. Otherwise use "grid" */
  });   

  const filteredFilms =
    filter === "All"
      ? films
      : films.filter((film) => film.form === filter);

  const sortedFilms = [...filteredFilms].sort((a, b) => {
    if (sortOrder === "newest") {
      return b.year - a.year;
    }

    return a.year - b.year;
  });

  const handleDisplayMode = (mode) => {
    setDisplayMode(mode);
    localStorage.setItem("archive-display-mode", mode);
  };

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

      <div className="archive-rail__controls">

        <div className="archive-rail__filters">
          <button
            onClick={() => setFilter("All")}
            className={filter === "All" ? "active" : ""}
          >
            All
          </button>

          <button
            onClick={() => setFilter("Documentary")}
            className={filter === "Documentary" ? "active" : ""}
          >
            Documentary
          </button>

          <button
            onClick={() => setFilter("Drama")}
            className={filter === "Drama" ? "active" : ""}
          >
            Drama
          </button>

          <button
            onClick={() => setFilter("Animation")}
            className={filter === "Animation" ? "active" : ""}
          >
            Animation
          </button>

          <button
            onClick={() => setFilter("Experimental")}
            className={filter === "Experimental" ? "active" : ""}
          >
            Experimental
          </button>
        </div>

        <div className="archive-rail__options">

          <label htmlFor="sort-films">
            Sort
          </label>

          <select
            id="sort-films"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>

          <button
            onClick={() => handleDisplayMode("grid")}
            className={displayMode === "grid" ? "active" : ""}
          >
            Grid
          </button>

          <button
            onClick={() => handleDisplayMode("list")}
            className={displayMode === "list" ? "active" : ""}
          >
            List
          </button>

        </div>
      </div>

      <div
        className={`archive-rail__films archive-rail__films--${displayMode}`}
      >
        {sortedFilms.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </section>
  );
}

export default ArchiveRail;