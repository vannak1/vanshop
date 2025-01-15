import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

export default function OrderConfirmationScreen() {
  const { orderId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Confirmed!</Text>
      <Text style={styles.message}>
        Your order #{orderId} has been placed successfully.
      </Text>

      <Link dismissTo href="/" asChild>
        <TouchableOpacity style={styles.homeButton}>
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 32,
  },
  homeButton: {
    backgroundColor: "#007BFF",
    padding: 14,
    borderRadius: 4,
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
