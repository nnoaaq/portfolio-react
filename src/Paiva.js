import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
export default function Paiva({ paiva }) {
  return (
    <>
      <div className="paiva">
        <p className="paivamaara">
          {paiva.aika} <FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon>
        </p>
        <p className="lampotila">{paiva.lampotila} </p>
        <figure>
          <img
            alt=""
            src={`https://public.bc.fi/s1900877/portfolio/kuvat/${paiva.kuvake}@2x.png`}
          ></img>
        </figure>
      </div>
    </>
  );
}
