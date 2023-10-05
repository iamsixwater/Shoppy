import React, { useState } from 'react';
import Button from '../components/ui/Button';
import upload from '../api/uploader';
import { addProduct } from '../api/firebase';

export default function AddProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    upload(file)
      .then((url) => {
        addProduct(product, url).then(() => {
          setIsSucceed(true);
          setTimeout(() => {
            setIsSucceed(false);
          }, 4000);
        });
      })
      .finally(() => setIsUploading(false));
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  return (
    <section className='w-full text-center'>
      <h1 className='text-2xl font-bold py-4'>Add new product</h1>
      {isSucceed && <p className='pb-2'>✅ Upload completed!</p>}
      {file && (
        <img
          className='w-96 mx-auto mb-4'
          src={URL.createObjectURL(file)}
          alt='preview image'
        />
      )}
      <form className='flex flex-col px-16' onSubmit={handleSubmit}>
        <input
          type='file'
          name='file'
          accept='image/*'
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='title'
          value={product.title ?? ''}
          placeholder='Title'
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='cost'
          value={product.cost ?? ''}
          placeholder='Cost'
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='category'
          value={product.category ?? ''}
          placeholder='Category'
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='description'
          value={product.description ?? ''}
          placeholder='Description'
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='options'
          value={product.options ?? ''}
          placeholder='Options(separate with comma)'
          onChange={handleChange}
          required
        />
        <Button
          text={isUploading ? 'Uploading...' : 'Register'}
          disabled={isUploading}
        />
      </form>
    </section>
  );
}
