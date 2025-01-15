import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api, APIError } from '../client';
import { queryKeys } from '../queryKeys';
import { Products } from '@/types/product';

export function useProducts(options?: UseQueryOptions<Products, APIError>) {
  return useQuery({
    queryKey: queryKeys.products(),
    queryFn: () => api.fetchProducts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
}