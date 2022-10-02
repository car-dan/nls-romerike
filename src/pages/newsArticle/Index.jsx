import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/api";

import classes from "./NewsArticle.module.scss";

function NewsArticle() {
  let params = useParams();
  const [article, setArticle] = useState([]);
  const [text, setText] = useState([]);

  const url = BASE_URL + `/articles/${params.id}?populate=*`;

  const fetchDetails = async () => {
    console.log(params.id);
    const data = await fetch(url);
    const test = await data.json();

    setText(test.data.attributes.text);
    setArticle(test.data.attributes);
  };

  useEffect(() => {
    fetchDetails().catch(console.error);
  }, [params.id]);

  let imageSource = "";
  let imageAlt = "";

  let newText = text.toString().split(`\n`);

  if (article.Image) {
    imageSource = article.Image.data.attributes.url;
    imageAlt = article.Image.data.attributes.alternativeText;
  }

  return (
    <>
      <div className="breadcrumbs">
        <div className="breadcrumbs_text">
          <h1>Nyhet</h1>
        </div>
      </div>
      <div className={classes.article}>
        <img src={imageSource} alt={imageAlt} />
        <div className={classes.article__content}>
          <h2>{article.Title}</h2>
          {newText.map((e) => {
            if (e === "") {
              return <br></br>;
            } else if (e.includes("*")) {
              let newE = e.split("");
              console.log(newE);
              let filteredE = newE.filter((newE) => newE !== "*");
              console.log(filteredE.join(""));
              return <h4>{filteredE.join("")}</h4>;
            }

            return <p>{e}</p>;
          })}
        </div>
      </div>
    </>
  );
}

export default NewsArticle;
