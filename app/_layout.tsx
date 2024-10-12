// import { Stack } from 'expo-router';

// export default function RootLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//       <Stack.Screen name="+not-found" />
//     </Stack>
//   );
// }

import React from 'react';
import { Slot } from 'expo-router';
import { CartProvider } from './CartContext'; // Import CartProvider

export default function RootLayout() {
  return (
    // Wrap the application with the CartProvider
    <CartProvider>
      <Slot />
    </CartProvider>
  );
}
