import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSitemap,
  faSchool,
  faEnvelope,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
export default function Kortit() {
  useEffect(() => {
    let elementit = document.querySelectorAll(".kortti-ylaosa p");
    for (let elementti of elementit) {
      elementti.addEventListener("click", (e) => {
        e.target.parentElement.nextElementSibling.classList.toggle(
          "kortti-alaosa-aktiivinen"
        );
      });
    }
  }, []);
  return (
    <>
      <div className="aalto">
        <figure>
          <img alt={""}></img>
        </figure>
      </div>
      <div className="tietoja">
        <div className="kortti">
          <div className="kortti-ylaosa">
            <FontAwesomeIcon icon={faUser} />
            <p>Kuka olen?</p>
          </div>
          <div className="kortti-alaosa">
            <p>
              Olen Noa, 17 vuotias tieto- ja viestintätekniikan opiskelija
              ammattikoulussa
            </p>
          </div>
        </div>
        <div className="kortti">
          <div className="kortti-ylaosa">
            <FontAwesomeIcon icon={faSitemap} />
            <p>Mitä tällä sivulla on?</p>
          </div>
          <div className="kortti-alaosa">
            <p>Olen koonnut tälle sivulle osaamistani näytille</p>
          </div>
        </div>
        <div className="kortti">
          <div className="kortti-ylaosa">
            <FontAwesomeIcon icon={faSchool} />
            <p>Missä ja mitä opiskelen?</p>
          </div>
          <div className="kortti-alaosa">
            <p> Opiskelen Helsinki Business Collegessa WEB - ohjelmointia</p>
          </div>
        </div>
        <div className="kortti">
          <div className="kortti-ylaosa">
            <FontAwesomeIcon icon={faCode} />
            <p>Mitä ohjelmointikieliä osaan?</p>
          </div>
          <div className="kortti-alaosa">
            <p>
              Osaan (tällä hetkellä) luoda nettisivujen rakenteen HTML avulla,
              ulkoasun CSS avulla ja toiminnallisuuden JavaScriptin avulla.
            </p>
          </div>
        </div>
        <div className="kortti">
          <div className="kortti-ylaosa">
            <FontAwesomeIcon icon={faEnvelope} />
            <p>Miten minuun saa yhtyden?</p>{" "}
          </div>
          <div className="kortti-alaosa">
            Minulle voi lähettää sähköpostia käyttämällä lomaketta
          </div>
        </div>
      </div>
      <div className="aalto kaannetty">
        <figure>
          <img alt={""}></img>
        </figure>
      </div>
    </>
  );
}
