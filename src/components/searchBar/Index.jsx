import { useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import "./searchBar.scss";

function SearchBar({ placeholder, data }) {
  const [filterdData, setFilterdData] = useState([]);
  const [wordTyped, setWordTyped] = useState("");

  const handleChange = (event) => {
    const searchWord = event.target.value;
    setWordTyped(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilterdData([]);
    } else {
      setFilterdData(newFilter);
    }
  };

  const clearInput = () => {
    setFilterdData([]);
    setWordTyped("");
  };

  return (
    <div>
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder={placeholder}
            value={wordTyped}
            onChange={handleChange}
          />
          <div className="searchIcon">
            {filterdData.length === 0 ? (
              <AiOutlineSearch />
            ) : (
              <AiOutlineClose id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
        {filterdData.length != 0 && (
          <div className="dataResult">
            {filterdData.slice(0, 15).map((value, key) => {
              return (
                <a className="dataItem" href={value.link}>
                  <p>{value.title}</p>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
