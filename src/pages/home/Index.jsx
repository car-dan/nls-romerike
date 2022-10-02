import React from "react";
import KursOversikt from "../../components/kurs/KursOversikt";
import SearchBar from "../../components/searchBar/Index";
import searchData from "../../Data.json";
import { Slider } from "../../components/slider/Slider";

const Home = () => {
  return (
    <>
      <Slider />
      <SearchBar placeholder="Search.." data={searchData} />
      <KursOversikt />
    </>
  );
};

export default Home;
