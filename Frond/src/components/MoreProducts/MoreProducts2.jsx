import React, { useEffect, useState } from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useDispatch, useSelector } from "react-redux";
import { products } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

/* Install pure-react-carousel using -> npm i pure-react-carousel */

const MoreProductsCardContainer2 = () => {
  const dispatch = useDispatch()
  const stateProducts = useSelector(state => state.Allproducts);
  const numberSize = 20;
  
  useEffect(() => {
    const fetchData = () => {
      const queries = {
        page: 0,
        size: numberSize
      };
      dispatch(products(queries));
    };
    fetchData();
  }, [dispatch, numberSize]);

  const navigate = useNavigate()
  const goCatalog = () => {
    navigate('/catalogo')
  }

  const navigateProductDetail = (id) => {
    navigate(`/detail/${id}`)
  }

  // Asegúrate de que stateProducts.productos esté definido antes de intentar ordenarlo y mapearlo
  const sortedAndMappedProducts = stateProducts.productos
    ? stateProducts.productos.sort((a, b) => b.precio_venta - a.precio_venta).map((product, index) => (
        <Slide index={index} key={index}>
          <div
            className="flex flex-shrink-0 relative w-full sm:w-auto"
            onMouseOver={(e) => e.currentTarget.querySelector('.overlay').classList.remove('opacity-0')}
            onMouseOut={(e) => e.currentTarget.querySelector('.overlay').classList.add('opacity-0')}
            onClick={() => navigateProductDetail(product.id)}
          >
            <img
              src={product.imagenPrincipal}
              alt={product.name}
              className="object-cover object-center w-[800px] h-[190px]"
            />
            <div className="overlay bg-gray-900 bg-opacity-50 text-white absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-300">
              <div className="p-6">
                <h2 className="lg:text-xl leading-4 text-base lg:leading-5 capitalize">{product.name}</h2>
                <br />
                <h2 className="lg:text-xl leading-4 text-base lg:leading-5 capitalize">${product.precio_venta}</h2>
              </div>
            </div>
          </div>
        </Slide>
      ))
    : [];

  return (
    <div className="container w-full">
      <h2 onClick={goCatalog} className="bg-customColor m-2 font-semibold inline-block text-white ml-10 py-1 px-4 items-center gap-2"> Más productos </h2>
      <div className="flex items-center justify-center w-full h-full py-24 sm:py-8 px-">
        {/* Carousel for desktop and large size devices */}
        <CarouselProvider className="lg:block hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={12} visibleSlides={4} step={1} infinite={true}>
          <div className="w-full relative flex items-center justify-center">
            <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
              <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </ButtonBack>
            <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
              <Slider>
                <div id="slider" className="h-full flex lg:gap-2 md:gap-3 gap-14 items-center justify-start transition ease-out duration-700">
                  {sortedAndMappedProducts}
                </div>
              </Slider>
            </div>
            <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
              <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </ButtonNext>
          </div>
        </CarouselProvider>
      </div>
    </div>
  );
}

export default MoreProductsCardContainer2;
