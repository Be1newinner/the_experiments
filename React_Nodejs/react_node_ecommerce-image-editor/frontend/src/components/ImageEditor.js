import React, { useState, useEffect } from "react";
import backgroundCoordinates from "./backgroundCoordinates.json"; // Adjust the path accordingly

const ImageEditor = () => {
  const [productImage, setProductImage] = useState(null);
  const [backgroundImages] = useState(
    [...Array(15).keys()].map((index) => `bg${index + 1}.png`)
  );
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [coordinates, setCoordinates] = useState({
    topLeft: { top: "0%", left: "0%" },
    topRight: { top: "0%", left: "50%" },
    bottomLeft: { top: "50%", left: "0%" },
    bottomRight: { top: "50%", left: "50%" },
  });

  useEffect(() => {
    // Load default coordinates for the first background image
    if (backgroundImages.length > 0) {
      setCoordinates(backgroundCoordinates[backgroundImages[0]]);
    }
  }, [backgroundImages]);

  const handleProductImageUpload = (event) => {
    const file = event.target.files[0];
    setProductImage(URL.createObjectURL(file));
  };

  const handleBackgroundImageSelect = (backgroundImage) => {
    setSelectedBackground(backgroundImage);
    setCoordinates(backgroundCoordinates[backgroundImage]);
  };

  const calculateProductDimensions = () => {
    if (!productImage) return { width: "0%", height: "0%" };

    const { width, height } = productImage;
    const { top, left } = coordinates.topLeft;
    const widthPercentage = coordinates.topRight.left - left;
    const heightPercentage = coordinates.bottomLeft.top - top;

    let newWidth = `${widthPercentage}%`;
    let newHeight = `${(widthPercentage / width) * height}%`;

    if (parseFloat(newHeight) > heightPercentage) {
      newHeight = `${heightPercentage}%`;
      newWidth = `${(heightPercentage / height) * width}%`;
    }

    return { width: newWidth, height: newHeight };
  };

  const productDimensions = calculateProductDimensions();

  return (
    <div>
      <h1>Product Image Editor</h1>

      <input
        type="file"
        accept="image/png"
        onChange={handleProductImageUpload}
      />
      <br />

      {productImage && (
        <div>
          <h2>Product Image</h2>
          <img
            src={productImage}
            alt="Product"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
      )}

      <h2>Background Images</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {backgroundImages.map((bgImage, index) => (
          <div key={index} style={{ width: "200px", margin: "10px" }}>
            <img
              src={`/assets/bg/${bgImage}`}
              alt="Background"
              style={{ width: "100%", cursor: "pointer" }}
              onClick={() => setSelectedBackground(bgImage)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "5px",
              }}
            >
              <button>Download</button>
              <button>Edit</button>
            </div>
          </div>
        ))}
      </div>

      {selectedBackground && (
        <div>
          <h2>Final Image Preview</h2>
          <div
            style={{
              position: "relative",
              width: "800px",
              height: "450px",
              overflow: "hidden",
            }}
          >
            <img
              src={`/assets/bg/${selectedBackground}`}
              alt="Background"
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                ...coordinates.topLeft,
              }}
            />
            {productImage && (
              <img
                src={productImage}
                alt="Product"
                style={{
                  position: "absolute",
                  ...coordinates.topLeft,
                  width: productDimensions.width,
                  height: productDimensions.height,
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
