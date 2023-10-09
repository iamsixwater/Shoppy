import React from 'react';

export default function PriceCard({ text, price }) {
  return (
    <div className='bg-gray-50 rounded-2xl p-8 mx-2 text-lg md:text-xl text-center'>
      <p>{text}</p>
      <p className='font-bold text-brand text-xl md:text-2xl'>${price}</p>
    </div>
  );
}
