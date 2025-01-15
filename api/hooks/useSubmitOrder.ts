import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api, APIError } from '../client';
import type { OrderData, OrderResponse } from '../types';

export function useSubmitOrder(
  options?: UseMutationOptions<OrderResponse, APIError, OrderData>
) {
  return useMutation({
    mutationFn: (data: OrderData) => api.submitOrder(data),
    ...options,
  });
}