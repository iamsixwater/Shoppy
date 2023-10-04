import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlinePencil } from 'react-icons/hi';
import { login, logout, onUserStateChanged } from '../api/firebase';

export default function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const handleLogin = () => {
    login().then(setUser);
  };
  const handleLogout = () => {
    logout().then(setUser);
  };

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
        {!user && <button onClick={handleLogin}>Login</button>}
        {user && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}
