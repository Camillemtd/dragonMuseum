import PropagateLoader from "react-spinners/PropagateLoader";
const Loader = () => {
	return (
		<div className="relative z-50 bg-orange-100 w-screen h-screen flex justify-center items-center">
			<PropagateLoader color="#7f5539" />
		</div>
	)
};

export default Loader;