import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import type { Product } from "@/types/product";

type VariationSelectorProps = {
  product: Product;
  selectedVariation: Product["variations"][number] | null;
  onSelect: (variation: Product["variations"][number]) => void;
};

export default function VariationSelector({
  product,
  selectedVariation,
  onSelect,
}: VariationSelectorProps) {
  const getVariationTitle = () => {
    switch (product.type) {
      case "clothing":
        return "Select Size";
      case "video games":
        return "Select Format";
      case "console":
        return "Select Condition";
      case "physical items":
        return "Select Option";
      default:
        return "Select Option";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getVariationTitle()}</Text>
      <View style={styles.optionsContainer}>
        {product.variations.map((variation) => (
          <TouchableOpacity
            key={variation}
            style={[
              styles.option,
              selectedVariation === variation && styles.selectedOption,
            ]}
            onPress={() => onSelect(variation)}
          >
            <Text
              style={[
                styles.optionText,
                selectedVariation === variation && styles.selectedOptionText,
              ]}
            >
              {variation}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  selectedOptionButton: {
    backgroundColor: "#e60012",
    borderColor: "#e60012",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  selectedOptionText: {
    color: "#fff",
    fontWeight: "500",
  },

  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  selectedOption: {
    backgroundColor: "#e60012",
    borderColor: "#e60012",
  },
});
