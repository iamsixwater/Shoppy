import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useAuthContext } from '../context/AuthContext';
import { getCart } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';

export default function CartStatus() {
  const { uid } = useAuthContext();
  const { data: products } = useQuery(['carts'], () => getCart(uid));

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
