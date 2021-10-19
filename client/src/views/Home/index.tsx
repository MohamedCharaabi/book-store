import { FC, useEffect, useState } from "react";
import Header from "../../componnents/header";
import Random from "../../componnents/random";
import Slider from "../../componnents/slider";

interface Props {}

export interface SliderData {
  txt1: string;
  txt2: string;
  txt3: string;
  image: string;
}
interface Genre {
  title: string;
  image: string;
}

let genres: Genre[] | any = [
  {
    title: "Drama",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8BtsyurB1qIGB5o6_Ng-uHJXiEZGjw7RZ026hb8Xi5ym0H5e9RQi84bbOGQIxmcKzm7c&usqp=CAU",
  },

  {
    title: "Comedy",
    image:
      "https://img.utdstc.com/icon/270/8c5/2708c5fe1f2ae7e7eb301ab47d63536159fb29a8394fcc1e388389527eda1925:200",
  },
  {
    title: "Biography",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgRTPnMAD3XhIkYwOgSlm08EuR5sYyEvf6Eg&usqp=CAU",
  },
  {
    title: "Science",
    image: "https://media.lactualite.com/2021/09/mr_conscience-1200x675.jpg",
  },
  {
    title: "Family",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgAaMjGBFq6cdhPHxb9fEeJlRPYBNTUdsj7yRC0_l_ICjmCxVNTyFiIBKdsWRvOFvCnzk&usqp=CAU",
  },
  {
    title: "History",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUFKlgV4kAIBPc7bucJnJIjo4hv6vkCRY9eGg3926-v5UsXaGphaVFxPIAAOz-cT_yOik&usqp=CAU",
  },
  {
    title: "Religion",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdI76LnyvLxLY22Y13VQh3mCzn_dJPcD8oqJ4g2lrHa0jeTPqEVYkIKIFLBwe2BVLhGI&usqp=CAU",
  },
  {
    title: "Fantasy",
    image:
      "https://i.pinimg.com/originals/d4/07/a4/d407a47517be7b63aa90bed34ef76c18.jpg",
  },
  {
    title: "Romance",
    image:
      "https://blog.mangolanguages.com/hs-fs/hubfs/mango-valentines-day.png?width=795&name=mango-valentines-day.png",
  },
  {
    title: "Thriller",
    image:
      "https://media.istockphoto.com/photos/shhh-picture-id526854349?k=20&m=526854349&s=612x612&w=0&h=ynxPGkrUWDbYg53Wiw-RQotlwmt_NtEtT0Cz_tfi43s=",
  },

  {
    title: "Mystery",
    image:
      "https://theattractiongame.com/wp-content/uploads/2020/01/how-to-be-more-mysterious-1.jpg",
  },

  {
    title: "Crime",
    image:
      "https://bigdata-madesimple.com/wp-content/uploads/2017/09/Crime.jpg",
  },

  {
    title: "Adventure",
    image:
      "https://i0.wp.com/www.99inspiration.com/wp-content/uploads/2016/07/Brilliant-Adventure-Photography-by-Isaac-Gautschi.jpg?fit=800%2C800&ssl=1",
  },
];

let slider: SliderData[] = [
  {
    txt1: "Huge Library",
    txt2: "Listen or Read",
    txt3: "All Free",
    image:
      "https://skybook-16ed9.kxcdn.com/demo-01/wp-content/uploads/2018/12/slider2.jpg",
  },
  {
    txt1: "Huge Content",
    txt2: "keep track",
    txt3: "listen every where",
    image:
      "https://skybook-16ed9.kxcdn.com/demo-01/wp-content/uploads/2018/12/slider1.jpg",
  },
];

const Home: FC = (props: Props) => {
  const [sliderItem, setSliderItem] = useState(1);

  useEffect(() => {
    setInterval(() => {
      setSliderItem((sliderItem) => (sliderItem === 1 ? 0 : 1));
    }, 5000);
  }, []);

  // console.log(slider[sliderItem]);

  return (
    <div>
      <Header fixed={false} />
      {/* <Random /> */}

      <Slider {...slider[sliderItem]} />
      {/* genres */}
      <h1 className="text-black text-4xl px-10">Genres</h1>
      <div className="flex overflow-x-scroll overflow-y-hidden w-full gap-2 px-12 scrollbar-hidden">
        {genres.map((genre: Genre, index: number) => {
          return (
            <div
              className="h-52 min-w-max object-contain relative py-2 card
            transition delay-150 duration-300 ease-in-out transform hover:-translate-y-3 hover:scale-110 "
            >
              <img
                className=" w-28 h-full  opacity-90           "
                alt={genre.title}
                src={genre.image}
              ></img>
              <h3 className="absolute text-center top-1/2 left-0 w-full text-white font-bold">
                {genre.title}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Popular  */}

      <div className="flex justify-between px-10">
        <h1 className="text-black text-4xl">Popular</h1>
        <h2 className="text-blue-600">See All</h2>
      </div>
      <div className="flex overflow-x-scroll overflow-y-hidden  w-full gap-2 px-12 mt-2 scrollbar-hidden">
        {genres.map((genre: Genre) => {
          return (
            <div className="min-h-max w-40 flex-none  ">
              <img
                src="https://www.imagebee.org/misc/book-cover/book-cover-1-1725x2625.jpg"
                alt={genre.title}
                className="w-36 h-48"
              />
              <h3 className="  top-1/2 left-0  text-black ">
                ipsum dolor sit amet consectetur adipisicing
              </h3>
              <h3 className="  top-1/2 left-0 w-full text-gray-500 ">
                {genre.title}
              </h3>
              <h3 className="  top-1/2 left-0 w-full text-yellow-300 ">
                ✻✻✻✻✻
              </h3>
              <button className=" border-blue-600 border-2 rounded-lg p-2 text-blue-500">
                $22.95
              </button>
            </div>
          );
        })}
      </div>

      {/* Author of the week */}
      <h1 className="text-black text-4xl px-10">Author of the week</h1>

      <div className="h-64 w-full flex px-10 mt-2 mb-8">
        <div className="flex-grow flex flex-col justify-between">
          <div className="flex flex-col w-1/2 shadow-md">
            <div className="flex">
              <img
                className="h-64 w-52 rounded-lg"
                alt="author"
                src="data:image/jpeg;base64,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"
              />
              <div className="flex flex-col justify-between mt-7 ml-4">
                <div>
                  <h5>Benjamin</h5>
                  <h5>20 books</h5>
                  <span className="  top-1/2 left-0 w-full text-yellow-300 ">
                    ✻✻✻✻✻ 1210 votes
                  </span>
                </div>

                <button className="bg-yellow-500 w-max p-1 rounded mt-3">
                  Check it now
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* recommended Authors */}
        <div className="w-3/12 flex flex-col">
          <h1 className="text-black text-xl ">Recommended Authors</h1>
          <div className="flex mt-7">
            <img
              alt="author"
              className="rounded-full w-14 h-14"
              src="data:image/jpeg;base64,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"
            />
            <div className="flex-col flex ml-2">
              <span>Benjamin</span>
              <span className="  top-1/2 left-0 w-full text-yellow-300 ">
                ✻✻✻✻✻
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
