import { useState, useEffect } from "react";

const Lair = ({ isOpen, toggleLair, data }) => {
  const [lairClass, setLairClass] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setLairClass("menu-enter");
    }
  }, [isOpen]);

  const handleClose = () => {
    setLairClass("menu-exit");
    setTimeout(() => {
      toggleLair();
    }, 1000);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };
  return (
    <div
      className={`w-screen h-screen bg-black fixed z-50 ${lairClass} text-white`}
    >
      <div
        className="xmark block h-11 w-11 absolute top-4 right-5 z-20 flex flex-col justify-center items-center gap-0.75 rounded-full cursor-pointer m-3.75 transition-colors duration-400 ease-in-out bg-amber-900"
        onClick={handleClose}
      >
        <i className="fa-solid fa-xmark text-white"></i>
      </div>
      <div className="h-full flex">
        <div className="flex justify-between flex-col h-full w-1/4">
          <h2 className="title text-3xl p-5">{data[0].category}</h2>
          <div className="ml-5">
            <p>Origin : {}</p>
            <p>Région : </p>
          </div>
          <h3 className="titleIntro text-7xl pb-32 pl-5">Name{}</h3>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div className="w-156 h-156 border-white border-solid border rounded-full flex items-center justify-center relative">
            <i className="fa-solid fa-circle-arrow-right absolute -right-10 text-2xl cursor-pointer z-50"></i>
            <i className="fa-solid fa-circle-arrow-left absolute -left-10 text-2xl cursor-pointer z-50"></i>
            <div className="w-144 h-144 border-white border-solid border rotate-45 flex items-center justify-center z-40 relative">
              <div className="-rotate-45 h-160 w-72 border-white border-solid border rounded-full">
                <img
                  src={data[0].image}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 flex justify-end flex-col">
			<span className="pb-32 pr-5">{data[0].description}</span>
		</div>
      </div>
    </div>
  );
};

export default Lair;
