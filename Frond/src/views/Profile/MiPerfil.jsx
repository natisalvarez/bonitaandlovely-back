import React from 'react';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux'
import axios from 'axios'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Miperfil = () => {
  const { user, isLoading } = useAuth0();
  const [showPassword, setShowPassword] = useState(false);
  const [buttonSwitch, setButtonSwitch] = useState(false);
  const [userInfo, setUserInfo] = useState({
    // Comentar las siguientes líneas si no utilizas Redux
    // nombre: userInforDatabase.nombre,
    // apellido: userInforDatabase.apellido,
    // correoElectronico: userInforDatabase.email,
    // numeroTelefono: userInforDatabase.numero,
    // ciudad: userInforDatabase.ciudad,
    // provincia: userInforDatabase.provincia,
    // codigoPostal: userInforDatabase.codigoPostal,
    // contraseña: userInforDatabase.contraseña
  });
  const SeeIcon = showPassword ? FaEye : FaEye;
  const SeeSlashIcon = showPassword ? FaEye : FaEyeSlash;

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  console.log(userInfo)

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setUserInfo({
      ...userInfo,
      [name]: value
    });
  }

  const handleSubmit = () => {
    axios.put() // Agregar aquí la petición PUT para actualizar los datos de usuario en la base de datos
    console.log(userInfo); // Solo para demostración
  }

  return (
    <div className="h-screen flex max-w-full">
      {/* Columna izquierda */}
      <div className="w-1/3 flex-shrink-0">
        <div className="p-5 h-full">
          <div className="flex mt-5 flex-col items-center justify-center space-y-4">
            <img
              style={{ width: '270px', height: '270px' }}
              className="rounded-full object-cover ml-10 mr-10 border-solid border-4 border-gray-200"
              src={!isLoading ? user.picture : 'Loading...'}
              alt="Profile"
            />
            <h1 className="text-4xl font-bold mb-2 text-gray-600">
              {!isLoading ? user.name : 'Loading...'}
            </h1>
            <p className="text-gray-400 text-lg mb-5">
              {!isLoading ? user.email : 'Loading...'}
            </p>
            {!buttonSwitch ? (
              <button
                className="bg-purple-600 text-white px-3 flex items-center justify-center py-2 rounded-md  w-56 mb-10"
                onClick={() => setButtonSwitch(true)}
              >
                Editar perfil
              </button>
            ) : (
              <>
                <button
                  className="bg-green-500 text-white px-3 flex items-center justify-center py-2 rounded-md hover:bg-green-600 w-56 mb-10"
                  onClick={() => {
                    setButtonSwitch(false);
                    handleSubmit();
                  }}
                >
                  Guardar cambios
                </button>
                <button
                  className="bg-gray-500 text-white px-3 flex items-center justify-center py-2 rounded-md w-56 mb-10"
                  onClick={() => setButtonSwitch(false)}
                >
                  Cancelar
                </button>
              </>
            )}

          </div>
        </div>
      </div>

      {/* Columna derecha */}
      <div className="w-2/3 m-5 flex-shrink-0">
      <h1 className=" flex ml-20 text-4xl font-bold mb-2 text-gray-600">Mi Perfil</h1>
        <div className="pt-5 pb-10 px-20 flex flex-col items-center  bg-white rounded-lg shadow-lg h-full">
          <div className="w-full flex justify-between">
            {/* Columna izquierda de la derecha */}
            <div className="w-5/12">
              <dl className="form-group">
                <label htmlFor="nombre" className="font-bold text-gray-600 mb-1">
                  Nombre
                </label>
                <input
                  className="form-control bg-gray-100 border border-gray-300 rounded-md p-2 w-full mb-2"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  name="nombre"
                  value={userInfo.nombre}
                  onChange={handleChange}
                  disabled={!buttonSwitch}
                />
              </dl>

              <dl className="form-group mt-5">
                <dt>
                  <label htmlFor="correoElectronico" className="font-bold text-gray-600 mb-1">
                    Correo electrónico
                  </label>
                </dt>
                <dd className="d-inline-block">
                  <input
                    className="form-control bg-gray-100 border border-gray-300 rounded-md p-2 w-full mb-2"
                    type="text"
                    placeholder="Ingresa tu correo electrónico"
                    name="correoElectronico"
                    value={userInfo.correoElectronico}
                    onChange={handleChange}
                    disabled={!buttonSwitch}
                  />
                </dd>
              </dl>

              <dl className="form-group mt-5">
                <dt>
                  <label htmlFor="numeroTelefono" className="font-bold text-gray-600 mb-1">
                    Número telefónico
                  </label>
                </dt>
                <dd className="d-inline-block">
                  <input
                    className="form-control bg-gray-100 border border-gray-300 rounded-md p-2 w-full mb-2"
                    type="text"
                    placeholder="Ingresa tu número telefónico"
                    name="numeroTelefono"
                    value={userInfo.numeroTelefono}
                    onChange={handleChange}
                    disabled={!buttonSwitch}
                  />
                </dd>
              </dl>

              <dl className="form-group mt-5">
                <dt>
                  <label htmlFor="contraseña" className="font-bold text-gray-600 mb-1">
                    Contraseña
                  </label>
                </dt>
                <dd className="d-inline-block">
                  <div className="relative">
                    <input
                      className="form-control bg-gray-100 border border-gray-300 rounded-md p-2 w-full mb-2"
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingresa tu contraseña"
                      name="contraseña"
                      value={userInfo.contraseña}
                      onChange={handleChange}
                      disabled={!buttonSwitch}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={handleToggleShowPassword}>
                      {showPassword ? <SeeIcon className="text-gray-400" /> : <SeeSlashIcon className="text-gray-400" />}
                    </div>
                  </div>
                </dd>
              </dl>
            </div>

            {/* Columna derecha de la derecha */}
            <div className="w-7/12 ml-10">
              <dl className="form-group">
                <label htmlFor="apellido" className="font-bold text-gray-600 mb-1">
                  Apellido
                </label>
                <input
                  className="form-control bg-gray-100 border border-gray-300 rounded-md p-2 w-full mb-2"
                  type="text"
                  placeholder="Ingresa tu apellido"
                  name="apellido"
                  value={userInfo.apellido}
                  onChange={handleChange}
                  disabled={!buttonSwitch}
                />
              </dl>

              <dl className="form-group mt-5">
                <dt>
                  <label htmlFor="ciudad" className="font-bold text-gray-600 mb-1">
                    Ciudad
                  </label>
                </dt>
                <dd className="d-inline-block">
                  <input
                    className="form-control bg-gray-100 border border-gray-300 rounded-md p-2 w-full mb-2"
                    type="text"
                    placeholder="Ingresa tu ciudad"
                    name="ciudad"
                    value={userInfo.ciudad}
                    onChange={handleChange}
                    disabled={!buttonSwitch}
                  />
                </dd>
              </dl>

              <dl className="form-group mt-5">
                <dt>
                  <label htmlFor="provincia" className="font-bold text-gray-600 mb-1">
                    Provincia
                  </label>
                </dt>
                <dd className="d-inline-block">
                  <input
                    className="form-control bg-gray-100 border border-gray-300 rounded-md p-2 w-full mb-2"
                    type="text"
                    placeholder="Ingresa tu provincia"
                    name="provincia"
                    value={userInfo.provincia}
                    onChange={handleChange}
                    disabled={!buttonSwitch}
                  />
                </dd>
              </dl>

              <dl className="form-group mt-5">
                <dt>
                  <label htmlFor="codigoPostal" className="font-bold text-gray-600 mb-1">
                    Código postal
                  </label>
                </dt>
                <dd className="d-inline-block">
                  <input
                    className="form-control bg-gray-100 border border-gray-300 rounded-md p-2 w-full mb-2"
                    type="text"
                    placeholder="Ingresa tu código postal"
                    name="codigoPostal"
                    value={userInfo.codigoPostal}
                    onChange={handleChange}
                    disabled={!buttonSwitch}
                  />
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Miperfil;