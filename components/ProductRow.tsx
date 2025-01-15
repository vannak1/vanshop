import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CartItem as CartItemType, Product } from "@/types/product";

const ProductRow = ({
  item,
  updateQuantity,
  removeFromCart,
}: {
  item: CartItemType;
  removeFromCart?: (productId: string, variation: Product["variations"][number]) => void;
  updateQuantity?: (productId: string, variation: Product["variations"][number], quantity: number) => void;
}) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.product.image }}
        style={styles.itemImage}
        resizeMode="cover"
      />

      <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.product.name}</Text>
        {!!item.variation && (
          <Text style={styles.option}>Option: {item.variation}</Text>
        )}

        <View style={styles.quantityContainer}>
          {updateQuantity && (
            <>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() =>
                  updateQuantity(
                    item.product.id,
                    item.variation,
                    Math.max(0, item.quantity - 1)
                  )
                }
              >
                <FontAwesome name="minus" size={16} color="#666" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() =>
                  updateQuantity(item.product.id, item.variation, item.quantity + 1)
                }
              >
                <FontAwesome name="plus" size={16} color="#666" />
              </TouchableOpacity>
            </>
          )}
          {removeFromCart && (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(item.product.id, item.variation)}
            >
              <FontAwesome name="trash" size={18} color="#FF0000" />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.price}>
          ${(item.product.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default ProductRow;

const styles = StyleSheet.create({
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
});
