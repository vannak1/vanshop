import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import type { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import VariationModal from "@/components/VariationModal"; // <--- new component

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<
    Product["variations"][number] | null
  >(null);

  const variationOptions = product.variations ?? [];

  const handlePressAddToCart = (e: any) => {
    e.stopPropagation(); // Prevent navigating to product detail
    setModalVisible(true);
  };

  const handleConfirmVariation = () => {
    if (variationOptions.length > 0 && !selectedVariation) {
      Alert.alert("Please select a variation option first.");
      return;
    }

    if(selectedVariation){
      addToCart(product, selectedVariation);
      setModalVisible(false);
      Alert.alert("Added to cart", `Added "${product.name}" to the cart.`);  
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedVariation(null); 
  };

  return (
    <>
      <Link href={`/product/${product.id}`} asChild>
        <TouchableOpacity style={styles.card}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.title} numberOfLines={2}>
                {product.name}
              </Text>
              <Text style={styles.type}>{product.type}</Text>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity style={styles.viewButton} onPress={handlePressAddToCart}>
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Link>

      <VariationModal
        visible={modalVisible}
        product={product}
        selectedVariation={selectedVariation}
        onSelect={(option) => setSelectedVariation(option)}
        onConfirm={handleConfirmVariation}
        onClose={handleCloseModal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: "#f5f5f5",
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  type: {
    fontSize: 14,
    color: "#666",
    textTransform: "capitalize",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 8,
  },
  viewButton: {
    backgroundColor: "#e60012",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
