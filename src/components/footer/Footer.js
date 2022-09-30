import React from "react";

import classes from "../footer/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__content}>
        <div className={classes.footer__content__left}>
          <p>Kontakt oss</p>
          <p>Tlf: 63 81 06 46</p>
          <p>e-post: kontor@nls-romerike.no</p>
        </div>
        <div className={classes.footer__content__right}>
          <p>Kontortider:</p>
          <p>Mandag - Torsdag</p>
          <p>10:00 - 15.00</p>
        </div>
      </div>
      <div className={classes.footer__middle}>
        Copyright &copy; NLS Romerike Krets
      </div>
    </footer>
  );
};

export default Footer;
