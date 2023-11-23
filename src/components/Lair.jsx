import { useState, useEffect } from "react";

const Lair = ({ isOpen, toggleLair, data }) => {
  const [lairClass, setLairClass] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(45);
  const [animationClass, setAnimationClass] = useState("fade-in");

  useEffect(() => {
    if (isOpen) {
      setLairClass("fade-in");
    }
  }, [isOpen]);

  useEffect(() => {
    setAnimationClass("");
    const timeout = setTimeout(() => {
      setAnimationClass("fade-in");
    }, 10); 
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const handleClose = () => {
    setLairClass("fade-out");
    setTimeout(() => {
      toggleLair();
    }, 1000);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    setRotation((prevRotation) => prevRotation + 90);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    setRotation((prevRotation) => prevRotation - 90);
  };

  const rotationStyle = {
    transform: `rotate(${rotation}deg)`,
    transition: "transform 0.5s ease", 
  };

  return (
    <div
      className={`w-screen h-dvh background fixed z-50 flex justify-center items-center ${lairClass} ${data[currentIndex].color} transition`}
    ><div className="h-screen w-screen max-w-screen-2xl">
		
      <div className="h-full flex">
	  <div
        className={`xmark block h-11 w-11 absolute top-4 right-5 z-20 flex flex-col justify-center items-center gap-0.75 rounded-full cursor-pointer m-3.75 transition-colors duration-400 ease-in-out ${data[currentIndex].bg}`}
        onClick={handleClose}
      >
        <i className="fa-solid fa-xmark text-white"></i>
      </div>
        <div className="flex justify-between flex-col h-full w-1/4 ">
          <h2 className="title text-3xl p-5 fade-in">
            {data[currentIndex].category}
          </h2>
          <div className="ml-5 fade-in mb-96 md:mb-0 absolute md:relative mt-24 md:mt-0 w-1/2 z-50">
            <p>Origin : {data[currentIndex].origin}</p>
            <p>Région : {data[currentIndex].region}</p>
          </div>
          <h3 className="titleIntro md:text-7xl text-5xl md:pb-32 pb-20 pl-5 fade-in w-2/3 relative z-50">
            {data[currentIndex].name}
          </h3>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div className="w-128 h-128 md:w-156 md:h-156 border-solid border border-orange-900 rounded-full flex items-center justify-center absolute">
            <i
              className={`fa-solid fa-circle-arrow-right absolute right-10 md:-right-10 text-2xl cursor-pointer z-50 `}
              onClick={handleNext}
            ></i>
            <i
              className="fa-solid fa-circle-arrow-left absolute md:-left-10 left-10 text-2xl cursor-pointer z-50"
              onClick={handlePrev}
            ></i>
            <div className="h-129 w-56 md:h-160 md:w-72 border-solid border-orange-900 border rounded-full fade-in z-40">
              <img
                src={data[currentIndex].image}
                className={`w-full h-full rounded-full object-cover ${animationClass}`}
              />
            </div>
            <div
              className="w-120 h-120 md:w-144 md:h-144 border-orange-900 border-solid border flex items-center justify-center z-30 absolute"
              style={rotationStyle}
            ></div>
          </div>
        </div>
        <div className="md:w-1/4 flex justify-end flex-col absolute md:relative bottom-0 right-0 w-1/2 pl-10 md:pl-0 md:pb-10" >
		
          <span className="md:pb-32 md:pr-5 fade-in z-50 relative text-s">
            {data[currentIndex].description}
          </span>
        </div>
      </div>
	</div>
      
    </div>
  );
};

export default Lair;
