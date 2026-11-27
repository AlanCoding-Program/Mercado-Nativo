
import { useState } from "react";
import {View,Text,TextInput,ScrollView,Alert,ActivityIndicator,StyleSheet,Pressable,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Header from "@/components/Header";
import Boton from "@/components/Boton";
import { useCarrito } from "@/context/CarritoContext";
import { realizarCheckout } from "@/services/api";
import { colores, estilos } from "@/styles/styles";

export default function PantallaCheckout() {
    const router = useRouter();
    const { carrito, total, vaciarCarrito } = useCarrito();
    
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [direccion, setDireccion] = useState("");
    const [metodoPago, setMetodoPago] = useState("Efectivo");
    const [procesando, setProcesando] = useState(false);
    
    const confirmarCompra = async () => {
        if (!nombre.trim() || !email.trim() || !direccion.trim()) {
            Alert.alert("Datos incompletos", "Completá todos los campos.");
            return;
        }
        
        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!formatoEmail.test(email.trim())) {
            Alert.alert("Email inválido", "Ingresá un correo electrónico válido.");
            return;
        }
        
        setProcesando(true);
        
        try {
            const datosCompra = {
                comprador: {
                    nombre: nombre.trim(),
                    email: email.trim(),
                    direccion: direccion.trim(),
                },
                productos: carrito.map((item) => ({
                    id: item.id,
                    cantidad: item.cantidad,
                })),
                metodoPago,
            };
            
            const resultado = await realizarCheckout(datosCompra);
            
            vaciarCarrito();
            
            Alert.alert(
                "¡Compra realizada!",
                `Tu pedido fue registrado correctamente.\nNúmero de orden: ${resultado.numeroOrden}`, 
                [{text: "Aceptar", onPress: () => router.replace("/"),},]
            );
        
        } catch (error) {
            Alert.alert("Error", error.message || "No se pudo procesar la compra.");
        } finally {
            setProcesando(false);
        }
    };
    
    if (carrito.length === 0) {
        return (
        <SafeAreaView style={estilos.contenedor}>
            <Header />
            <View style={local.contenido}>
                <Text style={estilos.titulo}>No hay productos para comprar</Text>
                <Boton titulo="Volver al carrito" onPress={() => router.replace("/carrito")} />
            </View>
        </SafeAreaView>
        );
    }
    
    return (
    <SafeAreaView style={estilos.contenedor}>
        <Header />
        <ScrollView contentContainerStyle={local.contenido}>
            <Text style={estilos.titulo}>Finalizar compra</Text>
            <Text style={estilos.subtitulo}>Completá tus datos para registrar el pedido.</Text>
            <Text style={local.tituloSeccion}>Datos del comprador</Text>

            <Text style={local.etiqueta}>Nombre completo</Text>
            <TextInput style={local.input} placeholder="Tu nombre" value={nombre} onChangeText={setNombre}/>
            
            <Text style={local.etiqueta}>Correo electrónico</Text>
            <TextInput style={local.input} placeholder="ejemplo@correo.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
            
            <Text style={local.etiqueta}>Dirección de entrega</Text>
            <TextInput style={local.input} placeholder="Calle, número y localidad" value={direccion} onChangeText={setDireccion}/>
            
            <Text style={local.tituloSeccion}>Método de pago</Text>
            
            {["Efectivo", "Transferencia"].map((metodo) => (
                <Pressable key={metodo} style={local.opcionPago} onPress={() => setMetodoPago(metodo)}>
                    <Text style={local.textoOpcion}>
                        {metodoPago === metodo ? "🔘" : "⚪"} {metodo}
                    </Text>
                </Pressable>
            ))}
        
        <Text style={local.tituloSeccion}>Resumen del pedido</Text>

        {carrito.map((item) => (
            <View key={item.id} style={local.filaProducto}>
                <Text style={local.nombreProducto}>{item.nombre} x {item.cantidad}</Text>
                <Text style={local.precio}>${(item.precio * item.cantidad).toLocaleString("es-AR")}</Text>
            </View>
        ))}

        <View style={local.filaTotal}>
            <Text style={local.textoTotal}>Total</Text>
            <Text style={local.textoTotal}>${total.toLocaleString("es-AR")}</Text>
        </View>

        <Boton titulo={procesando ? "Procesando..." : "Confirmar compra"} onPress={confirmarCompra} disabled={procesando}/>

        {procesando && (
            <ActivityIndicator size="large" color={colores.primario} style={{ marginTop: 15 }}/>
        )}

        <View style={{ height: 25 }} />
        </ScrollView>
    </SafeAreaView>
    );
}

const local = StyleSheet.create({
    contenido: {
        padding: 20,
        paddingBottom: 35,
    },
    tituloSeccion: {
        fontSize: 18,
        fontWeight: "bold",
        color: colores.secundario,
        marginTop: 25,
        marginBottom: 12,
    },
    etiqueta: {
        fontSize: 14,
        fontWeight: "600",
        color: colores.texto,
        marginBottom: 7,
    },
    input: {
        backgroundColor: colores.blanco,
        borderWidth: 1,
        borderColor: colores.borde,
        borderRadius: 10,
        padding: 13,
        fontSize: 15,
        marginBottom: 15,
        color: colores.texto,
    },
    opcionPago: {
        backgroundColor: colores.blanco,
        padding: 15,
        borderRadius: 10,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: colores.borde,
    },
    textoOpcion: {
        color: colores.texto,
        fontSize: 15,
    },
    filaProducto: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    nombreProducto: {
        flex: 1,
        color: colores.texto,
        marginRight: 10,
    },
    precio: {
        fontWeight: "600",
        color: colores.texto,
    },
    filaTotal: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderColor: colores.borde,
        paddingTop: 15,
        marginTop: 8,
        marginBottom: 25,
    },
    textoTotal: {
        fontSize: 19,
        fontWeight: "bold",
        color: colores.secundario,
    }
});
