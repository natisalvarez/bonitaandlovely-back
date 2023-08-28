import Rating from "react-rating";
import { FaStar , FaRegStar} from 'react-icons/fa';
const CardsReviwers = ({ nameClient, rating, fecha, comentario }) => {
  const formattedFecha = new Date(fecha).toISOString().split("T")[0];
  return (
    <div className="bg-slate-100 border-t border-b p-4 grid gap-5">
      <div className="flex justify-between items-center">
      <Rating
            initialRating={rating}
            emptySymbol={
              <span className="text-lightgray"><FaRegStar className="text-slate-400"/></span>
            }
            fullSymbol={<span><FaStar className="text-red-500"/></span>}
            readonly={true}
          />
        <p className="text-slate-500">
          {formattedFecha}
        </p>
      </div>
      <p>
        {comentario}
      </p>
    </div>
  );
};

export default CardsReviwers;
