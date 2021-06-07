import React, { useState } from "react";

export default function Etusivu() {
  const [otsikko] = useState(
    "Olen Noa Julkunen, WEB - ohjelmoinnin opiskelija ja tämä on minun portfolioni"
  );
  return (
    <>
      <div className="etusivu-tausta">
        <div className="etusivu-teksti">
          <h3>{otsikko} </h3>
          <button className="cta">Tutustu osaamiseeni</button>
        </div>
      </div>
    </>
  );
}
