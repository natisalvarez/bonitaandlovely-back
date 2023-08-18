import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyCartLS, addCartLSToApi } from "../../redux/actions"
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Carrito = () => {
    const dispatch = useDispatch();

    
    
    // const { user, isAuthenticated} = useAuth0();
    const user = 1
    
    const cartLS = useSelector(state => state.localCart); //estos son los item en carrito en local/
    cartLS.forEach(item => {
        console.log("cartLS", item);
        console.log("cartLS id", item.id);
        console.log("cartLS.color", item.color);
        console.log("cartLS.amount", item.amount);
    })
    /* unificar amount de articulos start*/
    const cartUnif = (cart) => {
        const countMap = {};
        cart.forEach((item) => {
            if (item.id !== undefined && item.id !== null && item.color !== undefined && item.color !== null) {
                const itemKey = `${item.id}_${item.color}`;
                if (countMap[itemKey]) {
                    countMap[itemKey] += item.amount;
                } else {
                    countMap[itemKey] = item.amount;
                }
            }
        });
        const cartUnifRes = Object.keys(countMap).map((itemKey) => {
            const [itemId, color] = itemKey.split('_');
            return {
                objeto: cart.find((item) => item.id === itemId),
                cantidad: countMap[itemKey],
                color: color,
            };
        });
        return cartUnifRes;
    };
    /* unificar amount de articulos end*/

    const cartUnificado = cartUnif(cartLS);
    cartUnificado.forEach(item => {
        console.log("item", item);
        console.log("item id", item.objeto.id);
        console.log("item.color", item.color);
        console.log("item.cantidad", item.cantidad);
    })

    // cartUnificado.forEach(item => {
    //     const extractNumber = (input) => {
    //         const string = String(input); // Convertir la entrada a una cadena
    //         const match = string.match(/\d+/);
    //         return match ? parseInt(match[0]) : 0;
    //       };
    //     const productId =  extractNumber(item.objeto.id) 
    //     dispatch(addCartLSToApi({
    //         user: 1,
    //         productoId: 3,
    //         colorId: 1,
    //         cantidad: 1
    //       }));
    // })
    const cartApi = useSelector(state => state.apiCart);
    console.log("este es cartApi",cartApi);

    /* total costo x articulos */
    const totalProd = cartUnificado.reduce((total, item) => total + (item.objeto.precio_venta * item.cantidad), 0);

    /* total de articulos en carrito local*/
    const totalArts = cartUnificado.reduce((qty, item) => qty + (item.cantidad), 0);

    const handleEmptyCart = () => {
        dispatch(emptyCartLS());
    }

    // const goPay = () =>{
    //     const cartToPay = `/carrito-${clienteId}`
    // }

    const handleProceedToPayment = () => {


        // axios.post('http://localhost:3001/pago', productToPay)
        //     .then((res) => (window.location.href = res.data.response.body.init_point));
    };

    return (
        <>
            <div class="grid grid-cols-3 grid-rows-6 gap-5 mx-8 mt-6">
                {/* columna izquierda detallar productos en carrito */}
                {cartUnificado && cartUnificado.length > 0 ? (
                    <>
                        {cartUnificado.map((item, index) => (
                            <div key={index} className="col-span-2 grid grid-cols-6 px-6 mx-6 shadow-md rounded-lg bg-fuchsia-200">
                                <img src={item.objeto.imagenPrincipal} alt="fotoProducto" className="col-span-1 w-12 bg-white my-2 border-2 border-purple-300 justify-self-left" />

                                <div class="col-start-2 col-span-3 place-self-center grid grid-rows-2">
                                    <div className="grid-row-1 font-medium">
                                        {item.objeto.name}
                                    </div>
                                    <div className="grid-row-2 text-xs">
                                        {item.color}
                                    </div>
                                </div>

                                <div className="col-start-5 col-span-1 flex items-center justify-center font-medium ">
                                    <p class="text-xs mr-1">Cantidad: </p> {item.cantidad}
                                </div>
                                <div className="col-start-6 col-span-1 flex items-center justify-center font-medium ">
                                    <p class="text-xs mr-1">Precio: </p>{item.objeto.precio_venta * item.cantidad}
                                </div>
                            </div>
                        ))}
                        <div class="col-start-2  flex justify-end h-6">
                            <button onClick={handleEmptyCart} class="rounded-md mx-6 px-2 text-gray-400 bg-gray-200 hover:bg-gray-100 font-small">
                                Limpiar Carrito
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="col-span-2 grid grid-cols-5 px-6 mx-6 shadow-md rounded-lg bg-fuchsia-200">
                        <div className="col-start-2 col-span-3 flex items-center justify-center font-medium">
                            No hay artículos en su carrito
                        </div>
                    </div>
                )}


                {/* columna derecha, total y boton a pasarela */}
                <div class="col-start-3 row-start-1 row-end-4 px-6 mx-6 rounded-lg bg-purple-200">

                    <div class="grid grid-cols-4 grid-rows-6 m-4">
                        <h2 class="col-span-4 row-start-1 place-self-center font-medium">
                            Resumen de Compra
                        </h2>

                        <h3 class="col-start-1 col-end-3 row-start-2 place-self-start">
                            Arts. ({totalArts || 0})
                        </h3>
                        <h3 class="col-start-1 col-end-3 row-start-3 place-self-start">
                            Envio
                        </h3>

                        <h2 class="col-start-1 col-end-3 row-start-5 place-self-start font-bold">
                            Total
                        </h2>

                        <h2 class="col-start-4 row-start-2 place-self-start">
                            {totalProd || 0}
                        </h2>
                        <h2 class="row-start-3 col-start-4  place-self-start">
                            0
                        </h2>
                        <h2 class="row-start-5 col-start-4  place-self-start font-bold">
                            {totalProd || 0}
                        </h2>

                        <button class="rounded-md row-start-6 place-self-center col-span-4 p-1.5 text-white bg-[#6b086f] hover:bg-[#7c4884]">
                            Continuar compra
                        </button>

                    </div>
                </div>
                <div class="col-start-3 col-end-4 row-start-4 row-end-4 col-span-1 flex place-self-center">
                    <NavLink to="/catalogo">
                        <button class="rounded-md place-self-center p-1.5 text-white bg-[#6b086f] hover:bg-[#7c4884]"
                        >
                            Agregar articulos
                        </button>
                    </NavLink>
                </div>
            </div>
        </>
    )

};

export default Carrito;
















