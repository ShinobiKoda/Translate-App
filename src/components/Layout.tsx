import logo from "../assets/images/logo.svg";
import arrowDown from "../assets/images/Expand_down.svg";
import readAloud from "../assets/images/sound_max_fill.svg";
import copyText from "../assets/images/Copy.svg";
import translate from "../assets/images/Sort_alfa.svg";
import translateBtn from "../assets/images/Horizontal_top_left_main.svg"
import { useState } from "react";

const Layout = () => {
  const [value, setValue] = useState<string>("Hello, how are you?");
  return (
    <div>
      <div className="hero-img"> </div>
      <div className="flex flex-col gap-8 items-center justify-center w-full mt-40">
        <div>
          <img src={logo} alt="Logo Image" />
        </div>
        <div className="w-full px-5 max-w-[1440px] flex flex-col gap-10 lg:flex lg:flex-row lg:justify-between">
          <div className="bg-[#1e2432cc] text-white rounded-md p-5 w-full flex flex-col gap-8 border-[#4d5562] border">
            <div className="flex items-center gap-4 flex-wrap">
              <button className="cursor-pointer hover:opacity-90 p-2 rounded-md">
                Detect Language
              </button>
              <button className="cursor-pointer hover:opacity-90 bg-[#4d5562] p-2 rounded-md">
                English
              </button>
              <button className="cursor-pointer hover:opacity-90 p-2 rounded-md">
                French
              </button>
              <button className="flex gap-2 items-center cursor-pointer hover:opacity-90 p-2">
                <span>Spanish</span>
                <img src={arrowDown} alt="arrow-down" />
              </button>
            </div>
            <div className="w-full h-[1px] bg-[#363d4d]"></div>
            <div className="w-full">
              <textarea
                name="translate"
                id="translate"
                className="bg-transparent w-full border-none outline-none resize-none"
                rows={7}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              ></textarea>
            </div>
            <p className="w-full text-right">19/500</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img
                  src={readAloud}
                  alt="read aloud"
                  className="border-2 p-1 rounded-md border-[#4d5562] cursor-pointer hover:opacity-90"
                />
                <img
                  src={copyText}
                  alt="copyText"
                  className="border-2 p-1 rounded-md border-[#4d5562] cursor-pointer hover:opacity-90"
                />
              </div>
              <button className="flex items-center border-white border-2 py-2 px-4 bg-[#273fa9] rounded-md cursor-pointer hover:opacity-90">
                <img src={translate} alt="Translate" />
                <span>Translate</span>
              </button>
            </div>
          </div>
          <div className="bg-[#1e2432cc] text-white rounded-md p-5 w-full flex flex-col gap-8 border-[#4d5562] border">
            <div className="flex items-center gap-4 justify-between">
              <div className="flex items-center gap-6">
                <button className="cursor-pointer hover:opacity-90  p-2 rounded-md">
                  English
                </button>
                <button className="cursor-pointer hover:opacity-90 p-2 bg-[#4d5562] rounded-md">
                  French
                </button>
                <button className="flex gap-2 items-center cursor-pointer hover:opacity-90 p-2">
                  <span>Spanish</span>
                  <img src={arrowDown} alt="arrow-down" />
                </button>
              </div>
              <div className="p-2 border-2 border-[#4d5562] rounded-md cursor-pointer hover:opacity-90">
                <img src={translateBtn} alt="Translate" />
              </div>
            </div>
            <div className="w-full h-[1px] bg-[#363d4d]"></div>
            <div className="w-full">
              <textarea
                name="translate"
                id="translate"
                className="bg-transparent w-full border-none outline-none resize-none"
                rows={7}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              ></textarea>
            </div>
            <p className="w-full text-right">19/500</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img
                  src={readAloud}
                  alt="read aloud"
                  className="border-2 p-1 rounded-md border-[#4d5562] cursor-pointer hover:opacity-90"
                />
                <img
                  src={copyText}
                  alt="copyText"
                  className="border-2 p-1 rounded-md border-[#4d5562] cursor-pointer hover:opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
