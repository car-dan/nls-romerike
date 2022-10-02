import React from "react";
import Heading from "../../components/layout/Heading";
import classes from "./Index.module.scss";

const OmOss = () => {
  return (
    <>
      <Heading title="Om oss" />
      <div className={classes.omOss_content}>
        <p>
          Norges Livredningsselskap arbeider med drukningsforebygging og er
          Norges ledende drukningsforebyggende organisasjon. Som krets under NLS
          arbeider vi for å fremme selskapets interesser på det lokale plan.
          Norges Livredningsselskap Romerike krets ble startet i 1986. Kretsen
          dekker store deler av Romerike med kurs innenfor baby- og
          småbarnssvømming. I flere kommuner tilbyr vi også livredning og
          svømmekurs for barn og ungdom. Kretsen holder kurs i 12 forskjellige
          basseng og har cirka 1000 kursdeltagere i året. Vi arrangerer også
          livredningskurs for lærere og barnehagepersonell.
        </p>

        <h3>Våre instruktører</h3>
        <p>
          Våre instruktører avlegger årlig prøve for å dokumentere at de er i
          stand til å oppfylle kravene som stilles til våre instruktørerer. De
          deltar også på instruktørseminarer for å holde seg opdatert innenfor
          faget minimum annethvert år.
        </p>
      </div>
    </>
  );
};

export default OmOss;
