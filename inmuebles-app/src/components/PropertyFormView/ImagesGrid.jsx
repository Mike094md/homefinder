import React from "react";
import ImageFile from "./ImageFile"

const ImagesGrid = ({ images, handleDelete }) => {

  
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "10px",
        marginBottom: "2rem",
      }}
    >
      {images.map((image, index) => (
        <ImageFile image={image} index={index} handleDelete={handleDelete}/>
      ))}
    </div>
  );
};


export default ImagesGrid;
