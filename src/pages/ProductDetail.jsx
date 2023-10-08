import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function ProductDetail() {
  const {
    state: {
      product: { id, category, title, description, image, price, options },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  const handleClick = () => {};

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
          <Button text='Add to cart' onClick={handleClick} />
        </section>
      </section>
    </>
  );
}
