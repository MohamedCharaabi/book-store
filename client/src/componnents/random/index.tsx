import React from "react";

function index() {
  return (
    <div className="flex justify-between  pt-6">
      <div className="w-1/2 flex flex-col justify-center items-start px-12">
        <h1 className="text-black text-6xl lg:text-9xl">Guy Kawazaki</h1>

        <p className="text-black  text-base lg:text-lg pt-9">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
          quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quae tempora vitae quod, repellendus quo fuga veniam, reprehenderit
          vero ut doloremque veritatis voluptatum perspiciatis a animi qui
          recusandae ducimus repudiandae natus.
        </p>

        <div className="flex p-8">
          <button className="bg-blue-500 text-white w-36 py-2 px-4 rounded-full">
            Buy now
          </button>
          <button className="bg-blue-500 text-white w-36 py-2 px-4 rounded-full ml-2">
            See Details
          </button>
        </div>
      </div>

      <div className="w-1/3  ">
        <img
          src="https://www.imagebee.org/misc/book-cover/book-cover-1-1725x2625.jpg"
          alt="random"
        />
      </div>
    </div>
  );
}

export default index;
