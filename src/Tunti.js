import React from "react";

export default function Tunti({ tunti }) {
  return (
    <>
      <div className="paiva">
        <p className="paivamaara">{tunti.aika}</p>
        <p className="lampotila">{tunti.lampotila} </p>
        <figure>
          <img
            alt=""
            src={`https://public.bc.fi/s1900877/portfolio/kuvat/${tunti.kuvake}@2x.png`}
          ></img>
        </figure>
      </div>
    </>
  );
}
