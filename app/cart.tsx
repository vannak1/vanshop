import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useCart } from "@/contexts/CartContext";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductRow from "@/components/ProductRow";

export default function CartScreen() {
  const { items, clearCart, updateQuantity, removeFromCart } = useCart();

  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Cart</Text>

        <FlatList
          data={items}
          keyExtractor={(item, index) => `${item.product.id}-${index}`}
          renderItem={({ item }) => (
            <ProductRow
              item={item}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Your cart is empty.</Text>
          }
        />

        {items.length > 0 && (
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              Total: ${calculateTotal().toFixed(2)}
            </Text>
          </View>
        )}

        {items.length > 0 && (
          <>
            <Link dismissTo href="/checkout" asChild>
              <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.buttonText}>Proceed to Checkout</Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
              <Text style={styles.buttonText}>Clear Cart</Text>
            </TouchableOpacity>
          </>
        )}

        <Link dismissTo href="/" asChild>
          <TouchableOpacity style={styles.homeButton}>
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  option: {
    color: "#666",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#009688",
    marginTop: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  removeButton: {
    marginLeft: "auto",
    padding: 8,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 16,
    marginTop: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
  checkoutButton: {
    backgroundColor: "#009688",
    padding: 14,
    borderRadius: 4,
    marginTop: 12,
    alignItems: "center",
  },
  homeButton: {
    backgroundColor: "#222",
    padding: 14,
    borderRadius: 4,
    marginTop: 12,
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#FF0000",
    padding: 14,
    borderRadius: 4,
    marginTop: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 20,
  },
});
