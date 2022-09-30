import { useState } from "react";

import "./searchBar.scss";

import Trie from "./Trie.js";

const dictionary = {
  words: [
    "svømming",
    "livredning",
    "kurs",
    "baby",
    "småbarn",
    "om oss",
    "kontak",
    "svømmekurs",
    "livredningskurs",
    "årlig prøve",
    "basseng",
  ],
};

function SearchBar() {
  const [prefix, setPrefix] = useState("");
  const [suggestion, setSuggestion] = useState("");

  // const getWords = async() => {
  //   const url = 'https://raw.githubusercontent.com/EKaxada/webster-words/main/dict.json'
  //   const res = await fetch(url, {
  //     method: 'GET'
  //   });
  //   return await res.json();
  // }

  let myTrie = new Trie();

  (async () => {
    // const dictionary = await getWords();
    const words = dictionary.words;
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      myTrie.insert(word);
    }
  })();

  const onChange = (e) => {
    let value = e.target.value;
    setPrefix(value);
    let words = value.split(" ");
    let trie_prefix = words[words.length - 1].toLowerCase();
    let found_words = myTrie.find(trie_prefix).sort((a, b) => {
      return a.length - b.length;
    });
    let first_word = found_words[0];
    if (
      found_words.length !== 0 &&
      value !== "" &&
      value[value.length - 1] !== " "
    ) {
      if (first_word != null) {
        let remainder = first_word.slice(trie_prefix.length);
        setSuggestion(value + remainder);
      }
    } else {
      setSuggestion(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 39) {
      setPrefix(suggestion);
    }
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        name="search-bar"
        id="search-bar2"
        value={suggestion}
        className="search_bar2"
      />
      <input
        type="text"
        name="search-bar"
        id="search-bar"
        className="search_bar1"
        placeholder="Search..."
        value={prefix}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchBar;
