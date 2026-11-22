//configura la navegación y permite que el carrito sea compartido entre todas las pantallas
import { Stack } from "expo-router";
import { CarritoProvider } from "../context/CarritoContext";

export default function RootLayout() {
  return (
    <CarritoProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#F7F8FC" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="carrito" />
        <Stack.Screen name="detalle/[id]" />
      </Stack>
    </CarritoProvider>
  );
}
