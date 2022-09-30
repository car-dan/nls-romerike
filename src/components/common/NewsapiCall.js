import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContex from "../contex/AuthContex";
import { HiOutlinePlusSm } from "react-icons/hi";
import { BASE_URL } from "../../constants/api";

import classes from "../../pages/nyheter/News.module.scss";

const url = BASE_URL + "/articles?populate=*";

export default function NewsApiCall() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContex);

  useEffect(function () {
    async function getArticles() {
      try {
        const response = await axios.get(url);
        setArticles(response.data.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getArticles();
  }, []);

  if (loading) return <div>Loading Articles...</div>;
  if (error) return <div>{}</div>;
  if (auth) {
    return (
      <div className={classes.news}>
        <div className={classes.news__article__add}>
          <Link to={"/addNyhet"}>
            <div className={classes.news__article__add__content}>
              <HiOutlinePlusSm />
            </div>
          </Link>
        </div>
        {articles.map((article) => {
          let imageUrl = article.attributes.Image.data.attributes.url;
          let imageAlt = article.attributes.Image.data.attributes.name;

          return (
            <div key={article.id} className={classes.news__article}>
              <Link to={"/nyhet/edit/" + article.id}>
                <img src={imageUrl} alt={imageAlt} />
                <div className={classes.news__article__content}>
                  <h2>{article.attributes.Title}</h2>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={classes.news}>
        {articles.map((article) => {
          let imageUrl = article.attributes.Image.data.attributes.url;
          let imageAlt = article.attributes.Image.data.attributes.name;

          return (
            <div key={article.id} className={classes.news__article}>
              <Link to={"/nyhet/" + article.id}>
                <img src={imageUrl} alt={imageAlt} />
                <div className={classes.news__article__content}>
                  <h2>{article.attributes.Title}</h2>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
