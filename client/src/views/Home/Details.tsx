import { FC, useState } from "react";
import {
  Facebook,
  Feather,
  Icon,
  Linkedin,
  Mail,
  Twitter,
} from "react-feather";
import Header from "../../componnents/header";

interface Social {
  icon: Icon;
  link: string;
  name: string;
  mainColor: string;
  hoverColor: string;
}

const twitter: Social = {
  icon: Twitter,
  link: "https://twitter.com/",
  name: "Twitter",
  mainColor: "blue-400",
  hoverColor: "blue-500",
};

const facebook: Social = {
  icon: Facebook,
  link: "https://twitter.com/",
  name: "Facebook",
  mainColor: "blue-600",
  hoverColor: "blue-700",
};

const linkedin: Social = {
  icon: Mail,
  link: "https://linkedin.com/",
  name: "Linkedin",
  mainColor: "red-500",
  hoverColor: "red-600",
};

const SocialButton = (props: Social) => {
  console.log(props);
  return (
    <div
      className={`w-12 h-12 rounded-md bg-${props.mainColor} hover:bg-${props.hoverColor} p-2 grid place-content-center`}
    >
      <props.icon strokeWidth={1} color={"white"} size={24} />
    </div>
  );
};

interface Props {}

const Details: FC = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (
    event: React.MouseEvent<HTMLElement>,
    tab: number
  ) => {
    event.preventDefault();
    setSelectedTab(tab);
  };

  return (
    <div>
      <Header fixed={false} />

      <div className="flex h-full">
        {/* book  */}
        <div className="md:w-3/4 h-2/5">
          <div className="flex  bg-white">
            <img
              className="sm:h-2/5 w-2/5 rounded-lg"
              alt="author"
              src="https://skybook-16ed9.kxcdn.com/demo-03/wp-content/uploads/2018/05/product-18-1.jpg"
            />
            <div className="flex flex-col justify-start  w-3/4    ml-4">
              <h1 className="text-5xl font-fell uppercase mb-2">
                A Bigger Prize
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </p>

              <div className="flex flex-col mt-2">
                <h5>
                  <span className="font-bold">Category:</span> History
                </h5>

                <h5>
                  <span className="font-bold">Tags:</span> #History #Science
                </h5>
                <div className="flex gap-1">
                  <SocialButton {...facebook} />
                  <SocialButton {...twitter} />
                  <SocialButton {...linkedin} />
                </div>
              </div>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex justify-center gap-2 w-full">
            <div>
              <a
                onClick={(e) => handleTabChange(e, 0)}
                className={`py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300`}
              >
                Description
              </a>
              <div
                className={`h-0 w-full bg-blue-500 ${
                  selectedTab === 0 && "h-1"
                }`}
              ></div>
            </div>
            <div>
              <a
                onClick={(e) => handleTabChange(e, 1)}
                className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300"
              >
                Reviews
              </a>
              <div
                className={`h-0 w-full bg-blue-500 ${
                  selectedTab === 1 && "h-1"
                }`}
              ></div>
            </div>
          </div>
          {/* Tab content */}
          <div className="flex flex-col justify-center gap-2 w-full">
            <h5>{selectedTab === 0 ? "Description" : "Reviews"}</h5>
          </div>
        </div>

        {/* recomended */}
        <div className="w-1/4 h-full hidden  md:block">
          <div className="flex flex-col justify-start  w-full    ml-4">
            <h1 className="font-rufina text-2xl uppercase mb-2">Recomended</h1>
            {[1, 2, 3, 4, 5].map((item, index) => {
              return (
                <div className="flex h-20 lg:h-28 w-full">
                  <div className="flex w-1/4 h-full bg-white">
                    <img
                      className=" w-full h-full"
                      alt="author"
                      src="https://skybook-16ed9.kxcdn.com/demo-03/wp-content/uploads/2018/05/product-18-1.jpg"
                    />
                  </div>
                  <div className="flex flex-col w-3/4 h-full ml-4">
                    <h1 className=" mb-2">A Bigger Prize</h1>
                    <span className="  top-1/2 left-0 w-full text-yellow-300 ">
                      ✻✻✻✻✻
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
