import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  label: string;
  theme?: 'primary';
  quantity: number;
  product_id: string;
};

export default function Button({ label, theme, quantity, product_id }: Props) {
  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 2, borderColor: '#25292e', backgroundColor: '#25292e', borderRadius: 20 },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#25292e' }]}
          onPress={() => alert(`You ordered an item. Quantity: ${quantity}, Product ID: ${product_id}`)}>
          <FontAwesome name="shopping-cart" size={18} color="white" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: 'white' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'green',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});