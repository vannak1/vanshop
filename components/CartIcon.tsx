import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCart } from "@/contexts/CartContext";

export function CartIcon() {
  const { items } = useCart();
  const cartCount = items.length;

  return (
    <Link href="/cart" asChild>
      <Pressable style={{ marginRight: 15 }}>
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.5 : 1 }}>
            <FontAwesome name="shopping-cart" size={25} color="black" />
            {cartCount > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </View>
        )}
      </Pressable>
    </Link>
  );
}


const styles = StyleSheet.create({
    badgeContainer: {
      position: "absolute",
      right: -4,
      top: -4,
      minWidth: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: "#e60012",
      justifyContent: "center",
      alignItems: "center",
    },
    badgeText: {
      color: "#fff",
      fontSize: 10,
      fontWeight: "bold",
      paddingHorizontal: 4,
    },
  });