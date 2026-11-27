import { Stack } from "expo-router";
import { CarritoProvider } from "../context/CarritoContext";
import { FavoritosProvider } from "../context/FavoritosContext";

export default function RootLayout() {
  return (
    <CarritoProvider>
      <FavoritosProvider>
        <Stack screenOptions={{headerShown: false,}}>
          <Stack.Screen name="index" />
          <Stack.Screen name="favoritos" />
          <Stack.Screen name="carrito" />
          <Stack.Screen name="detalle/[id]" />
          <Stack.Screen name="checkout" />
        </Stack>
      </FavoritosProvider>
    </CarritoProvider>
  );
}