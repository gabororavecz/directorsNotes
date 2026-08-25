import { useState } from "react";

function FilmCard(props) {

    const [isSelected, setIsSelected] = useState(false);

    const buttonLabel = isSelected
  ? "Remove from programme"
  : "Add to programme";


    


  return (
    <article className="film-card">
      <p className="film-meta">
        {props?.form} · {props.country} · {props.year}
      </p>
      <h3>{props.title}</h3>
      <p>{props.synopsis}</p>
      ...
    </article>

    

  );

  

}

export default SiteHeader;