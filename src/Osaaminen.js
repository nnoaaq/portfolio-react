import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import tehtavatJSON from "./media/tehtavat.json";
export default function Osaaminen() {
  useEffect(() => {
    window.addEventListener("resize", () => {
      paivitaLeveys(window.innerWidth);
    });
  }, []);

  const [tehtavat] = useState(tehtavatJSON);
  const [leveys, paivitaLeveys] = useState(window.innerWidth);
  const [aktiivinenAmmatilliset, paivitaAktiivinenAmmatilliset] =
    useState(true);
  const [aktiivinenYhteiset, paivitaAktiivinenYhteiset] = useState(true);
  const [aktiivinenVapaasti, paivitaAktiivinenVapaasti] = useState(true);
  useEffect(() => {
    let elementit = document.querySelectorAll(".tehtavat-osiot-lista li p");
    for (let elementti of elementit) {
      elementti.addEventListener("click", (e) => {
        e.target.nextElementSibling.classList.toggle("tehtavat-piilossa");
      });
    }
  }, []);
  function ikoni(tilanne) {
    if (tilanne === false) {
      return faMinus;
    } else {
      return faPlus;
    }
  }

  return (
    <>
      <div className="osaaminen">
        <div className={leveys <= 1100 ? "painikkeet-allekkain" : "painikkeet"}>
          <button
            data-kohde="ammatilliset"
            className="painike"
            onClick={(e) => {
              paivitaAktiivinenAmmatilliset(!aktiivinenAmmatilliset);
              ikoni(aktiivinenAmmatilliset);
            }}
          >
            <FontAwesomeIcon
              style={{
                color: aktiivinenAmmatilliset === true ? "green" : "red",
              }}
              icon={ikoni(aktiivinenAmmatilliset)}
            />
            ammatilliset tutkinnon osat
          </button>
          <button
            className="painike"
            onClick={() => {
              paivitaAktiivinenYhteiset(!aktiivinenYhteiset);
              ikoni(aktiivinenYhteiset);
            }}
          >
            <FontAwesomeIcon
              style={{
                color: aktiivinenYhteiset === true ? "green" : "red",
              }}
              icon={ikoni(aktiivinenYhteiset)}
            />
            yhteiset tutkinnon osat
          </button>
          <button
            className="painike"
            onClick={() => {
              paivitaAktiivinenVapaasti(!aktiivinenVapaasti);
              ikoni(aktiivinenVapaasti);
            }}
          >
            <FontAwesomeIcon
              style={{
                color: aktiivinenVapaasti === true ? "green" : "red",
              }}
              icon={ikoni(aktiivinenVapaasti)}
            />
            vapaasti valittavat tutkinnon osat
          </button>
        </div>
        <div className="tehtavat ammatilliset">
          <div
            className={
              aktiivinenAmmatilliset === true
                ? "ammatilliset-tehtavat piilotettuna"
                : "ammatilliset-tehtavat"
            }
          >
            <ul className="tehtavat-osiot-lista">
              <li>
                <p>Palveluteht??viss?? toimiminen</p>
                <div className="tehtavat-piilossa tehtavat-sisalto">
                  palveluteht??viss?? toimininen - teht??v??t
                </div>
              </li>
              <li>
                <p>J??rjestelm??n hankinta ja k??ytt????notto</p>
                <div className="tehtavat-piilossa tehtavat-sisalto">
                  j??rjestelm??n hankinta ja k??ytt????notto- teht??v??t
                </div>
              </li>
              <li>
                <p>Ohjelmiston prototyypin toteuttaminen</p>
                <div className="tehtavat-piilossa tehtavat-sisalto">
                  ohjelmiston prototyypin toteuttainen- teht??v??t
                </div>
              </li>
              <li>
                <p>Ohjelmiston tuotantoversion toteuttaminen</p>
                <div className="tehtavat-piilossa tehtavat-sisalto">
                  <ul className="tehtavat-lista">
                    {tehtavat.map((tehtava) => {
                      return (
                        <li key={tehtava.nimi}>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={tehtava.url}
                          >
                            {tehtava.nimi}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
              <li>
                <p>Organisaation kyberturvallisuus</p>
                <div className="tehtavat-piilossa tehtavat-sisalto">
                  organisaation kyberturvallisuus- teht??v??t
                </div>
              </li>
            </ul>
          </div>
          <div
            className={
              aktiivinenYhteiset === true
                ? "ammatilliset-tehtavat piilotettuna"
                : "ammatilliset-tehtavat"
            }
          >
            <ul className="tehtavat-osiot-lista">
              <li>
                <p>Yhteiset teht??v??t </p>
                <div className="tehtavat-piilossa tehtavat-sisalto">
                  T??ydennet????n my??hemmin.
                </div>
              </li>
            </ul>
          </div>
          <div
            className={
              aktiivinenVapaasti === true
                ? "ammatilliset-tehtavat piilotettuna"
                : "ammatilliset-tehtavat"
            }
          >
            <ul className="tehtavat-osiot-lista">
              <li>
                <p>Vapaasti valittavat teht??v??t </p>
                <div className="tehtavat-piilossa tehtavat-sisalto">
                  T??ydennet????n my??hemmin.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
