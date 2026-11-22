import { Pressable, Text, StyleSheet } from "react-native";
export default function Boton({
  titulo,
  onPress,
  disabled = false,
  color = "#208AEF",
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.boton,
        { backgroundColor: color },
        disabled && styles.deshabilitado,
      ]}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  deshabilitado: {
    opacity: 0.5,
  },
  texto: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
