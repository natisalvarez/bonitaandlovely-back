import React from "react";
import { useSelector } from "react-redux";
import Rating from "react-rating";
import ReviwerD from "./ReviwerD";
import { FaStar, FaRegStar } from 'react-icons/fa';

const SectionReviews = () => {
  const stateReviwerds = useSelector(state => state.AllRevierwsId);
  let highestRating = 0;
  if (Array.isArray(stateReviwerds)) {
    highestRating = stateReviwerds.reduce(
      (maxRating, { rating }) => Math.max(maxRating, rating),
      0
    );
  }


  return (
    <section className="w-[90%] m-auto">
      <h2 className="text-2xl capitalize pb-5">opiniones de nuestro producto</h2>
      <div className="grid grid-cols-2  items-center">
        <div className="flex justify-start gap-4">
          <h2 className="text-5xl text-red-500 font-semibold">{highestRating}</h2>
          <Rating 
          className=" pt-1"
            initialRating={highestRating}
            emptySymbol={
              <span className="text-lightgray">
                <FaRegStar size="24" className="text-slate-400" />
              </span>
            }
            fullSymbol={
              <span>
                <FaStar className="text-red-500" size="24" />
              </span>
            }
            readonly={true}
          />
        </div>
        <ReviwerD />
      </div>
    </section>
  );
};

export default SectionReviews;
