const Footer = () => {
  return (
    <div className="flex justify-center items-center fixed w-screen bottom-0 z-30 ">
      <div className="bg-[rgba(255,253,250,0.3)] flex flex-col justify-center items-center mb-10 p-6 rounded-2xl">
        <span className="slide-in-top text-amber-900">SCROLL DOWN</span>
        <div className="example example--2 mt-4">
          <span className="scroll-icon">
            <span className="scroll-icon__dot"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
