import { useEffect, useState } from "react";

import axios from "axios";
import moment from "moment";
import { BASE_URL } from "../../constants/api";

import { Link } from "react-router-dom";

import classes from "../kontakt/Contact.module.scss";
import Heading from "../../components/layout/Heading";

const url = BASE_URL + "/kurs";

function AddKurs() {
  const [kurs, setKurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectType, setSelectType] = useState("Type Kurs");
  const [selectSted, setSelectSted] = useState("Velg Sted");
  const [error, setError] = useState(null);

  useEffect(function () {
    async function getContactForms() {
      try {
        const response = await axios.get(url);
        let list = response.data.data;
        list.sort((x) => (x.attributes.fult ? 1 : -1));
        setKurs(list);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getContactForms();
  }, []);

  if (loading) return <div>Loading Kurs...</div>;
  if (error) return <div>{}</div>;

  const kursType = [...new Set(kurs.map((t) => t.attributes.Type_kurs))];

  const handleChangeType = (e) => {
    setSelectType(e.target.value);
  };

  const handleChangeSted = (e) => {
    setSelectSted(e.target.value);
  };
  let keyType = 0;
  let keySted = 0;
  let filterdSted = [`Velg Sted`];

  return (
    <>
      <Heading title="Adming" subtitle="Kurs" />
      <div className={classes.kurs_update}>
        <select value={selectType} onChange={handleChangeType}>
          <option value="default">Velg Kurs</option>
          {kursType.map((type) => {
            keyType += 1;
            return (
              <option key={keyType} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        <select value={selectSted} onChange={handleChangeSted}>
          <option value="default">Velg Sted</option>

          {kurs.map((kurs) => {
            if (kurs.attributes.Type_kurs === selectType) {
              if (!filterdSted.includes(kurs.attributes.sted)) {
                filterdSted.push(kurs.attributes.sted);

                keySted += 1;
                return (
                  <option key={keySted} value={kurs.attributes.sted}>
                    {kurs.attributes.sted}
                  </option>
                );
              }
            }
          })}
        </select>
      </div>
      <div className={classes.contactAut}>
        <div className={classes.contactAut__add}>
          <div className={classes.contactAut__emty}>
            <div className={classes.contactAut__item__emty}>
              <Link to={"/kurs/addNew"}>Legg til ny</Link>
            </div>
          </div>
        </div>
        {kurs.map((k) => {
          if (
            k.attributes.Type_kurs === selectType &&
            k.attributes.sted === selectSted
          ) {
            let day = moment(k.attributes.start_dato).format("d");
            switch (day) {
              case "1":
                day = "Mandag";
                break;
              case "2":
                day = "Tirsdag";
                break;
              case "3":
                day = "Onsdag";
                break;
              case "4":
                day = "Torsdag";
                break;
              case "5":
                day = "Fredag";
                break;
              case "6":
                day = "Lørdag";
                break;
              default:
                day = "Søndag";
            }

            return (
              <div key={k.id} className={classes.contactAut__item}>
                <div className={classes.contactAut__item__dato}>
                  {moment(k.attributes.start_dato).format("DD/MM")} -{" "}
                  {moment(k.attributes.slutt_dato).format("DD/MM")}
                </div>
                <div className={classes.contactAut__item__dato}>{day}</div>
                <div className={classes.contactAut__item__date}>
                  {k.attributes.dato}
                </div>
                <div className={classes.contactAut__item__time}>
                  {moment(k.attributes.start_tid, "HH:mm:ss").format("HH:mm")} -
                  {moment(k.attributes.slutt_tid, "HH:mm:ss").format("HH:mm")}
                </div>
                <div className={classes.contactAut__item__pris}>
                  {k.attributes.pris}kr
                </div>
                <div className={classes.contactAut__item__pris}>
                  {k.attributes.paamelde}/{k.attributes.totalt_plasser}
                </div>

                <div className={classes.contactAut__item__button}>
                  <Link to={"/kurs/add/" + k.id}>Vis</Link>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default AddKurs;
