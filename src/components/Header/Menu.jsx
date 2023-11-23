import {useState, useEffect} from "react";
import DragonCardMenu from "./DragonCardMenu";
import dragonData from "../../data/dragonData";


const Menu = ({ isOpen, toggleMenu,setOpenLair, updateLairData, }) => {
	const [menuClass, setMenuClass] = useState("");

  useEffect(() => {
    if (isOpen) {
      setMenuClass("menu-enter");
    }
  }, [isOpen]);

  const handleClose = () => {
    setMenuClass("menu-exit");
    setTimeout(() => {
      toggleMenu();
    }, 1000); 
  };

  const uniqueCategoryDragons = dragonData.reduce((acc, dragon) => {
    const categoryExists = acc.find(d => d.category === dragon.category);

    if (!categoryExists) {
        acc.push(dragon);
    }

    return acc;
}, []);

  return (
    <div className={`w-screen h-screen bg-orange-100 absolute top-0 m-7 menu rounded-2xl ${menuClass} z-50`}>
      <div className="w-full h-full">
        <div
          className="xmark block h-11 w-11 absolute top-4 right-5 z-20 flex flex-col justify-center items-center gap-0.75 rounded-full cursor-pointer m-3.75 transition-colors duration-400 ease-in-out bg-amber-900"
		  onClick={handleClose}
        >
          <i className="fa-solid fa-xmark text-white"></i>
        </div>
        <div className="w-full h-full flex justify-center gap-20 md:p-20 md:flex-row flex-col items-center pt-20">
          {uniqueCategoryDragons.map((data, index) => {
            return (
              <DragonCardMenu data={data}  setOpenLair={setOpenLair} updateLairData={updateLairData} key={index}/>
            )
          })}
          
        </div>
        
      </div>
     
    </div>
  );
};

export default Menu;
