import React from "react";
import { FaBaby, FaChild, FaSwimmer, FaFirstAid } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./kursOversikt.scss";
const KursOversikt = () => {
  return (
    <div className="kursListe">
      <div className="kursType">
        <Link to={`kurs/baby`}>
          <FaBaby className="icon" />
          <h3>Baby</h3>
          <p>Fra 3 mnd</p>
        </Link>
      </div>
      <div className="kursType">
        <Link to={`kurs/smabarn`}>
          <FaChild className="icon" />
          <h3>Småbarn</h3>
          <p>Fra ca 1 år</p>
        </Link>
      </div>
      <div className="kursType">
        <Link to={`kurs/svommekurs`}>
          <FaSwimmer className="icon" />
          <h3>Livredning og svømming</h3>
          <p>Fra ca 5 år til voksen</p>
        </Link>
      </div>
      <div className="kursType">
        <Link to={`kurs/livredning`}>
          <FaFirstAid className="icon" />
          <h3>Livredningskurs og Årlig prøve</h3>
        </Link>
      </div>
    </div>
  );
};

export default KursOversikt;
