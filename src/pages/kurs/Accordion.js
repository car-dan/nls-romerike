import React, { useState } from "react";

import classes from "./Kurs.module.scss";

const Accordion = ({ id, title, content }) => {
  const [isActive, setIsActive] = useState(false);
  function inputSpace() {
    return content.splice(",").join("<br/>");
  }

  return (
    <div className={classes.kurs__main__info__list} key={id}>
      <div
        className={classes.kurs__main__info__list__dropdown}
        onClick={() => setIsActive(!isActive)}
      >
        <div>{title}</div>
        <div>{isActive ? "-" : "+"}</div>
      </div>
      {isActive && (
        <div className={classes.kurs__main__info__list__dropdown__content}>
          <p dangerouslySetInnerHTML={{ __html: inputSpace() }} />
        </div>
      )}
    </div>
  );
};

export default Accordion;
