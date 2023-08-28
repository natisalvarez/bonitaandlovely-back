import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteAPI, addFavoriteLS, addItemToCartApi, addItemToCartLS, addToCartFunction, deleteFavoriteAPI, deleteFavoriteLS } from "../../redux/actions";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Card = ({ id, name, precio, imagenPrincipal }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const localFavorites = useSelector((state) => state.localFavorites);
  const favoritesRaw = useSelector((state) => state.favoritesRaw);
  const { isAuthenticated, user } = useAuth0();
  const extractNumber = (string) => {
    const match = string.match(/\d+/); // Busca uno o más dígitos en la cadena
    return match ? parseInt(match[0]) : 0; // Convierte el resultado a un número o devuelve 0 si no hay coincidencia
  };
  const productoId = extractNumber(id);
  const correo_electronico = user?.email;
  const favorito = {
    productoId,
    correo_electronico,
  };

  useEffect(() => {
    if (isAuthenticated) {
      setIsFavorite(favorites.some((objeto) => objeto.id === id));
    } else {
      setIsFavorite(localFavorites.some((item) => item.id === id));
    }
  }, [isAuthenticated, favorites, localFavorites, id]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      if (isAuthenticated) {
        if (favoritesRaw.length > 0) {
          const resultado = favoritesRaw.find(
            (objeto) => objeto.productoId === id
          );
          if (resultado) {
            const idFav = resultado.id;
            const favoritoR = {
              correo_electronico,
              idFav,
              id,
            };
            dispatch(deleteFavoriteAPI(favoritoR));
          }
        }
      } else {
        dispatch(deleteFavoriteLS(id));
      }
    } else {
      if (isAuthenticated) {
        dispatch(addFavoriteAPI(favorito));
      } else {
        dispatch(addFavoriteLS(id));
      }
    }
    setIsFavorite(!isFavorite);
  };

const NumUserId=user;
const addToCart = () => {        
  if (isAuthenticated){ console.log("Autenticated en detail", isAuthenticated);
      dispatch(addItemToCartApi({userId: NumUserId, productoId:id, cantidad:1}));
  }else{ console.log("Autenticated en detail LS", isAuthenticated);
      dispatch(addItemToCartLS(id, 1)); 
  }
  dispatch(addToCartFunction(id, 1));

  Swal.fire({
    icon: 'success',
    title: 'Añadido al carrito',
    showConfirmButton: false,
    timer: 1500
});
}
  


  const cartIcon =
    "inline-block mr-2 -mt-1 text-xl text-white group-hover:text-gray-100 transition-colors duration-300";

  return (
    <div className="relative px-4 py-5 bg-white border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-gray-100">
      <Link to={`/detail/${id}`}>
        <img
          src={imagenPrincipal}
          alt={name}
          className="w-full h-48 object-cover rounded-md"
        />
      </Link>
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-xl leading-tight font-semibold capitalize text-gray-800">
          {name}
        </h3>
        <button
          className={`relative group p-2 ml-2 ${
            isFavorite ? "text-red-500 font-bold" : "text-gray-400"
          }`}
          onClick={handleFavoriteClick}
        >
          <AiFillHeart className="text-xl transition duration-300 ease-in-out group-hover:text-red-400" />
        </button>
      </div>
      <p className="text-gray-500 my-2 text-sm">${precio}</p>
      <button
      
        onClick={addToCart}
        className="block bg-gray-800 text-white uppercase text-xs mx-auto px-8   py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
      >
        Agregar al  
        <AiOutlineShoppingCart className={cartIcon}  />

      </button>
    </div>
  );
};

export default Card;