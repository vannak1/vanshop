import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import VariationSelector from "@/components/VariationSelector";
import type { Product } from "@/types/product";

type VariationModalProps = {
  visible: boolean; 
  product: Product;
  selectedVariation: Product["variations"][number] | null;
  onSelect: (option: Product["variations"][number]) => void;
  onConfirm: () => void;
  onClose: () => void;
};

export default function VariationModal({
  visible,
  product,
  selectedVariation,
  onSelect,
  onConfirm,
  onClose,
}: VariationModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{product.name}</Text>
          <Text style={styles.modalSubtitle}>Please select an option:</Text>

          <VariationSelector
            product={product}
            selectedVariation={selectedVariation}
            onSelect={onSelect}
          />

          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContainer: {
    marginHorizontal: 24,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    color: "#333",
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
    color: "#666",
  },
  confirmButton: {
    backgroundColor: "#e60012",
    padding: 14,
    borderRadius: 4,
    marginTop: 12,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#999",
    padding: 14,
    borderRadius: 4,
    marginTop: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
