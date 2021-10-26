import axios from "axios";
import { type } from "os";
import React, {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { X } from "react-feather";
import { Genre, genresData } from "../../types";
interface Props {
  openState: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Index: FC<Props> = (props: Props) => {
  const [processing, setProcessing] = useState(false);
  const [coverImage, setCoverImage] = useState<string>();
  const [pdfFile, setPdfFile] = useState<string>();
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    author: "",
    description: "",
  });

  const handleFileChange =
    (imageFile: Boolean) => (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const reader = new FileReader(),
        files = e.target.files;
      reader.onload = function () {
        typeof reader.result === "string" &&
          (imageFile
            ? setCoverImage(reader.result)
            : setPdfFile(reader.result));
        console.log(typeof reader.result);
      };
      reader.readAsDataURL(files![0]);
    };

  const uploadFiles = async () => {
    setProcessing(true);
    const data = new FormData();
    data.append("file", coverImage as string);
    data.append("upload_preset", "default");
    data.append("cloud_name", "isetz");

    const pdfdata = new FormData();
    pdfdata.append("file", pdfFile as string);
    pdfdata.append("upload_preset", "default");
    pdfdata.append("cloud_name", "isetz");

    // console.log(coverImage);
    // // console.log(formData)

    fetch("https://api.cloudinary.com/v1_1/isetz/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())

      .then(async (data) => {
        await axios
          .post(`http://localhost:5000/api/books`, {
            ...formData,
            cover_url: data.url,
            pdf: pdfFile,
          })
          .then((res) => {
            console.log(res);
            setProcessing(false);
            // handleSuccess({ props: { title: 'Department submited successfully' } })
            // reLogin(data = { email: formData.email, password: userData.password })
          })
          .catch((err) => console.log(err));
        setProcessing(false);
        // handleError({ props: { title: 'An Error aquired', text: error.message } }))
      })
      .catch(
        (err) => {
          console.log(err);
          setProcessing(false);
        }
        //  handleError({ props: { title: 'An Error aquired', text: error.message } })
      );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadFiles();
  };

  return (
    <div
      className={`${
        props.openState ? "w-97 p-2" : "w-0"
      }  h-full    opacity-95 transition-all ease-in-out transform delay-300`}
    >
      <div>
        {/* header */}

        <div className="flex justify-between items-center  h-16">
          <h4 className="text-white text-xl">Create Book</h4>
          <div className="bg-gray-200 p-2">
            <X onClick={() => props.setOpen(false)} />
          </div>
        </div>
        <hr />

        {/* body */}

        <form className="w-full max-w-lg mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="grid-Title"
              >
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-Title"
                type="text"
                placeholder="Title"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="grid-category"
              >
                Category
              </label>
              <select
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-category"
                onChange={(e) =>
                  setFormData({ ...formData, genre: e.target.value })
                }
              >
                <option value="" disabled>
                  Choose...
                </option>
                {genresData.map((genre: Genre) => (
                  <option key={genre.title} value={genre.title}>
                    {genre.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap items-center -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="grid-author"
              >
                Author
              </label>
              <select
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-author"
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
              >
                <option value="" disabled>
                  Choose...
                </option>
                <option value="Chris Brown">Chris Brown</option>
                <option value="Adam Levine">Adam Levine</option>
                <option value="Dua Lipa">Dua Lipa</option>
                <option value="Cheb Mami">Cheb Mami</option>
                <option value="Cheb Kaled">Cheb Khaled</option>
              </select>
            </div>
            {/* add auther */}
            {/* <div className="w-12 md:w-1/2 px-3 bg-red-900 ">
              <button>Create new Author</button>
            </div> */}
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="grid-description"
              >
                Description
              </label>

              <textarea
                id="grid-description"
                className="form-textarea mt-1 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                rows={3}
                placeholder="Enter some long form content."
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="grid-cover"
              >
                Cover Image
              </label>

              <input
                id="grid-cover"
                className="form-textarea mt-1 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="file"
                accept="image/*"
                onChange={handleFileChange(true)}
              />
            </div>
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="grid-cover"
              >
                PDF File
              </label>

              <input
                id="grid-cover"
                className="form-textarea mt-1 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="file"
                accept="pdf/*"
                onChange={handleFileChange(false)}
              />
            </div>
          </div>

          <hr />
          {/* footer */}
          <div className="flex justify-center flex-wrap -mx-3 mb-2 mt-2">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500-500 focus:border-blue-700 active:bg-blue-700 transition ease-in-out duration-150 cursor-not-allowed "
            >
              <svg
                className={`animate-spin -ml-1 mr-3 h-5 w-5 text-white ${
                  !processing && "hidden"
                }`}
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {processing ? "Processing" : "Create Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
function imageFile(
  imageFile: any
): React.ChangeEventHandler<HTMLInputElement> | undefined {
  throw new Error("Function not implemented.");
}
