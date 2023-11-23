import React, { useState } from "react";
import Menu from "./Menu";

const Header = ({openMenu, setOpenMenu, setOpenLair, updateLairData,}) => {

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="fixed z-40 w-screen">
		<div className="flex flex-col text-3xl p-10 font-semibold leading-7 w-2/4 text-white">
			<span className="title">Dragon</span>
			<span className="ml-12 title">Museum</span>
		</div>
      <div className="h-14 w-14 absolute top-10 right-9 z-20 flex flex-col justify-center items-center border border-white rounded-full cursor-pointer">
	  <div
          className="hamburger-lines block h-12 w-12 z-20 flex flex-col justify-center items-center bg-white rounded-full transition-transform duration-300 ease-in-out"
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
        >
          <i className="fa-solid fa-bars text-amber-900" onClick={() => setOpenMenu(true)}></i>
        </div>
	  </div>
       
		{openMenu && <Menu isOpen={openMenu} toggleMenu={toggleMenu}  setOpenLair={setOpenLair} updateLairData={updateLairData}/>}
    </div>
  );
};

export default Header;
