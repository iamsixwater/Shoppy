import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import useCart from '../hooks/useCart';

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCart();

  return (
    <div className='relative'>
      <AiOutlineShoppingCart className='text-4xl' />
      {products && (
        <p className='absolute w-6 h-6 text-white bg-brand rounded-full text-center font-bold -top-1 -right-1'>
          {products.length}
        </p>
      )}
    </div>
  );
}
