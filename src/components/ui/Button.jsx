import React from 'react';

export default function Button({ text, onClick }) {
  return (
    <button
      className='bg-brand px-4 py-2 rounded-md text-white'
      onClick={onClick}
    >
      {text}
    </button>
  );
}
