import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import useCart from '../hooks/useCart';
import Button from '../components/ui/Button';
import useProducts from '../hooks/useProducts';

export default function ProductDetail() {
  const { user } = useAuthContext();
  const [isSucceed, setIsSucceed] = useState(false);
  const [deleteSucceed, setDeleteSucceed] = useState(false);
  const {
    state: {
      product,
      product: { id, category, title, description, image, price, options },
    },
  } = useLocation();
  const { updateCart } = useCart();
  const { removeProduct } = useProducts();

  const [selected, setSelected] = useState(options && options[0]);
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  const handleAddToCart = () => {
    const product = { id, title, image, price, quantity: 1, option: selected };
    updateCart.mutate(product, {
      onSuccess: () => {
        setIsSucceed(true);
        setTimeout(() => setIsSucceed(false), 4000);
      },
    });
  };
  const handleDelete = () => {
    removeProduct.mutate(product, {
      onSuccess: () => {
        setDeleteSucceed(true);
        setTimeout(() => setDeleteSucceed(false), 4000);
      },
    });
  };

  return (
    <>
      <p className='text-gray-600 mx-12 mt-4'>{category}</p>
      <section className='flex flex-col md:flex-row p-4'>
        <img className='x-full basis-7/12 px-4' src={image} alt={title} />
        <section className='w-full flex flex-col basis-5/12 p-4'>
          <h1 className='text-3xl font-bold py-2'>{title}</h1>
          <p className='text-xl font-bold pb-2 text-gray-500 border-b border-gray-400'>
            ${price}
          </p>
          <p className='text-lg py-4'>{description}</p>
          <div className='flex items-center'>
            <label className='text-brand' htmlFor='select'>
              Options:
            </label>
            <select
              className='outline-none border-2 border-dashed border-brand m-4 p-2 flex-1'
              id='select'
              onChange={handleChange}
              value={selected}
            >
              {options &&
                options.map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <Button text='Add to cart' onClick={handleAddToCart} />
            {user && user.isAdmin && (
              <Button text='Delete' onClick={handleDelete} />
            )}
          </div>
          {isSucceed && (
            <p className='pt-2'>✅ Successfully added to a cart!</p>
          )}
          {deleteSucceed && (
            <p className='pt-2'>✅ Successfully deleted from products!</p>
          )}
        </section>
      </section>
    </>
  );
}
