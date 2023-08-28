import React from 'react';
import { FaStar } from 'react-icons/fa';

const Reviews = () => {
  const reviews = [
    {
      date: '29/07/2023',
      rating: 5,
      text: 'Estoy muy contenta con la calidad de mi producto! Recomiendo!'
    },
    {
      date: '27/07/2023',
      rating: 5,
      text: 'El tiempo de entrega fue el acordado!'
    },
    {
      date: '19/07/2023',
      rating: 5,
      text: 'Todo excelente! Recomiendo.'
    },
    {
      date: '19/07/2023',
      rating: 5,
      text: 'Excelente atención y productos'
    },
    {
      date: '19/07/2023',
      rating: 5,
      text: 'Todo perfecto!! Voy a volver a comprar.'
    },
    {
      date: '19/07/2023',
      rating: 5,
      text: 'Recomendado al 100%!'
    }
  ];

  return (
    <div className="p-5 md:p-10 bg-gray-light">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Opiniones de nuestros clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-12">
          {reviews.map((review, index) => (
            <div key={index} className="border bg-white border-gray rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between mb-3">
                  <span className="font-bold text-gray-darker text-lg">{review.date}</span>
                  <div className="flex gap-1 items-center text-yellow-400">
                    {Array.from({length: review.rating}).map((_, index) => (
                      <FaStar size="1.25em" key={index} />
                    ))}
                  </div>
                </div>
                <p className="text-lg text-gray-darker font-medium">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;