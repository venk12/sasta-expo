import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useCart } from './../CartContext';
import colors from '../colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome

export default function CartScreen() {
  const { cartItems, removeFromCart } = useCart();

  // Function to calculate and display savings
  const calculateSavings = () => {
    const totalSavings = cartItems.reduce((acc, item) => {
      const savingsPerItem = item.quantity * 5; // Example calculation: $5 savings per item
      return acc + savingsPerItem;
    }, 0);

    // Create JSON representation of product_id and quantity
    const cartDetails = cartItems.map(item => ({
      product_id: item.productId,
      quantity: item.quantity,
    }));

    // Display the alert with the JSON details and total savings
    Alert.alert('Total Savings', `You saved $${totalSavings}!\n\nCart Details:\n${JSON.stringify(cartDetails, null, 2)}`);
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.text}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.text}>
                Product: {item.product_name}, Quantity: {item.quantity}
              </Text>
              <TouchableOpacity onPress={() => removeFromCart(item.productId)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      
      {/* Styled Calculate Button */}
      <TouchableOpacity style={styles.calculateButton} onPress={calculateSavings}>
        <FontAwesome name="money" size={20} color="#fff" style={styles.calculateButtonIcon} />
        <Text style={styles.calculateButtonText}>calculate savings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.tertiary,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
  },
  removeButton: {
    backgroundColor: colors.red,
    padding: 5,
    borderRadius: 3,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  calculateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.button_color,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    justifyContent: 'center',
  },
  calculateButtonIcon: {
    marginRight: 8,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 18,
    textTransform: 'lowercase',
  },
});
