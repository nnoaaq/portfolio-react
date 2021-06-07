import React from "react";
import Ylapalkki from "./Ylapalkki.js";
import Etusivu from "./Etusivu.js";
import Osaaminen from "./Osaaminen.js";
import Kortit from "./Kortit.js";
import Sää from "./Sää.js";
import "./tyylit.css";
function App() {
  return (
    <>
      <Ylapalkki /> {/*Ylapalkki-elementti*/}
      <Etusivu /> {/*Etusivu-elementti*/}
      <Osaaminen /> {/*Osaaminen-elementti*/}
      <Kortit /> {/*Korit-elementti*/}
      <Sää /> {/*Sää-elementti*/}
    </>
  );
}

export default App;
