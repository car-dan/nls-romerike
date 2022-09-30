import React from "react";
import { useParams } from "react-router-dom";
import { arrayKurs } from "../../components/utils/arrayKurs";
import Accordion from "./Accordion";
import ApiCall from "./ApiCall";

import classes from "./Kurs.module.scss";

function Kurs() {
  let params = useParams();

  let overskrift = params.name;

  let newArray = arrayKurs.filter((k) => k.type === overskrift);

  let drop = newArray[0].dropdown;

  switch (overskrift) {
    case "smabarn":
      overskrift = "Småbarn";
      break;
    case "baby":
      overskrift = "Baby";
      break;
    case "svommekurs":
      overskrift = "Livredning og Svømming";
      break;

    case "livredning":
      overskrift = "Livredningskurs og Årlig prøve";
      break;

    default:
      console.log("Kurs");
  }

  return (
    <>
      <div className={classes.kurs__breadcrumbs}>
        <img src={newArray[0].img} alt="" />
        <div className={classes.kurs__breadcrumbs__text}>
          <h1>{overskrift}</h1>
        </div>
      </div>
      <div className={classes.kurs}>
        <div className={classes.kurs__main}>
          <div className={classes.kurs__main__info}>
            {drop.map(({ id, title, content }) => (
              <Accordion id={id} title={title} content={content} />
            ))}
          </div>
          <ApiCall type={overskrift} />
        </div>
      </div>
    </>
  );
}

export default Kurs;
