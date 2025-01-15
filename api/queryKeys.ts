export const queryKeys = {
  all: ["gamestop"] as const,
  products: () => [...queryKeys.all, "products"] as const,
  product: (id: string) => [...queryKeys.products(), id] as const,
  orders: () => [...queryKeys.all, "orders"] as const,
  order: (id: string) => [...queryKeys.orders(), id] as const,
};
