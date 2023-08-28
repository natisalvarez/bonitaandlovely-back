
import { useEffect, useState } from "react";
import ProductosTable from "./Productos";
import ClientesTable from "./ClientesTable";
import VentasTable from "./Ventas";
import Form from '../Form/Form'
import { products } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const [Productos, setProductos] = useState(true);
  const [Clientes, setClientes] = useState(false);
  const [Ventas, setVentas] = useState(false);

  const [FormCreacion, setFormCreacion] = useState(false)
  const [navStyles, setNavStyles] = useState([
    "bg-yellow-400 text-gray-900",
    "text-gray-900",
    "text-gray-900",
  ]);

  const handleNav = () => {
    setProductos(true);
    setClientes(false);
    setVentas(false);
    setFormCreacion(false)


    setNavStyles(["bg-yellow-400 text-gray-900", "text-gray-900", "text-gray-900"]);
  };
  const handleNav2 = () => {
    setProductos(false);
    setClientes(true);
    setVentas(false);
    setFormCreacion(false)


    setNavStyles(["bg-white text-gray-900", "bg-yellow-400 text-gray-900", "text-gray-900"]);
  };
  const handleNav3 = () => {
    setClientes(false);
    setProductos(false);
    setVentas(true);
    setFormCreacion(false)

    setNavStyles(["bg-white text-gray-900", "text-gray-900", "bg-yellow-400 text-gray-900"]);
  };
  const handleNav4 = () => {
    setClientes(false);
    setProductos(false);
    setVentas(false);
    setFormCreacion(true)

    setNavStyles(["bg-white text-gray-900", "text-gray-900", "bg-yellow-400 text-gray-900"]);
  };




  return (
    <div className="flex">
      <nav className="bg-gray-100 w-40 flex flex-col justify-start items-stretch border-r border-gray-200">
        <div className="flex justify-between items-center py-4 px-2">
          <h1 className="text-3xl text-gray-700 font-medium">
           Admin Dashboard</h1>
        </div>
        <ul className="flex-grow pb-5 mb-4">

          <li
            className={`text-lg font-bold p-3 cursor-pointer shadow-md bg-gray-100 transition duration-500 ${navStyles[0]} hover:bg-gray-300`}
            onClick={handleNav}>
            Productos
          </li>
          <li
            className={`text-lg font-bold p-3 cursor-pointer shadow-md transition duration-500 ${navStyles[1]} hover:bg-gray-300`}
            onClick={handleNav2}>
            Clientes
          </li>
          <li
            className={`text-lg font-bold p-3 cursor-pointer shadow-md transition duration-500 ${navStyles[3]} hover:bg-gray-300`}
            onClick={handleNav3}>
            Ventas
          </li>
          <li
            className={`text-lg font-bold p-3 cursor-pointer shadow-md transition duration-500 ${navStyles[2]} hover:bg-gray-300`}
            onClick={handleNav4}>
           Añadir producto
          </li>
        </ul>
      </nav>
      <div className="flex-grow bg-gray-50">
        {Productos ? <ProductosTable /> : ""}
        {Clientes ? <ClientesTable /> : ""}
        {Ventas ? <VentasTable /> : ""}
        {FormCreacion ? <Form></Form> : ""}


      </div>
    </div>
  );
};

export default Dashboard;