import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { addProduct, getProducts } from '../api/firebase';

export default function useProducts() {
  const queryClient = useQueryClient();

  const addNewProduct = useMutation(
    ({ product, url }) => addProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(['products']),
    }
  );

  const productsQuery = useQuery(['products'], getProducts);

  return { addNewProduct, productsQuery };
}
