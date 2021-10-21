
export interface Book {
    author: string;
    id: number;
    title: string;
    genre: string;
    price: number;
    cover_url: string;
    description: string;
    stars: number;
  }

 export interface Genre {
    title: string;
    image: string;
  }
 
 export const genresData: Genre[] | any = [
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