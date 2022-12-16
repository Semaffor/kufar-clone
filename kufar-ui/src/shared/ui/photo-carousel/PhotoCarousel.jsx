import React from 'react';

const PhotoCarousel = ({width, height, photos}) => {
  return (
    <div>
      <img src={photos} alt={"product_photo"} width={width} height={height}/>
    </div>
  );
};

export default PhotoCarousel;