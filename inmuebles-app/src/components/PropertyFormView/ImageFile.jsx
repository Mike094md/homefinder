import React from "react";
import Image from "react-bootstrap/Image";
import { FaTrashAlt }  from "react-icons/fa"

const ImageFile = ({index, image, handleDelete}) => {
    const [opacity, setOpacity] = React.useState(0);

    return (
        
        <div
          style={{ position: "relative", display: "flex", justifyContent: "center", alignItems:"center"}}
          onClick={() => setOpacity(1)}
          onMouseEnter={() => setOpacity(1)}
          onMouseLeave={() => setOpacity(0)}
        >
          <Image
            key={index}
            src={URL.createObjectURL(image)}
            alt="preview"
            rounded
            style={{ width: "100%" }}
          />
            <div
                style={{
                background: "white",
                padding: "5px",
                borderRadius: "5px",
                position: "absolute",
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                cursor: "pointer",
                opacity: opacity,
                transition: "opacity 0.2s",
                }}
                onClick={() => handleDelete(index)}
            >
                <FaTrashAlt style={{color: "red"}}/>
            </div>
        </div>
        
    );
}

export default ImageFile;
