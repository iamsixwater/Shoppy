import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlinePencil } from 'react-icons/hi';
import { login, logout, onUserStateChanged } from '../api/firebase';
import User from './User';
import Button from './ui/Button';

export default function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChanged(setUser);
  }, []);

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <HiOutlineShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>Carts</Link>
        {user && user.isAdmin && (
          <Link to='/products/add' className='text-2xl'>
            <HiOutlinePencil />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text='Login' onClick={login} />}
        {user && <Button text='Logout' onClick={logout} />}
      </nav>
    </header>
  );
}
