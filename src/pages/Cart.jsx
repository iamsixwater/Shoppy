import React from 'react';
import useCart from '../hooks/useCart';
import { FaPlus, FaEquals } from 'react-icons/fa';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import Button from '../components/ui/Button';

const SHIPPING_FEE = 5;

export default function Cart() {
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

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
      {!hasProduct && (
        <p className='my-4 text-center'>There's no item in the cart😢.</p>
      )}
      {hasProduct && (
        <>
          <ul className='border-b border-gray-300 mb-6 py-4 px-8'>
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </ul>
          <div className='flex items-center justify-between px-2 md:px-8 lg:px-16 mb-6'>
            <PriceCard text='Products Price' price={totalPrice || 0} />
            <FaPlus className='shrink-0' />
            <PriceCard text='Shipping Fee' price={SHIPPING_FEE} />
            <FaEquals className='shrink-0' />
            <PriceCard
              text='Total Price'
              price={totalPrice + SHIPPING_FEE || 0}
            />
          </div>
          <Button text='Order' />
        </>
      )}
    </section>
  );
}
