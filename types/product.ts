interface BaseProduct {
  id: string;
  name: string;
  image: string;
  details: string;
  price: number;
}

interface VideoGameProduct extends BaseProduct {
  type: "video games";
  variations: Array<"Digital" | "New" | "Pre-Owned">;
}

interface ClothingProduct extends BaseProduct {
  type: "clothing";
  variations: Array<"Small" | "Medium" | "Large">;
}

interface ConsoleProduct extends BaseProduct {
  type: "console";
  variations: Array<"New" | "Pre-Owned" | "Refurbished">;
}

interface PhysicalItemProduct extends BaseProduct {
  type: "physical items";
  variations: Array<"New">;
}

export type Product =
  | VideoGameProduct
  | ClothingProduct
  | ConsoleProduct
  | PhysicalItemProduct;

export type Products = Product[];

export type CartItem = {
  product: Product;
  variation: Product["variations"][number];
  quantity: number;
};

// Helper type guard functions
export const isVideoGame = (product: Product): product is VideoGameProduct =>
  product.type === "video games";

export const isClothing = (product: Product): product is ClothingProduct =>
  product.type === "clothing";

export const isConsole = (product: Product): product is ConsoleProduct =>
  product.type === "console";

export const isPhysicalItem = (
  product: Product
): product is PhysicalItemProduct => product.type === "physical items";

// Helper function to get valid variations based on product type
export const getValidVariations = (product: Product): string[] => {
  switch (product.type) {
    case "video games":
      return ["Digital", "New", "Pre-Owned"];
    case "clothing":
      return ["Small", "Medium", "Large"];
    case "console":
      return ["New", "Pre-Owned", "Refurbished"];
    case "physical items":
      return ["New"];
    default:
      return [];
  }
};
