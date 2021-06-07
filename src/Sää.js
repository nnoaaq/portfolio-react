import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltRight,
  faSearchLocation,
} from "@fortawesome/free-solid-svg-icons";
import Paiva from "./Paiva.js";
import Tunti from "./Tunti.js";
export default function Sää() {
  const hakutermi = useRef(null);
  const [paivat, asetaPaiva] = useState([]);
  const [tunnit, asetaTunti] = useState([]);
  const [sijainti, asetaSijainti] = useState([]);
  const [ilmoitus, annaIlmoitus] = useState([]);
  let avain = "a7623f446de16b909d02e43badefd642";
  async function säätiedot(e) {
    e.preventDefault();
    if (hakutermi.current.value.length === 0) {
    } else {
      let koordinaatit = await koordinaattienHaku(hakutermi.current.value);
      if (koordinaatit) {
        saaTiedot(koordinaatit);
      }
    }
  }
  function aika(aika_muuttamaton, muoto) {
    let kuukaudet = [
      "Tammikuuta",
      "Helmikuuta",
      "Maaliskuuta",
      "Huhtikuuta",
      "Toukokuuta",
      "Kesäkuuta",
      "Heinäkuuta",
      "Elokuuta",
      "Syyskuuta",
      "Lokakuuta",
      "Marraskuuta",
      "Joulukuuta",
    ];
    let paivays = new Date(aika_muuttamaton * 1000);
    let kuukausi = kuukaudet[paivays.getMonth()];
    let paiva = paivays.getDate();
    let tunti = paivays.getHours();
    let minuutti = paivays.getMinutes();
    let kuukausi_numero = kuukaudet.indexOf(kuukausi) + 1;
    let viikonpaivat = ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"];
    if (muoto === "tunti") {
      let luettava_aika =
        tunti + "." + minuutti + "0, " + viikonpaivat[paivays.getDay()];
      return luettava_aika;
    } else {
      let luettava_aika = `${
        viikonpaivat[paivays.getDay()]
      }, ${paiva}.${kuukausi_numero}`;

      return luettava_aika;
    }
  }
  function lampotila(max, min) {
    let yhteensa = max + min;
    let yhteensaRound = Math.round(yhteensa);
    return `${yhteensaRound / 2} °C`;
  }
  async function koordinaattienHaku(kaupunki) {
    let vastaus = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        kaupunki +
        "&appid=" +
        avain +
        "&units=metric"
    );
    if (vastaus.ok) {
      let json = await vastaus.json();
      return json.coord;
    }
  }
  async function paikannettu(paikannus) {
    annaIlmoitus({
      teksti: "",
      vari: "transparent",
      nakyvyys: "none",
    });
    let koordinaatit = {
      lat: paikannus.coords.latitude,
      lon: paikannus.coords.longitude,
    };
    if (koordinaatit) {
      saaTiedot(koordinaatit);
    }
  }
  async function saaTiedot(koordinaatit) {
    let kaupunki = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        koordinaatit.lat +
        "&lon=" +
        koordinaatit.lon +
        "&appid=" +
        avain +
        "&units=metric"
    );
    if (kaupunki.ok) {
      let kaupunkiJSON = await kaupunki.json();
      const nimi = kaupunkiJSON.name;
      if (!hakutermi.current.value) {
        asetaSijainti("Säätiedot sijainnissa " + nimi);
      } else {
        asetaSijainti("Säätiedot sijainnissa " + hakutermi.current.value);
      }

      hakutermi.current.value = null;
    }
    let vastaus = await fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        koordinaatit.lat +
        "&lon=" +
        koordinaatit.lon +
        "&exclude=minutely&appid=" +
        avain +
        "&units=metric"
    );
    if (vastaus.ok) {
      let json = await vastaus.json();
      let tunneittain = [];
      let paivakohtaisesti = [];
      for (let tunti of json.hourly) {
        tunneittain.push({
          aika: aika(tunti.dt, "tunti"),
          lampotila: tunti.temp + " °C",
          kuvake: tunti.weather[0].icon,
        });
      }
      asetaTunti(tunneittain);
      for (let paivittain of json.daily) {
        paivakohtaisesti.push({
          aika: aika(paivittain.dt),
          lampotila: lampotila(paivittain.temp.max, paivittain.temp.min),
          kuvake: paivittain.weather[0].icon,
        });
      }
      asetaPaiva(paivakohtaisesti);
    }
  }
  function virhe(err) {
    annaIlmoitus({
      teksti: "Paikantaminen ei onnistunut.",
      vari: "red",
      nakyvyys: "60px",
    });
    setTimeout(() => {
      annaIlmoitus({
        teksti: "",
        vari: "transparent",
        nakyvyys: "0px",
      });
    }, 10000);
  }
  return (
    <>
      <div className="sää">
        <div className="hakeminen">
          <form
            onSubmit={(e) => {
              säätiedot(e);
            }}
          >
            <input
              ref={hakutermi}
              type="text"
              placeholder="Syötä kaupunki"
            ></input>
            <button
              className="paikannus"
              type="submit"
              onClick={() => {
                annaIlmoitus({
                  teksti: "Hyväksy selaimen paikannuspyyntö",
                  vari: "green",
                  nakyvyys: "60px",
                });
                setTimeout(() => {
                  annaIlmoitus({
                    teksti: "",
                    vari: "transparent",
                    nakyvyys: "0px",
                  });
                }, 10000);
                navigator.geolocation.getCurrentPosition(paikannettu, virhe);
              }}
            >
              <FontAwesomeIcon icon={faSearchLocation}></FontAwesomeIcon>
            </button>
            <button type="submit">
              <FontAwesomeIcon icon={faLongArrowAltRight}></FontAwesomeIcon>
            </button>
          </form>
        </div>
        <h2 className="sijainti"> {sijainti}</h2>
        <div
          style={{ height: tunnit.length === 0 ? "0" : "auto" }}
          className="saatiedot-tunti"
        >
          {tunnit.map((tunti) => {
            return <Tunti key={tunti.aika} tunti={tunti} />;
          })}
        </div>
        <div
          className="saatiedot"
          style={{ height: tunnit.length === 0 ? "0" : "auto" }}
        >
          {paivat.map((paiva) => {
            return <Paiva key={paiva.aika} paiva={paiva} />;
          })}
        </div>
      </div>
      <div
        style={{ background: ilmoitus.vari, height: ilmoitus.nakyvyys }}
        className="ilmoitus"
      >
        {ilmoitus.teksti}
      </div>
      <div className="aalto">
        <figure>
          <img alt={""}></img>
        </figure>
      </div>
    </>
  );
}
