import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BaseUrl from "../Axios";
import { MdAdsClick } from "react-icons/md";
import { FaHeart, FaInstagram } from "react-icons/fa";

const New = () => {
  const { shortId } = useParams();
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchResponse = async () => {
      const res = await BaseUrl.get(`/api/detalis/${shortId}`);
      setData(res.data);
    };

    fetchResponse();
  }, [shortId]);
  return (
    <div className="min-h-screen bg-purple-200  flex flex-col  items-center">
      {data ? (
        <>
          <div className="my-10">
            <h1 className="text-4xl font-bold text-red-400 flex ">
              Total Clicks{" "}
              <MdAdsClick className=" mt-[6px] text-blue-400 mx-2 animate-pulse " />
              : {data.totalClick}
            </h1>

            <div className="my-4 flex flex-col bg-slate-300 rounded-lg px-2 items-center">
              <h2 className="text-3xl">Detalis Of Clicks </h2>

              {data.detalis && data.detalis.length > 0 ? (
                data.detalis.map((item, index) => (
                  <div className="flex space-x-4 flex   ">
                    <div className="text-xl" key={index}>
                      {index+1}.
                    </div>

                    <div className="text-2xl">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <li>No visit history yet</li>
              )}
            </div>
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
      <div className="flex justify-center ">
        <h1 className="flex text-xl font-semibold">
          web dev by{" "}
          <a
            href="https://www.instagram.com/only_arman18/"
            className="  text-blue-400 hover:underline hover:text-blue-800 flex text-[14px] my-[6px] hover:scale-105 transition-transform duration-300"
          >
            <FaInstagram className=" mx-[5px] my-[5px] text-[0.8rem] cursor-pointer hover: text-red-800" />{" "}
            @Only_Arman18
          </a>
        </h1>
        <FaHeart className="mt-[4px] pl-[5px] text-[1.45rem] cursor-pointer text-red-600 hover:text-red-900 hover:scale-125 transition-transform duration-300  " />
      </div>
    </div>
  );
};

export default New;
