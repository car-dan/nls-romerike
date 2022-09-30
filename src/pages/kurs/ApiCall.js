import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";
import moment from "moment/moment";
import { BASE_URL } from "../../constants/api";
import classes from "./Kurs.module.scss";

const url = BASE_URL + "/kurs";

export default function ApiCall() {
  const [kurs, setKurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectType, setSelectType] = useState("Type Kurs");
  const [selectSted, setSelectSted] = useState("Velg Sted");

  useEffect(function () {
    async function getKurs() {
      try {
        const response = await axios.get(url);
        setKurs(response.data.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getKurs();
  }, []);

  if (loading) return <div>Loading Kurs...</div>;
  if (error) return <div>{}</div>;

  const kursSted = [...new Set(kurs.map((k) => k.attributes.sted))];

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
    <div className={classes.kurs__main__liste}>
      <div className={classes.kurs__main__liste__choose}>
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

      <div>
        {kurs.map((k) => {
          if (
            k.attributes.Type_kurs === selectType &&
            k.attributes.sted === selectSted
          ) {
            const startDay = moment(k.attributes.start_dato).format("dddd");
            const startDate = moment(k.attributes.start_dato).format("DD/MM");
            const endDate = moment(k.attributes.slutt_dato).format("DD/MM");
            const startTime = moment(k.attributes.start_tid, "hh:mm:ss").format(
              "hh.mm"
            );
            const endTime = moment(k.attributes.slutt_tid, "hh:mm:ss").format(
              "hh.mm"
            );

            let isFull;
            if (k.attributes.fult) {
              isFull = "Venteliste";
            } else {
              isFull = "Påmelding";
            }

            return (
              <div key={k.id} className={classes.kurs__main__liste__kursItem}>
                <div className={classes.kurs__liste__main__kursItem__date}>
                  {startDate}-{endDate}
                </div>
                <div className={classes.kurs__main__liste__kursItem__day}>
                  {startDay}
                </div>
                <div className={classes.kurs__main__liste__kursItem__time}>
                  {startTime}-{endTime}
                </div>
                <div className={classes.kurs__main__liste__kursItem__price}>
                  {k.attributes.pris}kr
                </div>
                <Link
                  to={`/kurs/pamelding/` + k.id}
                  className={classes.kurs__main__liste__kursItem__button}
                >
                  <div>{isFull}</div>
                </Link>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
