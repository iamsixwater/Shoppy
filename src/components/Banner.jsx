import React from 'react';

export default function Banner() {
  return (
    <section className='h-96 bg-yellow-900 relative'>
      <div className='w-full h-full bg-cover bg-banner opacity-70' />
      <div className='absolute top-36 text-center w-full text-white drop-shadow-xl'>
        <h2 className='text-5xl font-bold'>Shop With Us</h2>
        <p className='text-md mt-2'>
          Best Experience with High Quality Clothes
        </p>
      </div>
    </section>
  );
}
