import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import ProductCard from './ProductCard';

export default function ProductList() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(['products'], getProducts);

  return (
    <>
      {isLoading && <p>Loading....</p>}
      {error && <p>{error}</p>}
      <ul className='p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}
