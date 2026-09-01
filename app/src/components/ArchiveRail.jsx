// useState is a React Hook.
// It allows our component to remember information that can change
// while the user interacts with the page.
import { useState } from "react";

// Import the array of fictional films from films.js.
import films from "../data/films";

// FilmCard displays one individual film.
import FilmCard from "./FilmCard";

// FeaturedFilm displays the film selected by the user.
import FeaturedFilm from "./FeaturedFilm";

function ArchiveRail() {
  // =========================================================
  // FILTER STATE
  // =========================================================

  // Stores the currently selected filter.
  //
  // "All" means that every film should be displayed.
  const [filter, setFilter] = useState("All");

  // =========================================================
  // SORT STATE
  // =========================================================

  // Stores the current sorting option.
  //
  // We start with "newest", so the newest films appear first.
  const [sortOrder, setSortOrder] = useState("newest");

  // =========================================================
  // DISPLAY MODE STATE
  // =========================================================

  // Stores whether the films are displayed as:
  //
  // "grid" → films displayed in columns
  // "list" → films displayed in a list
  //
  // We also check localStorage so the browser can remember
  // the user's previous choice.
  const [displayMode, setDisplayMode] = useState(() => {
    return localStorage.getItem("archive-display-mode") || "grid";
  });

  // =========================================================
  // FEATURED FILM STATE
  // =========================================================

  // Stores the film currently displayed in the FeaturedFilm
  // section.
  //
  // This is completely separate from the selection system below.
  const [selectedFilm, setSelectedFilm] = useState(films[0]);

  // =========================================================
  // FILM SELECTION STATE
  // =========================================================

  // Stores all films that the user has selected using
  // the "Select Film" button.
  //
  // This is a separate function from FeaturedFilm.
  const [selectedFilms, setSelectedFilms] = useState([]);

  // =========================================================
  // TOGGLE FILM SELECTION
  // =========================================================

  // Adds a film to the selection list.
  //
  // If the film is already selected, clicking the button
  // again removes it from the selection list.
  const toggleFilmSelection = (film) => {
    setSelectedFilms((current) => {
      // Check whether this film is already selected.
      const alreadySelected = current.some(
        (selectedFilm) => selectedFilm.id === film.id,
      );

      // If the film is already selected,
      // remove it from the selection.
      if (alreadySelected) {
        return current.filter((selectedFilm) => selectedFilm.id !== film.id);
      }

      // Otherwise add the film to the selection.
      return [...current, film];
    });
  };

  // =========================================================
  // FILTER THE FILMS
  // =========================================================

  // If the selected filter is "All",
  // use every film.
  //
  // Otherwise, only include films whose "form"
  // matches the selected filter.
  const filteredFilms =
    filter === "All" ? films : films.filter((film) => film.form === filter);

  // =========================================================
  // SORT THE FILMS
  // =========================================================

  // Make a copy before sorting.
  //
  // This is important because .sort() changes the array
  // that it operates on.
  const sortedFilms = [...filteredFilms].sort((a, b) => {
    // Newest first.
    if (sortOrder === "newest") {
      return b.year - a.year;
    }

    // Oldest first.
    return a.year - b.year;
  });

  // =========================================================
  // SAVE DISPLAY PREFERENCE
  // =========================================================

  // Called when the user chooses Grid or List.
  const handleDisplayMode = (mode) => {
    // Update React state.
    setDisplayMode(mode);

    // Save the choice in the browser.
    localStorage.setItem("archive-display-mode", mode);
  };

  // =========================================================
  // COMPONENT UI
  // =========================================================

  return (
    <section className="archive-rail">
      {/* =====================================================
          INTRODUCTION
          ===================================================== */}

      <div className="archive-rail__intro">
        {/* Small editorial label */}
        <p>Directors Notes Archive</p>

        {/* Main heading */}
        <h2>From the Archive</h2>

        {/* Description */}
        <p>
          Discover films from the archive, selected for their distinctive visual
          style and storytelling.
        </p>
      </div>

      {/* =====================================================
          SELECTION COUNT
          ===================================================== */}

      {/*

        This belongs inside the return because it is
        part of the page UI.

        It only appears when at least one film
        has been selected using the selection button.

      */}

      {selectedFilms.length > 0 && (
        <p className="selection-count">
          {selectedFilms.length} film
          {selectedFilms.length !== 1 ? "s" : ""} selected
        </p>
      )}

      {/* =====================================================
          CONTROLS
          ===================================================== */}

      <div className="archive-rail__controls">
        {/* FILTER BUTTONS */}

        <div className="archive-rail__filters">
          {/* ALL */}
          <button
            onClick={() => setFilter("All")}
            className={filter === "All" ? "active" : ""}
          >
            All
          </button>

          {/* DOCUMENTARY */}
          <button
            onClick={() => setFilter("Documentary")}
            className={filter === "Documentary" ? "active" : ""}
          >
            Documentary
          </button>

          {/* DRAMA */}
          <button
            onClick={() => setFilter("Drama")}
            className={filter === "Drama" ? "active" : ""}
          >
            Drama
          </button>

          {/* ANIMATION */}
          <button
            onClick={() => setFilter("Animation")}
            className={filter === "Animation" ? "active" : ""}
          >
            Animation
          </button>

          {/* EXPERIMENTAL */}
          <button
            onClick={() => setFilter("Experimental")}
            className={filter === "Experimental" ? "active" : ""}
          >
            Experimental
          </button>
        </div>

        {/* SORT + DISPLAY OPTIONS */}

        <div className="archive-rail__options">
          {/* SORT LABEL */}
          <label htmlFor="sort-films">Sort</label>

          {/* SORT DROPDOWN */}
          <select
            id="sort-films"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="newest">Newest</option>

            <option value="oldest">Oldest</option>
          </select>

          {/* GRID BUTTON */}
          <button
            onClick={() => handleDisplayMode("grid")}
            className={displayMode === "grid" ? "active" : ""}
          >
            Grid
          </button>

          {/* LIST BUTTON */}
          <button
            onClick={() => handleDisplayMode("list")}
            className={displayMode === "list" ? "active" : ""}
          >
            List
          </button>
        </div>
      </div>

      {/* =====================================================
          FEATURED FILM
          ===================================================== */}

      {/*
        Clicking a FILM CARD changes selectedFilm.

        This is the existing FeaturedFilm functionality.

        It is completely separate from selectedFilms.
      */}

      <FeaturedFilm film={selectedFilm} />

      {/* =====================================================
          FILM GRID / LIST
          ===================================================== */}

      <div
        className={`archive-rail__films archive-rail__films--${displayMode}`}
      >
        {sortedFilms.map((film) => (
          <FilmCard
            key={film.id}
            film={film}
            // Clicking the card changes the FeaturedFilm.
            onSelect={setSelectedFilm}
            // Clicking the button controls the separate selection list.
            onToggleSelection={toggleFilmSelection}
            // Controls the green line on the currently featured film.
            isSelected={selectedFilm.id === film.id}
            // Controls whether the selection button says
            // "SELECT FILM" or "SELECTED ✓".
            isSelectionActive={selectedFilms.some(
              (selectedFilm) => selectedFilm.id === film.id,
            )}
          />
        ))}
      </div>
    </section>
  );
}

// Export ArchiveRail so it can be used elsewhere.
export default ArchiveRail;
