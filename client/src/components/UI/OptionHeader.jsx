
import React from "react";
import noodles from "../../assets/Img/noodles.png";
import rooms from "../../assets/Img/rooms.png"
import { Link } from "react-router-dom";

function OptionHeader (){
    return(
        <>
      <header className="flex justify-center p-4 items-center pb-3">
        <Link>
          <img src={rooms} alt="rooms" className="mx-3" />
        </Link>
        <Link>
          <img src={noodles} alt="noodles" className="mx-3" />
        </Link>
      </header>
      <div className="border-b-2 bg-slate-800"></div>
        </>
    )
}

export default OptionHeader;