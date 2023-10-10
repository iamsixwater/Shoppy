import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import {
  addProduct,
  getProducts,
  removeProduct as deleteProduct,
} from '../api/firebase';

export default function useProducts() {
  const queryClient = useQueryClient();

  const addNewProduct = useMutation(
    ({ product, url }) => addProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(['products']),
    }
  );

  const removeProduct = useMutation(
    (product) => deleteProduct(product), //
    {
      onSuccess: () => queryClient.invalidateQueries(['products']),
    }
  );

  const productsQuery = useQuery(['products'], getProducts);

  return { addNewProduct, removeProduct, productsQuery };
}
