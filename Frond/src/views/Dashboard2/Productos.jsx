import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { products } from "../../redux/actions";
import { BsCheckCircle } from 'react-icons/bs';
import { BsXCircle } from 'react-icons/bs';
import axios from "axios";

const ProductosTable = () => {
  const dispatch = useDispatch()
  const stateProducts = useSelector(state => state.Allproducts);
  const [disableTF, setDisableTF] = useState(true);
  const [pageNumberNx, setPageNumberNx] = useState(0);
  const numberSize = 20;

  const handlerNext = () => {
    pageNumberNx < stateProducts.paginas -1 ? setPageNumberNx(prevNext => prevNext + 1) : setDisableTF(false)
  };

  const handlerPrev = () => {
    pageNumberNx > 0 ? setPageNumberNx(pageNumberNx - 1) : setDisableTF(false);
  };

  const handlerPageNumber = (index) => {
    setPageNumberNx(index);
  };

  useEffect(
    () => {
      const fetchData = () => {
        const queries = {
          page: pageNumberNx,
          size: numberSize
        };

        dispatch(products(queries));
      };

      fetchData();
      setDisableTF(pageNumberNx <= 0 || pageNumberNx >= stateProducts.paginas - 1);
    },
    [dispatch, pageNumberNx, numberSize, stateProducts.paginas]
  );
  
  const deleteProduct = (id) => {
    axios
      .delete(`/api/products/${id}`)
      .then((response) => {
        console.log(response.data); 
        dispatch(products({ page: 0, size: numberSize }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <table className="w-full rounded-lg overflow-hidden">
        <thead className="bg-gray-100 uppercase text-sm leading-normal">
          <tr className="text-gray-600">
            <th className="border-0 px-6 py-4 font-bold">ID</th>
            <th className="border-0 px-6 py-4 font-bold">Nombre</th>
            <th className="border-0 px-6 py-4 font-bold">Stock</th>
            <th className="border-0 px-6 py-4 font-bold">Estado</th>
            <th className="border-0 px-6 py-4 font-bold">Editar</th>
            <th className="border-0 px-6 py-4 font-bold">Borrar</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {stateProducts.productos.sort((a, b) => a.id - b.id).map((product) => (
            <tr key={product.id} className="border-t">
              <td className="px-6 text-center py-10">{product.id}</td>
              <td className="px-6 text-center py-10">{product.name}</td>
              <td className="px-6 text-center py-10">{product.stock}</td>
              <td className="px-6 l text-center py-10">
              {product.activa === true ? (
                <div className="d-flex align-items-center">
                  <span>Activo</span>
                  <BsCheckCircle className="ml-5 relative bottom-4" />
                </div>
              ) : (
                <>
                  <span>Activo</span>
                  <BsXCircle className="pr-3 relative bottom-4" />
              </>
              )}</td>
              <td className="px-6 text-center py-4">
                <button className="bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-700">
                  Editar
                </button>
              </td>
              <td className="px-6 text-center py-4">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => deleteProduct(product.id)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex py-30 justify-center items-center space-x-2 mt-4 mb-10">
    
      {Array.from(Array(stateProducts.paginas), (_, i) => (
        <button
          key={i}
          className={`px-4 py-2 rounded hover:bg-gray-700 ${pageNumberNx=== i ? 'bg-gray-800 text-white font-bold' : 'bg-white text-gray-600'}`}
          onClick={() => handlerPageNumber(i)}
        >
          {i + 1}
        </button>
      ))}
    
    </div>
        </>
      );
};

export default ProductosTable;