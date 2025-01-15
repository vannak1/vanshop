import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api, APIError } from '../client';
import { queryKeys } from '../queryKeys';
import { Product } from '@/types/product';

export function useProduct(
  id: string,
  options?: UseQueryOptions<Product, APIError>
) {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => api.fetchProduct(id),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}