import React, { useState } from "react";
import StarRatings from 'react-star-ratings';
import axios from 'axios';

export default function EditReviewModal({ reviewId, initialRating, initialComentario }) {
    const [showModal, setShowModal] = useState(false);
    const [newRating, setNewRating] = useState(initialRating);
    const [newComentario, setNewComentario] = useState(initialComentario);

    const onChangeRating = (rating) => {
        setNewRating(rating);
    }

    const handleComentarioChange = (event) => {
        setNewComentario(event.target.value);
    }

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/reviewr/${reviewId}`, {
                rating: newRating,
                comentario: newComentario
            });
            console.log(response.data);

            setShowModal(false);
        } catch (error) {
            console.error('Error al editar la reseña:', error.message);
        }
    }

    return (
        <>
            <button
                className="bg-gray-400 hover:bg-gray-500 text-gray-900 font-semibold py-2 px-4 rounded-md"
                onClick={() => setShowModal(true)}
            >
                Editar reseña
            </button>
            {showModal ? (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-5">
                            <h2 className="text-2xl font-semibold">
                                Editar reseña
                            </h2>
                            <StarRatings
                                rating={newRating}
                                starHoverColor="orange"
                                starEmptyColor="gray"
                                starRatedColor="orange"
                                changeRating={onChangeRating}
                                numberOfStars={5}
                                starDimension="30px"
                                name='rating'
                            />
                            <textarea
                                value={newComentario}
                                onChange={handleComentarioChange}
                                cols="30"
                                rows="10"
                                className="resize-none h-24 border-solid border-2 border-slate-500 rounded"
                            ></textarea>
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={handleSaveChanges}
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
