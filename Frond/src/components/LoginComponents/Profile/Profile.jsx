import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { FaUser } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { IoBagHandleSharp } from 'react-icons/io5';
import { IoSettingsSharp } from 'react-icons/io5';
import style from './Profile.module.css';
import LogoutButton from '../Logout';
import { useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import off from '../../../assets/img/off.png';
import { useDispatch, useSelector } from 'react-redux';
import { clientes } from '../../../redux/actions';

const Online = styled.div`
  background-color: greenyellow;
  border-radius: 50%;
  padding: 4rem 0.6rem;
  width: 15px;
  height: 15px;
  position: absolute;
  left: 85.5%;
  bottom: 38%;
`;

const OnlineDrop = styled.div`
  background-color: greenyellow;
  border-radius: 50%;
  padding: 0.rem 0.6rem;
  width: 20px;
  height: 20px;
`;

const Profile = () => {
  const dispatch = useDispatch()
  useEffect(
    () => {
        dispatch(clientes());
    },[])
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, isLoading} = useAuth0();
  const ref = useRef(null);
  const usuarios = useSelector((state)=> state.Allclients);
  const currentUser = usuarios.find((usuario) => {
    if (!isLoading && user && Array.isArray(usuarios)) {
      return (
        usuario.name.toLowerCase() === user.name.toLowerCase() &&
        usuario.correo_electronico.toLowerCase() === user.email.toLowerCase()
      );
    }
    return false;
  });
  const toggleUserMenu = () => {
    setIsOpen(!isOpen);
  };

  const goCart = () => {
    navigate('/carrito/:id');
  };
  const goDash = () => {
    navigate('/dashboard2');
  };
  const goPerfil = () => {
    navigate('/perfil');
  };
  const goCompras = () => {
    navigate('/misCompras');
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isAuthenticated) {
    return <div className={style.unloguedUser}><FaUser/></div>;
  }

  return (
    isAuthenticated && (
      <div className="relative flex items-center" ref={ref}>
        <img onClick={toggleUserMenu} className={style.imgProfile} src={user && user.picture} alt={user && user.name} /> {/* Agregar comprobación para user existente */}
        {user && user.online && <Online className="absolute" />} {/* Agregar comprobación para user existente */}
        {isOpen && (
          <div className="absolute left-6 top-8 right-0 z-20 w-48 bg-white border rounded-md shadow-lg pt-3 mt-7 mr-2">
            <div className="flex items-center">
              <img className={style.drop} src={user && user.picture} alt={user && user.name} /> {/* Agregar comprobación para user existente */}
              {user && user.online && <OnlineDrop className="ml-2 z-40" />} {/* Agregar comprobación para user existente */}
            </div>
            <div onClick={goPerfil} className="mt-5 cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b-2 border-solid">
              <IoSettingsSharp className="inline-block mr-2" />
              Mi perfil
            </div>
            <div onClick={goCompras} className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b-2 border-solid">
              <IoBagHandleSharp className="inline-block mr-2" />
              Mis compras
            </div>
            <div  onClick={goCart} className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b-2 border-solid">
              <FaShoppingCart className="inline-block mr-2" />
              Mi carrito
            </div>
            {
              currentUser && currentUser.admin === true // Agregar comprobación para currentUser existente
              ?  <div onClick={goDash} className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b-2 border-solid">
              <FaUserShield className="inline-block mr-2" />
              Administrar
              </div> 
              :''
            }
            <div className='flex'>
              <img className={style.off} src={off} alt="off" />
              <LogoutButton />
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Profile;