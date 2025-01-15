import { Product, Products } from '@/types/product';
import productsData from '../data/products.json';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class APIError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'APIError';
  }
}

export const api = {
  async fetchProducts(): Promise<Products> {
    await delay(800);
    if (Math.random() < 0.1) {
      throw new APIError('Failed to fetch products', 500);
    }
    return productsData.products as Products;
  },

  async fetchProduct(id: string): Promise<Product> {
    await delay(500);
    const product = productsData.products.find(p => p.id === id);
    if (!product) {
      throw new APIError('Product not found', 404);
    }
    return product as Product;
  },

  async submitOrder(orderData: {
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
  }): Promise<{ orderId: string }> {
    await delay(1000);
    if (Math.random() < 0.1) {
      throw new APIError('Order submission failed', 500);
    }
    return {
      orderId: `ORD-${Date.now()}`
    };
  }
};
