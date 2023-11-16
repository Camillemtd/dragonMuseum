import React, { useState } from "react";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="header">
		<div className="flex flex-col text-3xl p-6 font-semibold leading-7 w-2/4 text-white">
			<span>Dragon</span>
			<span className="ml-16">Museum</span>
		</div>
      
        <div
          className="hamburger-lines"
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
        >
          <span className={`line line1 ${openMenu ? "rotate45" : ""}`}></span>
          <span className={`line line2 ${openMenu ? "scaleY0" : ""}`}></span>
          <span className={`line line3 ${openMenu ? "rotate-45" : ""}`}></span>
        </div>
    </div>
  );
};

export default Header;
