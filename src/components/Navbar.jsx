import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlinePencil } from 'react-icons/hi';
import { login } from '../api/firebase';

export default function Header() {
  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <HiOutlineShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>Carts</Link>
        <Link to='/products/add' className='text-2xl'>
          <HiOutlinePencil />
        </Link>
        <button onClick={login}>Login</button>
      </nav>
    </header>
  );
}
