import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { estilos } from "@/styles/styles";

const SECCIONES = [
    { clave: "inicio", ruta: "/", icono: "⌂", iconoActivo: "⌂", etiqueta: "Inicio" },
    { clave: "favoritos", ruta: "/favoritos", icono: "♡", iconoActivo: "♥", etiqueta: "Favoritos" },
    { clave: "carrito", ruta: "/carrito", icono: "🛒", iconoActivo: "🛒", etiqueta: "Carrito" },
];

export default function BarraInferior({ activa }) {
    const router = useRouter();
    
    return (
    <View style={estilos.barraInferior}>
        {SECCIONES.map((s) => {
            const esActiva = s.clave === activa;
            const estiloTexto = esActiva ? estilos.textoBarraActivo : estilos.textoBarra;
            return (
            <Pressable key={s.clave} style={estilos.elementoBarra} onPress={() => !esActiva && router.replace(s.ruta)}>
                <Text style={estiloTexto}>{esActiva ? s.iconoActivo : s.icono}</Text>
                <Text style={estiloTexto}>{s.etiqueta}</Text>
            </Pressable>
            );
        })}
    </View>
    );
}