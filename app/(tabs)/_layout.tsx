import { Tabs } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome
import colors from '../colors'; // Import the colors

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.secondary,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerShadowVisible: false,
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: colors.primary,
          height:70,
          paddingTop:10,
          paddingBottom:10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'store',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="shopping-bag" color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'shopping cart',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="shopping-cart" color={color} size={26} />
          ),
        }}
      />
    </Tabs>
  );
}
