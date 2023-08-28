import { FaStar , FaRegStar} from 'react-icons/fa';
import { useSelector } from "react-redux";
import Rating from "react-rating";
const StartsDetail = ( ) => {
    const stateReviwerds = useSelector(state => state.AllRevierwsId);
    let highestRating = 0;
    if (Array.isArray(stateReviwerds)) {
      highestRating = stateReviwerds.reduce(
        (maxRating, { rating }) => Math.max(maxRating, rating),
        0
      );
    }
    return(         
    <Rating
    
        initialRating={highestRating}
        emptySymbol={
          <span className="text-lightgray"><FaRegStar  size="24" className='text-slate-400'/></span>
        }
        fullSymbol={<span><FaStar  size="24" className="text-red-500"/></span>}
        readonly={true}
      />)
}

export default StartsDetail;