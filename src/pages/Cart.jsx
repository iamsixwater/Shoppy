import React from 'react';
import { FaPlus, FaEquals } from 'react-icons/fa';
import { useAuthContext } from '../context/AuthContext';
import { getCart } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import Button from '../components/ui/Button';

const SHIPPING_PRICE = 5;

export default function Cart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery(['carts'], () => getCart(uid));

  if (isLoading) return <p>Loading...</p>;

  const hasProduct = products && products.length > 0;
  const totalPrice =
    hasProduct &&
    products.reduce(
      (prev, current) => prev + current.price * current.quantity,
      0
    );

  return (
    <section className='p-8 flex flex-col'>
      <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>
        My Cart
      </p>
      {!hasProduct && <p>There's no item in the cart😢.</p>}
      {hasProduct && (
        <ul className='border-b border-gray-300 mb-6 py-4 px-8'>
          {products.map((product) => (
            <CartItem key={product.id} product={product} uid={uid} />
          ))}
        </ul>
      )}
      <div className='flex items-center justify-between px-2 md:px-8 lg:px-16 mb-6'>
        <PriceCard text='Products Price' price={totalPrice} />
        <FaPlus className='shrink-0' />
        <PriceCard text='Shipping Price' price={SHIPPING_PRICE} />
        <FaEquals className='shrink-0' />
        <PriceCard text='Total Price' price={totalPrice + SHIPPING_PRICE} />
      </div>
      <Button text='Order' />
    </section>
  );
}
