import { BsSendCheck, BsBagCheckFill } from "react-icons/bs";
import { IoRibbonSharp } from "react-icons/io5";
import {BiGift} from "react-icons/bi"
import "../../index.css";

const ChooseUsSection = () => {
  return (
    <section className="bg-[#FDA9FF] w-full h-full">
      <div className="w-[80%] m-auto px-20 py-10">
        <h2 className=" text-center font-bold	text-3xl pb-10 text-white">por que escogernos?</h2>
        <div className=" container grid grid-rows-1 grid-cols-4 gap-20 items-center text-center capitalize	  text-white">
          <div className="flex flex-col items-center">
            <BsBagCheckFill className="text-9xl" />
            <h2 className="pt-5 text-2xl font-semibold">titulo</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam,
              possimus.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <IoRibbonSharp className="text-9xl" />
            <h2 className="pt-5 text-2xl font-semibold">titulo</h2>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam,
              possimus.
            </p>
          </div>
        <div className="flex flex-col items-center">
            <BiGift className="text-9xl" />
            <h2 className="pt-5 text-2xl font-semibold">titulo</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam,
              possimus.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <BsSendCheck className="text-9xl" />
            <h2 className="pt-5 text-2xl font-semibold">titulo</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam,
              possimus.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUsSection;
