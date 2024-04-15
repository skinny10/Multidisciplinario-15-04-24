import React from "react";
import Header from "../UI/Header";
import OptionHeader from "../UI/OptionHeader";
import CreatePublication from "../UI/CreatePublication/CreatePublication";
import "../Home/HomeComponents.css";
import Publicación from "../UI/CreatePublication/Publicación";


function HomeComponents() {
  return (
    <>
       <Header />
      <OptionHeader />
   <Publicación/>

    </>
  );
}

export default HomeComponents;