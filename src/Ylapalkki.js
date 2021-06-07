import React, { useEffect, useState } from "react";

export default function Ylapalkki() {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset >= 125) {
        document.querySelector("header").classList.add("header-aktiivinen");
      } else if (window.pageYOffset <= 125) {
        document.querySelector("header").classList.remove("header-aktiivinen");
      }
    });
    window.addEventListener("resize", () => {
      paivitaLeveys(window.innerWidth);
    });
    document.querySelector(".cta").addEventListener("click", () => {
      document.querySelector(".osaaminen").scrollIntoView();
    });
    document.addEventListener("DOMContentLoaded", () => {
      let navigaatio = document.querySelectorAll(".navigaatio-sisalto li p");
      for (let yksittainenNavigaatio of navigaatio) {
        yksittainenNavigaatio.addEventListener("click", (e) => {
          document
            .querySelector(`.${e.target.textContent.toLowerCase()}`)
            .scrollIntoView();
          paivitaNavigaatio(!navigaatio);
        });
      }
    });
    document.addEventListener("DOMContentLoaded", () => {
      let navigaatio = document.querySelectorAll(".navigaatio li p");
      for (let yksittainenNavigaatio of navigaatio) {
        yksittainenNavigaatio.addEventListener("click", (e) => {
          document
            .querySelector(`.${e.target.textContent.toLowerCase()}`)
            .scrollIntoView();
          paivitaNavigaatio(!navigaatio);
        });
      }
    });
  }, []);
  const [leveys, paivitaLeveys] = useState(window.innerWidth);
  const [navigaatio, paivitaNavigaatio] = useState(false);
  if (leveys <= 1100) {
    return (
      <>
        <header>
          <h1 className="nimi">Noa Julkunen</h1>
        </header>{" "}
        <div
          onClick={(e) => {
            paivitaNavigaatio(!navigaatio);
          }}
          className={
            navigaatio === false
              ? "hampurilainen"
              : "hampurilainen hampurilainen-aktiivinen"
          }
        >
          <div className="viiva1"></div>
          <div className="viiva2"></div>
          <div className="viiva3"></div>
        </div>
        <div
          className={
            navigaatio === false
              ? "navigaatio-sisalto"
              : "navigaatio-sisalto-aktiivinen navigaatio-sisalto"
          }
        >
          <li>
            <p>Osaaminen</p>
          </li>
          <li>
            <p>Tietoja</p>
          </li>
          <li>
            <p>Sää</p>
          </li>
          <li>
            <p>Yhteys</p>
          </li>
        </div>
      </>
    );
  } else {
    return (
      <header>
        <h1 className="nimi">Noa Julkunen</h1>
        <div className="navigaatio">
          <li>
            <p>Osaaminen</p>
          </li>
          <li>
            <p>Tietoja</p>
          </li>
          <li>
            <p>Sää</p>
          </li>
          <li>
            <p>Yhteys</p>
          </li>
        </div>
      </header>
    );
  }
}
