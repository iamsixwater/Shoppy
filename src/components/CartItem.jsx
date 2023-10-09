import React from 'react';
import useCart from '../hooks/useCart';
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci';
import { BiSolidTrashAlt } from 'react-icons/bi';

const ICON_CLASS = 'mx-2 hover:text-brand transition-all cursor-pointer';

export default function CartItem({
  product,
  product: { id, title, price, quantity, image, option },
}) {
  const { updateCart, removeItem } = useCart();

  const handleMinus = () => {
    if (quantity < 2) return;
    updateCart.mutate({ ...product, quantity: quantity - 1 });
  };
  const handlePlus = () =>
    updateCart.mutate({ ...product, quantity: quantity + 1 });
  const handleDelete = () => removeItem.mutate(id);

  return (
    <li className='flex justify-between items-center my-2'>
      <img className='w-24 md:w-48 rounded-lg' src={image} alt={title} />
      <div className='flex justify-between flex-1 ml-4'>
        <div className='basis-3/5'>
          <p className='text-lg'>{title}</p>
          <p className='text-xl font-bold text-brand'>{option}</p>
          <p>${price}</p>
        </div>
        <div className='flex items-center text-2xl'>
          <CiSquareMinus className={ICON_CLASS} onClick={handleMinus} />
          <span>{quantity}</span>
          <CiSquarePlus className={ICON_CLASS} onClick={handlePlus} />
          <BiSolidTrashAlt className={ICON_CLASS} onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}
