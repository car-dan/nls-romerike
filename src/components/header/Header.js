import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import classes from "../header/Header.module.scss";
import image from "../../assets/logo.png";
import AuthContex from "../contex/AuthContex";
import SearchBar from "../searchBar/Index";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [auth, setAuth] = useContext(AuthContex);
  const history = useNavigate();

  function logout() {
    setAuth(null);
    history.push("/");
  }

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <Link to="/" className={classes.header__content__logo}>
          <img src={image} alt="Logo" />
        </Link>

        <nav
          className={`${classes.header__content__nav} ${
            menuOpen && size.width < 768 ? classes.isMenu : ""
          }`}
        >
          <SearchBar />
          <ul>
            <li>
              <Link to="/nyheter" onClick={menuToggleHandler}>
                Nyheter
              </Link>
            </li>
            <li>
              {auth ? (
                <Link to="/kontakt/auth" onClick={menuToggleHandler}>
                  Kontakt
                </Link>
              ) : (
                <Link to="/kontakt" onClick={menuToggleHandler}>
                  Kontakt
                </Link>
              )}
            </li>
            {auth && (
              <li>
                <Link to="/kurs/pamelding" onClick={menuToggleHandler}>
                  Påmeldinger
                </Link>
              </li>
            )}

            <li>
              {auth ? (
                <Link to="/kurs/add" onClick={menuToggleHandler}>
                  Kurs
                </Link>
              ) : (
                <Link to="/om" onClick={menuToggleHandler}>
                  Om Oss
                </Link>
              )}
            </li>
            <li>
              {auth ? (
                <button onClick={logout}>Log ut</button>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </nav>
        <div className={classes.header__content__toggle}>
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
