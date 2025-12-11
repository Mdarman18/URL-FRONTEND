import { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { FaArrowRight, FaHeart, FaMoon, FaSun } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import BaseUrl from "../Axios";
import { FaCopy } from "react-icons/fa6";
import { FaExternalLinkAlt, FaShareAlt } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { FaInstagram } from "react-icons/fa6";
import { IoCloudyNight } from "react-icons/io5";

function Home() {
  const [theme, setTheme] = useState(false);
  const [input, setInput] = useState("");
  const [url, setUrl] = useState("");
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please Enter a Valid Url", { duration: 1500 });
      return;
    }
    try {
      const Result = await BaseUrl.post("/api/home", { url: input });
      setUrl(Result.data);
      console.log(Result.data);
    } catch (error) {
      toast.error("Invalid URL format.Example: https://www.example.com", {
        duration: 1500,
      });
      console.log(error);
      setInput("");
      return;
    }
  };

  const HandleRedirect = async () => {
    if (url && url.id) {
      window.open(`https://url-server-ten.vercel.app/api/${url.id}`, "_blank");
    }
  };

  const EmptyText = () => {
    setInput("");
    setUrl("");
  };
  const CopyLink = async () => {
    if (url && url.id) {
      const shortUrl = `https://url-server-ten.vercel.app/api/${url.id}`;
      navigator.clipboard.writeText(shortUrl);
      toast.success("URL Copied!");
    }
  };
  return (
    <>
      <div
        className={`min-h-screen  flex flex-col items-center ${
          theme === true
            ? "bg-gray-500 text-white-100"
            : "bg-purple-200 text-black-900"
        } `}
      >
        <Toaster position="top-center font-semibold" />
        <h1 className="text-2xl md:text-[2.34rem] font-semibold flex gap-[5px] mt-[20px]">
          URL SHORTNER{" "}
          <FaLink className="mt-[5px] md:mt-[10px] cursor-pointer text-blue-900" />{" "}
        </h1>

        <div
          className={`h-[200px] gap-[13px] flex flex-col w-full  md:w-[700px] mt-[12px]  rounded-[12px] p-4
            ${
              theme === true
                ? "bg-slate-100 text-white-100 shadow-xl shadow-black/50"
                : "bg-slate-200 text-black-900"
            }
            
            
            `}
        >
          <label className="text-[1.43rem]">Paste your long link here</label>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-[90%] h-[50px] rounded-[8px] ml-0 md:ml-[40px] focus:outline-none focus:border-blue-800 border-[0.18rem] text-center text-[1.2rem] "
            placeholder="http//examples.com/my-long-url"
          />

          <button
            onClick={HandleSubmit}
            className={`flex items-center justify-center gap-2 w-[180px] rounded-[17px] h-[50px] bg-blue-600 text-white text-[1.23rem] cursor-pointer
               ${
                 theme === true
                   ? "bg-blue-200 text-blue-900 shadow-xl shadow-black/50"
                   : "bg-blue-600 text-black-900"
               }
              `}
          >
            Get your link
            <FaArrowRight />
          </button>
        </div>
        {url && (
          <div className="  rounded-[10px] mt-[20px] flex flex-col  items-center  bg-slate-500">
            <h2
              onClick={HandleRedirect}
              className="cursor-pointer pt-[4px] hover:underline text-[1.63rem] text-blue-800 font-bold"
            >
              {url ? `http://short.ly/${url.id}` : ""}
            </h2>
            <div className=" h-[35px] flex gap-[30px] mt-[10px] ml-[10px] cursor-pointer">
              <div className="   text-[1.3rem]   ">
                <FaCopy
                  onClick={CopyLink}
                  className="text-black-500 hover:text-red-800 font-bold   transition duration-300 transform hover:scale-155"
                />
              </div>
              <div className="   text-[1.3rem] cursor-pointer">
                <FaShareAlt className="text-black hover:text-purple-800 transition duration-300 transform hover:scale-155" />
              </div>
              <div className="  text-[1.3rem] cursor-pointer">
                <FaExternalLinkAlt
                  className="text-black-500 hover:text-blue-800 transition duration-300 transform hover:scale-155"
                  onClick={HandleRedirect}
                />
              </div>
              <div className="  text-[1.3rem] cursor-pointer">
                <Link to={`/api/detalis/${url.id}`}>
                  <ImStatsDots className="text-black-500 hover:text-blue-800 transition duration-300 transform hover:scale-155" />
                </Link>
              </div>
            </div>
            <button
              onClick={EmptyText}
              className="w-full md:w-[200px] mb-[8px] h-[33px] rounded-[15px]  bg-purple-400 text-[1.2rem] cursor-pointer hover:bg-purple-600 "
            >
              Shorten Another Link
            </button>
          </div>
        )}
        <div className="my-4">
          <div
            onClick={() => setTheme(!theme)}
            className=" text-4xl cursor-pointer"
          >
            {theme == true ? <FaSun /> : <IoCloudyNight />}
          </div>
        </div>
        <div className="fixed bottom-0 w-full md:w-auto flex justify-center md:justify-end p-4 md:right-5">
          <h1
            className={`flex items-center gap-2 md:gap-1 text-sm md:text-base
              ${theme === true ? " text-white" : " text-black"}
              `}
          >
            Web Dev by
            <a
              href="https://www.instagram.com/only_arman18/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-blue-500 flex  hover:underline hover:scale-105 transition-transform duration-300 
                 ${theme === true ? " text-purple-700" : " text-blue-500"}
                `}
            >
              <FaInstagram className="mt-[5px] ml-[5px]  cursor-pointer hover: text-red-800" />{" "}
              @Only_Arman18
            </a>
          </h1>
          <FaHeart className="pb-[1px] pl-[5px] text-[1.45rem] cursor-pointer text-red-600 hover:text-red-900 hover:scale-125 transition-transform duration-300  " />
        </div>
      </div>
    </>
  );
}

export default Home;
