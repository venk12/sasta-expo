import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useCart } from './../CartContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../colors';

export default function DetailsPage() {
  const { id, product_name, product_image } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Function to handle adding to the shopping cart
  const handleAddToCart = () => {
    addToCart({ productId: id as string, product_name: product_name as string, quantity });
    Alert.alert('Added to Shopping Bag', `Product ID: ${id}, Name: ${product_name}, Quantity: ${quantity}`);
  };

  return (
    <View style={styles.container}>
      {product_image && (
        <Image source={{ uri: product_image as string }} style={styles.productImage} />
      )}
      <Text style={styles.productName}>ID: {id}</Text>
      <Text style={styles.productName}>Name: {product_name}</Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Quantity:</Text>
        <Picker
          selectedValue={quantity}
          style={styles.picker}
          onValueChange={(itemValue) => setQuantity(itemValue)}
        >
          <Picker.Item label="1" value={1} />
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
          <Picker.Item label="4" value={4} />
          <Picker.Item label="5" value={5} />
        </Picker>
      </View>

      {/* Add to Shopping Bag Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Icon name="plus" size={16} color="#fff" style={styles.addButtonIcon} />
        <Text style={styles.addButtonText}>add to shopping bag</Text>
      </TouchableOpacity>

      {/* Go Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  productName: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  pickerContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    width: 150,
    height: 50,
    backgroundColor: colors.secondary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.button_color,
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    justifyContent: 'center',
  },
  addButtonIcon: {
    marginRight: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'lowercase',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#000',
    fontSize: 16,
  },
});
