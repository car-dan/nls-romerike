import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import axios from "axios";

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import "./Slider.scss";

const url = BASE_URL + "/articles?populate=*";

export function Slider() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const slideLenght = 3;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLenght - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLenght - 1 : currentSlide - 1);
  };

  let slideInterval;
  let intervaltime = 10000;
  const autoScroll = true;

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  function auto() {
    slideInterval = setInterval(nextSlide, intervaltime);
  }

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

  if (loading) return <div>Loading Articles.....</div>;
  if (error) return <div>Something went wrong.. Please try agian later</div>;

  return (
    <div className="slider">
      <BsFillArrowLeftCircleFill className="arrow prev" onClick={prevSlide} />
      <BsFillArrowRightCircleFill className="arrow next" onClick={nextSlide} />

      {articles.map((article, index) => {
        let imageUrl = article.attributes.Image.data.attributes.url;
        let imageAlt = article.attributes.Image.data.attributes.name;

        for (let i = 0; i < 3; i++) {
          return (
            <div
              className={index === currentSlide ? "slide current" : "slide"}
              key={article.id}
            >
              {index === currentSlide && (
                <>
                  <img src={imageUrl} alt={imageAlt} />
                  <Link to="/">
                    <div className="content">
                      <h2>{article.attributes.Title}</h2>
                    </div>
                  </Link>
                </>
              )}
            </div>
          );
        }
      })}
    </div>
  );
}
