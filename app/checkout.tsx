import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useCart } from "@/contexts/CartContext";
import { useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { useSubmitOrder } from "@/api/hooks";
import LottieView from "lottie-react-native";
import checkMarkAnimation from "@/assets/images/check-mark.json";
import { Link, router } from "expo-router";
import type { CartItem } from "@/types/product";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductRow from "@/components/ProductRow";

type CheckoutFormValues = {
  name: string;
  phone: string;
  shippingAddress: string;
  creditCard: string;
};

export default function CheckoutScreen() {
  const { items, clearCart, getTotalAmount } = useCart();
  const [showCheckAnimation, setShowCheckAnimation] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      shippingAddress: "",
      creditCard: "",
    },
    mode: "onSubmit",
  });

  const { mutateAsync: submitOrder, isPending: isSubmitting } = useSubmitOrder({
    onSuccess: (response) => {
      clearCart();
      setShowCheckAnimation(true);
      setTimeout(() => {
        setShowCheckAnimation(false);
        router.push({
          pathname: "/order-confirmation",
          params: { orderId: response.orderId },
        });
      }, 1500);
    },
    onError: (error) => {
      Alert.alert(
        "Order Failed",
        error.message || "Something went wrong. Please try again."
      );
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    if (items.length === 0) {
      Alert.alert("Error", "Your cart is empty.");
      return;
    }

    try {
      await submitOrder({
        items: items.map((item) => ({
          productId: item.product.id,
          variation: item.variation,
          quantity: item.quantity,
        })),
        customerInfo: {
          name: data.name,
          phone: data.phone,
          address: data.shippingAddress,
          creditCard: data.creditCard,
        },
      });
    } catch (err) {
      // Error is handled by the mutation's onError callback
    }
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <ProductRow item={item} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.container}>
          <Text style={styles.heading}>Order Summary</Text>

          <FlatList
            data={items}
            keyExtractor={(item) => `${item.product.id}-${item.variation}`}
            renderItem={renderCartItem}
            ListEmptyComponent={
              <View style={styles.emptyCart}>
                <Text style={styles.emptyText}>Your cart is empty.</Text>
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={() => router.push("/")}
                >
                  <Text style={styles.buttonText}>Continue Shopping</Text>
                </TouchableOpacity>
              </View>
            }
            scrollEnabled={false} // Prevent nested scrolling
          />

          {items.length > 0 && !showCheckAnimation && (
            <View style={styles.formContainer}>
              <Text style={styles.subheading}>Shipping Information</Text>

              <FormInput
                label="Name"
                name="name"
                control={control}
                rules={{
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters long.",
                  },
                }}
                placeholder="John Doe"
              />

              <FormInput
                label="Phone"
                name="phone"
                control={control}
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+?[0-9]{1,4}?[-.\s]?(\(?\d{1,3}?\)?[-.\s]?){1,4}\d{1,4}$/,
                    message: "Enter a valid phone number",
                  },
                }}
                placeholder="222-555-1234"
                keyboardType="phone-pad"
              />

              <FormInput
                label="Shipping Address"
                name="shippingAddress"
                control={control}
                rules={{
                  required: "Shipping address is required",
                }}
                placeholder="123 Street, City, State"
                multiline
              />

              <Text style={styles.subheading}>Payment Information</Text>

              <FormInput
                label="Credit Card"
                name="creditCard"
                control={control}
                rules={{
                  required: "Credit card is required",
                  pattern: {
                    value: /^\d{4}-?\d{4}-?\d{4}-?\d{4}$/,
                    message: "Enter a valid 16-digit credit card number",
                  },
                }}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                keyboardType="numeric"
              />

              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalAmount}>
                  ${getTotalAmount().toFixed(2)}
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    isSubmitting && styles.submitButtonDisabled,
                  ]}
                  onPress={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <View style={styles.submitButtonContent}>
                      <ActivityIndicator color="#fff" />
                      <Text style={styles.buttonText}>Processing...</Text>
                    </View>
                  ) : (
                    <Text style={styles.buttonText}>Place Order</Text>
                  )}
                </TouchableOpacity>

                <Link dismissTo href="/" asChild>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    disabled={isSubmitting}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )}

          {showCheckAnimation && (
            <View style={styles.lottieContainer}>
              <LottieView
                source={checkMarkAnimation}
                autoPlay
                loop={false}
                style={styles.lottieAnimation}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
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
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginVertical: 20,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  itemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  variation: {
    fontSize: 14,
    color: "#666",
  },
  quantity: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e60012",
  },
  formContainer: {
    padding: 16,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e60012",
  },
  submitButton: {
    backgroundColor: "#e60012",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: "#ffb3b3",
  },
  submitButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  lottieContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  lottieAnimation: {
    width: 200,
    height: 200,
  },
  emptyCart: {
    padding: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  continueButton: {
    backgroundColor: "#e60012",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 16,
  },
  cancelButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e60012",
    backgroundColor: "transparent",
  },
  cancelButtonText: {
    color: "#e60012",
    fontWeight: "bold",
    fontSize: 16,
  },
});
