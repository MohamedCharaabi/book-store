import { FC, useEffect } from "react";
import { SliderData } from "../../views/Home";

const Slider: FC<SliderData> = (selectedSlider: SliderData) => {
  console.log(selectedSlider);
  return (
    <div className="slider">
      <div className="slider-container">
        <div
          className=" relative "
          style={{
            backgroundColor:
              selectedSlider.txt3 === "All Free" ? "#c2e0d8" : "#83d9f4",
          }}
        >
          <img
            className="animate-fade-in-up-image "
            src={selectedSlider.image}
            alt=""
          />
        </div>
        <div className="absolute top-20 left-14  animate-fade-in-up-2-5">
          <h1 className="text-6xl  text-white font-fell uppercase">
            {selectedSlider.txt1}
          </h1>
          <h1 className="text-6xl  font-fell uppercase">
            {selectedSlider.txt2}
          </h1>
          <h1 className="text-7xl mt-2  text-yellow-600 font-fell uppercase">
            {selectedSlider.txt3}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Slider;
