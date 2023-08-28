import React, { useEffect } from "react";
import { FaWhatsapp } from 'react-icons/fa';
import './App.css';
import {Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import Products from "./components/Products/Products";
import AboutUs from "./views/AboutUs/AboutUs";
import Contact from "./views/Contact/Contact";
import DevTeam from './views/DevTeam/devTeam.jsx'
import FAQs from "./views/FAQs/FAQs"
import Catalogo from "./views/Catalogo/Catalogo.jsx";
import Form from "./views/Form/Form";
import Profile from "./views/Profile/MiPerfil.jsx";
import Detail from "../src/views/Detail/Detail";
import Favoritos from "../src/views/Favoritos/Favoritos"
import Dashboard2 from "./views/Dashboard2/dashboard";
import axios from "axios"
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import AddToCart from "./views/Cart/AddToCart";
import MisCompras from '../../Frond/src/views/Mis compras/misCompras.jsx'
import Carrito from "./views/Cart/Carrito";
import PagoExitoso from "./views/PagoExitoso/PagoExitoso.jsx"
import { useAuth0 } from "@auth0/auth0-react";
import { clientes, productosSinPag, syncFavoritesWithAPI } from "./redux/actions";
import { useDispatch, useSelector} from "react-redux";
import WhatsappIcon from '../../Frond/src/assets/img/social.png'
import { useParams } from "react-router-dom"; 

//para no repetir el puerto:(se está configurando una URL base que se utilizará como prefijo para todas las peticiones realizadas con Axios) 
// axios.defaults.baseURL = "http://localhost:3001/"

//Acá va el link del back
axios.defaults.baseURL = "https://bonitaandlovely-production-a643.up.railway.app"
// import ActionProvider from "./components/ChatBot/ActionProvider";

function App () {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user, isAuthenticated, isLoading} = useAuth0()
  useEffect(() => {
    dispatch(clientes());
  }, []);
  const usuarios = useSelector((state) => state.Allclients);
  const currentUser = usuarios.find(
    (usuario) =>
      !isLoading &&
      user &&
      usuario.name.toLowerCase() === user.name.toLowerCase() &&
      usuario.correo_electronico.toLowerCase() === user.email.toLowerCase()
  );

  
  useEffect(()=>{
    dispatch(productosSinPag())
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(syncFavoritesWithAPI(user.email));
    }
  }, [user]);
  const params = useParams();

    const sendWhatsappMessage = () => {
      window.open("https://wa.me/573103232638", "_blank")
    };

  // Esto aun no esta listo del todo, no tocar.
  return (
    <div>
      {
            location.pathname !== "/" ? <Navbar /> : null
         }
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/devTeam" element={<DevTeam />} />
        <Route path="/form" element={<Form />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favoritos" element={<Favoritos />} />
        {/* Esta era la ruta anterior <Route path="/catalogo/detail/:id" element={<Detail />} /> */}
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/itemadded/:id" element={<AddToCart />} />
        <Route path="/carrito/:id" element={<Carrito />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/perfil" element = {<Profile/>}/>
        <Route path="confirmedpayment" element={<PagoExitoso/>}/>      
        <Route path="/miscompras" element = {<MisCompras/>}/>

        
          {/* Protección de ruta directamente en App */}
          {
          location.pathname === "/dashboard2" && currentUser.admin === false
            ? navigate('/')
            : <Route path="/dashboard2" element={<Dashboard2 />} />
        }


      </Routes>
      <div className="chatbot-container flex fixed bottom-0 w-20 right-0 m-2 p-4 rounded-full hover:opacity-75 cursor-pointer">
      <img onClick={()=> sendWhatsappMessage()} className="w-20" src={WhatsappIcon} alt=""/>
      </div>
      {
            location.pathname !== "/" ? <Footer /> : null
         }
    </div>
  );
}

export default App;
