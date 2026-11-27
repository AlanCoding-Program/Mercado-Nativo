
import { useState } from "react";
import {View,Text,FlatList,TextInput,Alert,ActivityIndicator,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Header from "@/components/Header";
import Boton from "@/components/Boton";
import EstadoVacio from "@/components/EstadoVacio";
import ItemCarrito from "@/components/ItemCarrito";
import BarraInferior from "@/components/BarraInferior";

import { useCarrito } from "@/context/CarritoContext";
import { realizarCheckout } from "@/services/api";
import { estilos } from "@/styles/styles";

export default function PantallaCarrito() {
  const router = useRouter();

  const {carrito,cambiarCantidad,eliminarDelCarrito,vaciarCarrito,total,} = useCarrito();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");

  const [procesando, setProcesando] = useState(false);
  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const [numeroOrden, setNumeroOrden] = useState(null);

  const confirmarCompra = async () => {
    if (procesando) return;

    if (!carrito.length) {
      Alert.alert("Carrito vacío", "Agregá productos antes de comprar.");
      return;
    }

    if (!nombre.trim() || !email.trim() || !direccion.trim()) {
      Alert.alert(
        "Datos incompletos",
        "Completá tu nombre, email y dirección."
      );
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!emailValido) {
      Alert.alert("Email inválido", "Ingresá una dirección de email válida.");
      return;
    }

    // Datos que recibirá nuestro backend.
    const datosCompra = {
      comprador: {
        nombre: nombre.trim(),
        email: email.trim().toLowerCase(),
        direccion: direccion.trim(),
      },
      productos: carrito.map((item) => ({
        productoId: item.id,
        cantidad: item.cantidad,
      })),
      metodoPago: "simulado",
    };

    try {
      setProcesando(true);

      const resultado = await realizarCheckout(datosCompra);

      if (!resultado?.numeroOrden) {
        throw new Error("El servidor no devolvió el número de orden.");
      }

      setNumeroOrden(resultado.numeroOrden);
      vaciarCarrito();
      setCompraFinalizada(true);
    } catch (error) {
      Alert.alert(
        "No se pudo completar la compra", error.message || "Intentá nuevamente."
      );
    } finally {
      setProcesando(false);
    }
  };

  // Confirmación de compra.
  if (compraFinalizada) {
    return (
      <SafeAreaView style={estilos.contenedor}>
        <View style={estilos.confirmacion}>
          <Text style={estilos.confirmacionIcono}>✓</Text>

          <Text style={estilos.confirmacionTitulo}>
            ¡Compra realizada!
          </Text>

          <Text style={estilos.textoSecundario}>
            Gracias por comprar en Mercado Nativo.
          </Text>

          <Text style={estilos.numeroOrden}>
            Orden N.º {numeroOrden}
          </Text>

          <View style={{ marginTop: 25, width: "100%" }}>
            <Boton titulo="Volver al catálogo" onPress={() => router.replace("/")}/>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilos.contenedor}>
      <Header />

      <FlatList
        data={carrito}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={estilos.catalogo}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={[estilos.titulo, { marginBottom: 12 }]}> Mi carrito </Text>}
        renderItem={({ item }) => (
          <ItemCarrito item={item} onCambiarCantidad={cambiarCantidad} onEliminar={eliminarDelCarrito}/>
        )}
        ListEmptyComponent={
          <EstadoVacio
            icono="🛒"
            titulo="Tu carrito está vacío"
            texto="Agregá productos para verlos acá."
            textoBoton="Explorar productos"
            onPressBoton={() => router.replace("/")}
          />
        }
        ListFooterComponent={
          carrito.length > 0 ? (
            <View>
              {/* Resumen de la compra */}
              <View style={estilos.resumenCompra}>
                <Text style={estilos.textoSecundario}>
                  Total de la compra
                </Text>

                <Text style={estilos.totalCompra}>
                  ${total.toLocaleString("es-AR")}
                </Text>

                <View style={{ marginTop: 15 }}>
                  <Boton titulo="Vaciar carrito" onPress={vaciarCarrito} secundario/>
                </View>
              </View>

              <View style={estilos.formulario}>
                <Text style={[estilos.titulo, { marginBottom: 18 }]}>
                  Datos del comprador
                </Text>

                <Text style={estilos.etiqueta}>Nombre completo</Text>

                <TextInput
                  style={estilos.campoTexto}
                  placeholder="Ingresá tu nombre"
                  value={nombre}
                  onChangeText={setNombre}
                  autoCapitalize="words"
                  editable={!procesando}
                />

                <Text style={estilos.etiqueta}>Correo electrónico</Text>

                <TextInput
                  style={estilos.campoTexto}
                  placeholder="ejemplo@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!procesando}
                />

                <Text style={estilos.etiqueta}>Dirección de entrega</Text>

                <TextInput
                  style={estilos.campoTexto}
                  placeholder="Calle, número y localidad"
                  value={direccion}
                  onChangeText={setDireccion}
                  editable={!procesando}
                />

                <Text style={estilos.etiqueta}>Método de pago</Text>

                <Text style={[estilos.textoSecundario, { marginBottom: 18 }]}>
                  Pago simulado. No se solicitarán datos bancarios.
                </Text>

                <Boton
                  titulo={procesando ? "Procesando compra..." : "Confirmar compra"}
                  onPress={confirmarCompra}
                  disabled={procesando}
                />

                {procesando && (
                  <View style={{ marginTop: 18 }}>
                    <ActivityIndicator size="large" color="#2878D0" />
                  </View>
                )}
              </View>
            </View>
          ) : null
        }
      />

      <BarraInferior activa="carrito" />
    </SafeAreaView>
  );
}
