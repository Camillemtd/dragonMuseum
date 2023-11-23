import React from 'react';

const DragonCardMenu = ({data, setOpenLair, updateLairData,}) => {
	const handleClick = (category) => {
		updateLairData(category);
		setOpenLair(true);
	  };
	return (
		<div className='w-1/3 h-full flex justify-center items-center flex-col cursor-pointer' onClick={() => handleClick(data.category)}>
			<div className='border-solid border-orange-900 border rounded-full h-1/2 '>
				<img src={data.image} className='w-full h-full rounded-full object-cover'/>
			</div>
			<h2 className='title text-orange-900 xl:text-6xl text-4xl md:text-5xl'>{data.category}</h2>
			
		</div>
	);
};

export default DragonCardMenu;