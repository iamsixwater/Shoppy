import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import {
  getCart,
  updateCart as setCart,
  removeFromCart,
} from '../api/firebase';

export default function useCart() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery(['carts', uid || ''], () => getCart(uid), {
    enabled: !!uid,
  });

  const updateCart = useMutation(
    (product) => setCart(uid, product), //
    {
      onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
    }
  );

  const removeItem = useMutation((id) => removeFromCart(uid, id), {
    onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
  });

  return { cartQuery, updateCart, removeItem };
}
