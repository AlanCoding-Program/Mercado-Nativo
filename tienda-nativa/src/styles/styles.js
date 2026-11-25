// Un mismo archivo para todo el diseño de la pagina asi no se mezcla con lo demas
import { StyleSheet } from "react-native";
export const colores = {
  primario: "#2878D0",
  primarioOscuro: "#17569E",
  secundario: "#17365D",
  fondo: "#F5F7FB",
  blanco: "#FFFFFF",
  texto: "#263445",
  textoSecundario: "#7B8798",
  borde: "#E3E9F1",
  favorito: "#E84A70",
  favoritoFondo: "#FFF0F4",
  verde: "#249B68",
  rojo: "#DC4545",
  grisClaro: "#EDF1F6",
};

export const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
  },

  contenido: {
    flex: 1,
    paddingHorizontal: 18,
  },

  contenidoScroll: {
    paddingBottom: 30,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: colores.secundario,
  },

  subtitulo: {
    fontSize: 14,
    color: colores.textoSecundario,
    marginTop: 5,
  },

  texto: {
    fontSize: 14,
    color: colores.texto,
  },

  textoSecundario: {
    fontSize: 13,
    color: colores.textoSecundario,
  },

  encabezado: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: colores.blanco,
  },

  encabezadoInfo: {
    flex: 1,
  },

  nombreTienda: {
    fontSize: 23,
    fontWeight: "bold",
    color: colores.secundario,
  },

  descripcionTienda: {
    fontSize: 12,
    color: colores.textoSecundario,
    marginTop: 4,
  },

  botonIcono: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#E8F2FD",
    alignItems: "center",
    justifyContent: "center",
  },

  icono: {
    fontSize: 22,
  },

  contador: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colores.primario,
    alignItems: "center",
    justifyContent: "center",
  },

  contadorTexto: {
    color: colores.blanco,
    fontSize: 11,
    fontWeight: "bold",
  },

  buscadorContenedor: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colores.blanco,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colores.borde,
    paddingHorizontal: 14,
    height: 48,
    marginTop: 18,
    marginBottom: 18,
  },

  buscadorIcono: {
    fontSize: 18,
    marginRight: 10,
  },

  buscador: {
    flex: 1,
    fontSize: 14,
    color: colores.texto,
  },

  seccionCategorias: {
    marginBottom: 20,
  },

  tituloSeccion: {
    fontSize: 18,
    fontWeight: "bold",
    color: colores.secundario,
    marginBottom: 12,
  },

  listaCategorias: {
    flexDirection: "row",
    alignItems: "center",
  },

  categoria: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colores.blanco,
    borderWidth: 1,
    borderColor: colores.borde,
    marginRight: 9,
  },

  categoriaActiva: {
    backgroundColor: colores.primario,
    borderColor: colores.primario,
  },

  categoriaTexto: {
    fontSize: 13,
    color: colores.textoSecundario,
    fontWeight: "500",
  },

  categoriaTextoActiva: {
    color: colores.blanco,
    fontWeight: "bold",
  },

  catalogo: {
    paddingBottom: 25,
    paddingHorizontal: 12
  },

  filaProductos: {
    justifyContent: "space-between",
  },

  tarjeta: {
    flex: 1,
    backgroundColor: colores.blanco,
    borderRadius: 16,
    padding: 11,
    marginBottom: 14,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.07,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    maxWidth: "50%"
  },

  imagenProducto: {
    width: "100%",
    height: 130,
    borderRadius: 12,
    backgroundColor: colores.grisClaro,
  },

  informacionProducto: {
    paddingVertical: 10,
  },

  categoriaProducto: {
    color: colores.primario,
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  nombreProducto: {
    fontSize: 14,
    fontWeight: "bold",
    color: colores.secundario,
    marginTop: 5,
  },

  descripcionProducto: {
    fontSize: 11,
    color: colores.textoSecundario,
    marginTop: 5,
  },

  precioProducto: {
    fontSize: 18,
    fontWeight: "bold",
    color: colores.primario,
    marginTop: 9,
  },

  botonAgregar: {
    backgroundColor: colores.primario,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  textoBotonAgregar: {
    color: colores.blanco,
    fontSize: 12,
    fontWeight: "bold",
  },

  botonFavorito: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colores.blanco,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  encabezadoFavoritos: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },

  iconoFavorito: {
    color: colores.favorito,
    fontSize: 22,
  },

  imagenDetalle: {
    width: "100%",
    height: 300,
    borderRadius: 18,
    backgroundColor: colores.grisClaro,
  },

  detalleContenido: {
    padding: 20,
  },

  detalleNombre: {
    fontSize: 25,
    fontWeight: "bold",
    color: colores.secundario,
    marginTop: 12,
  },

  detallePrecio: {
    fontSize: 26,
    fontWeight: "bold",
    color: colores.primario,
    marginTop: 12,
  },

  detalleDescripcion: {
    fontSize: 15,
    lineHeight: 23,
    color: colores.textoSecundario,
    marginTop: 14,
  },

  detalleCategoria: {
    fontSize: 13,
    color: colores.primario,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  boton: {
    backgroundColor: colores.primario,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  botonSecundario: {
    backgroundColor: colores.grisClaro,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  botonDeshabilitado: {
    opacity: 0.5,
  },

  textoBoton: {
    color: colores.blanco,
    fontSize: 15,
    fontWeight: "bold",
  },

  textoBotonSecundario: {
    color: colores.secundario,
    fontSize: 15,
    fontWeight: "bold",
  },

  itemCarrito: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colores.blanco,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },

  imagenCarrito: {
    width: 85,
    height: 85,
    borderRadius: 10,
    backgroundColor: colores.grisClaro,
  },

  informacionCarrito: {
    flex: 1,
    marginLeft: 12,
  },

  nombreCarrito: {
    fontSize: 15,
    fontWeight: "bold",
    color: colores.secundario,
  },

  precioCarrito: {
    fontSize: 16,
    fontWeight: "bold",
    color: colores.primario,
    marginTop: 6,
  },

  controlesCantidad: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  botonCantidad: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: colores.grisClaro,
    alignItems: "center",
    justifyContent: "center",
  },

  cantidadTexto: {
    marginHorizontal: 12,
    fontWeight: "bold",
    color: colores.secundario,
  },

  resumenCompra: {
    backgroundColor: colores.blanco,
    padding: 18,
    borderRadius: 15,
    marginTop: 15,
  },

  totalCompra: {
    fontSize: 22,
    fontWeight: "bold",
    color: colores.primario,
  },

  formulario: {
    backgroundColor: colores.blanco,
    padding: 18,
    borderRadius: 15,
    marginTop: 15,
  },

  etiqueta: {
    fontSize: 14,
    fontWeight: "bold",
    color: colores.secundario,
    marginBottom: 7,
  },

  campoTexto: {
    height: 48,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 10,
    paddingHorizontal: 13,
    color: colores.texto,
    backgroundColor: colores.blanco,
    marginBottom: 15,
  },

  campoMultilinea: {
    height: 90,
    textAlignVertical: "top",
    paddingTop: 12,
  },

  estadoVacio: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  estadoVacioIcono: {
    fontSize: 55,
    marginBottom: 15,
  },

  estadoVacioTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: colores.secundario,
    textAlign: "center",
  },

  estadoVacioTexto: {
    fontSize: 14,
    color: colores.textoSecundario,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 21,
  },

  carga: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  mensajeError: {
    color: colores.rojo,
    fontSize: 14,
    textAlign: "center",
    marginVertical: 15,
  },

  barraInferior: {
    flexDirection: "row",
    backgroundColor: colores.blanco,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    paddingVertical: 10,
    justifyContent: "space-around",
  },

  elementoBarra: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  textoBarra: {
    fontSize: 11,
    color: colores.textoSecundario,
    marginTop: 4,
  },

  textoBarraActivo: {
    color: colores.primario,
    fontWeight: "bold",
    fontSize: 11,
    marginTop: 4
  },

  confirmacion: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },

  confirmacionIcono: {
    fontSize: 65,
    color: colores.verde,
    marginBottom: 15,
  },

  confirmacionTitulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: colores.secundario,
    textAlign: "center",
  },

  numeroOrden: {
    fontSize: 17,
    color: colores.primario,
    fontWeight: "bold",
    marginTop: 12,
  },
  
  pantallaPrincipal: {
    flex: 1,
    backgroundColor: "#F5F7FB",
},

  iconoFavoritoActivo: {
    color: "#E84A70",
},

  iconoFavoritoInactivo: {
    color: "#7B8798",
},

  encabezadoDetalle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
},
  tituloEncabezado: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#263445",
},
  contenidoDetalle: {
    paddingBottom: 30,
},

});