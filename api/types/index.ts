export type OrderData = {
  items: Array<{
    productId: string;
    variation: string;
    quantity: number;
  }>;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    creditCard: string;
  };
};

export type OrderResponse = {
  orderId: string;
};