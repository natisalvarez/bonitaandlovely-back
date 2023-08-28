import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import Card from "../../components/CatalogoComponen/Card";

import MoreProductsCardContainer from "../../components/MoreProducts/MoreProductsContainer";

const Favoritos = () => {
  const favoritosLS = useSelector((state) => state.localFavorites);
  const favoritosAPI = useSelector((state) => state.favorites);
  const { user, isAuthenticated } = useAuth0();
  const categorias = useSelector((state) => state.Allcategories);

  const favoritos = isAuthenticated ? favoritosAPI : favoritosLS;

  const saludo = () => {
    return (
      <div className="text-xl">
        {isAuthenticated ? (
          <h1 className="mx-16 my-4">
            Hola, <span className="font-bold">{user.given_name}</span>. Estos son
            tus productos Favoritos:
          </h1>
        ) : (
          <h1>Estos son tus productos Favoritos</h1>
        )}
      </div>
    );
  };

  return (
    <div>

      {saludo()}
      {favoritos?.length ? (
        <div className="mx-24 my-8">
          <div className="flex flex-row flex-wrap justify-center">
            {favoritos.map(({ id, imagenPrincipal, name, descripcion, precio_venta }) => {
              return (
                <div className="w-80 justify-around p-3">
                  <Card
                    id={id}
                    key={id}
                    imagenPrincipal={imagenPrincipal}
                    name={name}
                    descripcion={descripcion}
                    precio={precio_venta}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center p-20 my-8">
          <button className="text-gray-600 text-xl font-medium">Tu lista de favoritos esta vacia</button>
        </div>
      )}
      <div className='flex flex-row gap-2 mt-10 m-10 bg-fuchsia-200 rounded-lg p-10 shadow-2xl justify-center items-center'>
      <MoreProductsCardContainer />
      </div>
    </div>
  );
};

export default Favoritos;