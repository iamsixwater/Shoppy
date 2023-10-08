import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({
  product,
  product: { id, image, title, price, category },
}) {
  const navigate = useNavigate();
  return (
    <li
      className='rounded-md shadow-md p-2 cursor-pointer overflow-hidden hover:scale-105 transition-all'
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } });
      }}
    >
      <img className='w-full' src={image} alt={title} />
      <div className='px-2 mt-2 text-lg flex justify-between items-center'>
        <h3 className='font-bold truncate'>{title}</h3>
        <p>{`$${price}`}</p>
      </div>
      <p className='px-2 text-gray-500'>{category}</p>
    </li>
  );
}
