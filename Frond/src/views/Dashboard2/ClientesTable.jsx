import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { products } from "../../redux/actions";
import { BsCheckCircle } from 'react-icons/bs';
import { BsXCircle } from 'react-icons/bs';
import axios from "axios";
import { clients } from '../../redux/actions.js'

const ClientesTable = () => {
  useEffect(
    () => {
        dispatch(clients());
      },[])

  const dispatch = useDispatch()
  const stateClients = useSelector(state => state.Allclients);
  console.log(stateClients);
  const [disableTF, setDisableTF] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const numberSize = 10;

  const handlerPageNumber = (index) => {
    setPageNumber(index);
  };

  useEffect(
    () => {
      const fetchData = () => {
        const queries = {
          page: pageNumber,
          size: numberSize
        };

        dispatch(products(queries));
      };

      fetchData();
      setDisableTF(pageNumber <= 0 || pageNumber >= stateClients.paginas - 1);
    },
    [dispatch, pageNumber, numberSize, stateClients.paginas]
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
            <th className="border-0 px-6 py-4 font-bold">Nombre</th>
            <th className="border-0 px-6 py-4 font-bold">Correo Electronico</th>
            <th className="border-0 px-6 py-4 font-bold">Direccion</th>
            <th className="border-0 px-6 py-4 font-bold">Estado</th>
            <th className="border-0 px-6 py-4 font-bold">Hacer admin</th>
            <th className="border-0 px-6 py-4 font-bold">Banear</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {stateClients.map((client) => (
            <tr key={client.id} className="border-t">
              <td className="px-6 text-center py-10">{client.name}</td>
              <td className="px-6 text-center py-10">{client.correo_electronico}</td>
              <td className="px-6 text-center py-10">{client.direccion}</td>
              <td className="px-6 l text-center py-10">
              {client.activa === true ? (
                <div className="d-flex align-items-center">
                  <span>Activo</span>
                  <BsCheckCircle className="relative bottom-4" />
                </div>
              ) : (
                <>
                  <span>Baneado</span>
                  <BsXCircle className="pr-3 relative bottom-4" />
              </>
              )}</td>
              <td className="px-6 text-center py-4">
                <button className="bg-indigo-900 text-white font-bold py-2 px-4 rounded hover:bg-gray-700">
                  Hacer admin
                </button>
              </td>
              <td className="px-6 text-center py-4">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Banear
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex py-30 justify-center items-center space-x-2 mt-4 mb-10">
    
      {Array.from(Array(stateClients.paginas), (_, i) => (
        <button
          key={i}
          className={`px-4 py-2 rounded hover:bg-gray-700 ${pageNumber === i ? 'bg-gray-800 text-white font-bold' : 'bg-white text-gray-600'}`}
          onClick={() => handlerPageNumber(i)}
        >
          {i + 1}
        </button>
      ))}
    
    </div>
        </>
      );
};

export default ClientesTable;