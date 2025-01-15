import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/api/hooks";
import { Product, Products } from "@/types/product";

export default function ProductListScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Products>([]);

  const {
    data: products,
    isLoading,
    error,
  } = useProducts();

  useEffect(() => {
    if (products) {
      const filtered = products.filter((p: Product) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [products, searchQuery]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Failed to load products. Please try again.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: "#fff" 
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
    borderRadius: 4,
  },
  cartButton: {
    backgroundColor: "#ff9900",
    padding: 14,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 12,
  },
  cartButtonText: { 
    color: "#fff", 
    fontWeight: "bold" 
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
