"use client";
import React, { useState, useEffect } from "react";
import "./Slider.css"
import Image from "next/image";

const Slider = ({
  imageList,
  width,
  height,
  loop = true,
  autoPlay = true,
  autoPlayInterval = 3000,
  showArrowControls = true,
  showDotControls = true,
  bgColor = "none",
}) => {
  let [active, setActive] = useState(0);

  const setPreviousImage = () => {
    if (active !== 0) {
      setActive((active -= 1));
    } else {
      if (loop) {
        setActive((active = imageList.length - 1));
      }
    }
  };

  const setNextImage = () => {
    if (active !== imageList.length - 1) {
      setActive((active += 1));
    } else {
      if (loop) {
        setActive((active = 0));
      }
    }
  };

  const leftClickHandle = () => {
    setPreviousImage();
  };

  const rightClickHandle = () => {
    setNextImage();
  };

  const dotClickHandler = (e) => {
    const dotNum = e.target.getAttribute("data-key");
    setActive((active = parseInt(dotNum)));
  };

  useEffect(() => {
    if (autoPlay) {
      let autoSlider = setInterval(setNextImage, autoPlayInterval);
      return () => clearInterval(autoSlider);
    }
  }, [active]);

  return (
    <div>
      <div className="wrapper" style={{ backgroundColor: bgColor }}>
        {((showArrowControls && !loop && active !== 0) ||
          (showArrowControls && loop)) && (
          <div className="leftClick" onClick={leftClickHandle}>
            <Image className="button" height={70}
          width={70} src={"/icons/back.svg"} alt="back" />
          </div>
        )}
        <img
          src={imageList[active].url}
          style={{
            width: width,
            height: height,
            objectFit: "cover",
            alignSelf: "center",
            margin: "0 auto", 
          }}
          alt="image"
        />
        {((showArrowControls && !loop && active !== imageList.length - 1) ||
          (showArrowControls && loop)) && (
          <div className="rightClick" onClick={rightClickHandle}>
            <Image className="button" height={70}
          width={70} src={"/icons/next.svg"} alt="next" />
          </div>
        )}
      </div>
      {showDotControls && (
        <div className="dots">
          {imageList.map((el, index) => {
            if (index !== active) {
              return (
                <div
                  key={index}
                  className="dot"
                  data-key={index}
                  onClick={dotClickHandler}
                />
              );
            } else {
              return <div key={index} className="activeDot"></div>;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Slider;