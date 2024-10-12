import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import products from '../products.json'; // Import the products.json file
import colors from '../colors';

type Product = {
  product_id: string;
  product_name: string;
  product_image: string;
};

const { width } = Dimensions.get('window'); // Get the device's screen width
const ITEM_SIZE = width / 2 - 20; // Calculate the size for each item (with some padding)

export default function MainPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products); // State for filtered products

  // Function to handle search input changes
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.product_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity 
        style={styles.productItem} 
        onPress={() => router.push({
          pathname: `/details/${item.product_id}`, 
          params: { product_name: item.product_name, product_image: item.product_image }
        })}
      >
        <Image source={{ uri: item.product_image }} style={styles.productImage} />
        <Text style={styles.productText}>{item.product_name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for products..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {/* <Text style={styles.title}>Select the things you need</Text> */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.product_id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.secondary,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  productItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
  },
  productImage: {
    width: (ITEM_SIZE - 20) * 0.85,
    height: (ITEM_SIZE - 20) * 0.85,
    borderRadius: 10,
    marginBottom: 10,
  },
  productText: {
    fontSize: 18,
    textAlign: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  listContent: {
    paddingBottom: 20,
  },
});
