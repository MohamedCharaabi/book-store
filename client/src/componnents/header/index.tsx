import React, { FC, useEffect, useState } from "react";

interface Props {}

const Index: FC = (props: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
      return () => {};
    });
  }, []);

  return (
    <div
      className={`h-16 w-full sticky top-0 z-50 bg-gray-900 ${
        !show && "hidden"
      }`}
    >
      <h1>Header</h1>
    </div>
  );
};

export default Index;
