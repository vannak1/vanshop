import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useCart } from "@/contexts/CartContext";
import { useLocalSearchParams, Link, router } from "expo-router";
import { useProduct } from "@/api/hooks";
import type { Product } from "@/types/product";
import VariationSelector from "@/components/VariationSelector";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { addToCart } = useCart();
  const [selectedVariation, setSelectedVariation] = useState<
    Product["variations"][number] | null
  >(null);

  const { data: product, isLoading, error } = useProduct(String(id));

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e60012" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load product</Text>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.errorButton}>
            <Text style={styles.errorButtonText}>Return to Products</Text>
          </TouchableOpacity>
        </Link>
      </View>
    );
  }

  const handleAddToCart = () => {
    if (!selectedVariation) {
      const variationType = product.type === "clothing" ? "size" : "option";
      Alert.alert("Required", `Please select a ${variationType} first`);
      return;
    }

    addToCart(product, selectedVariation);
    router.push("/cart");
  };

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{product.name}</Text>
        </View>

        <Text style={styles.details}>{product.details}</Text>

        <VariationSelector
          product={product}
          selectedVariation={selectedVariation}
          onSelect={setSelectedVariation}
        />

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  content: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 300,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e60012",
  },
  details: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
    marginBottom: 24,
  },
  actions: {
    gap: 12,
    marginTop: 24,
  },
  addToCartButton: {
    backgroundColor: "#e60012",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  backButton: {
    backgroundColor: "#666",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  errorButton: {
    backgroundColor: "#e60012",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  errorButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});