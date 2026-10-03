import { cancionesPopulares } from '@/datos/canciones';
import { colores } from '@/estilos/colores';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Appbar, Menu, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Reproductor() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [cargando, setCargando] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [favorito, setFavorito] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    const temporizador = setTimeout(() => setCargando(false), 400);
    return () => clearTimeout(temporizador);
  }, [id]);

  const cancion = cancionesPopulares.find((c) => c.id === id) ?? cancionesPopulares[0];

  // alterna favorito y muestra confirmacion
  function alternarFavorito() {
    setFavorito((actual) => !actual);
    setSnackbarVisible(true);
  }

  if (cargando) {
    return (
      <SafeAreaView style={estilos.contenedorCarga}>
        <ActivityIndicator animating size="large" color={colores.acento} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilos.contenedor} edges={['top', 'bottom']}>
      {/* encabezado con appbar de react native paper */}
      <Appbar.Header style={estilos.appbar} elevated={false}>
        <Appbar.Action icon="chevron-down" color={colores.texto} onPress={() => router.back()} />
        <Appbar.Content
          title="PLAYING FROM"
          titleStyle={estilos.textoChico}
          subtitle={cancion.categoria}
          subtitleStyle={estilos.textoMediano}
        />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action icon="dots-vertical" color={colores.texto} onPress={() => setMenuVisible(true)} />
          }
        >
          <Menu.Item onPress={() => setMenuVisible(false)} title="Compartir" leadingIcon="share-variant" />
          <Menu.Item onPress={() => setMenuVisible(false)} title="Agregar a lista" leadingIcon="playlist-plus" />
          <Menu.Item onPress={() => setMenuVisible(false)} title="Reportar" leadingIcon="flag-outline" />
        </Menu>
      </Appbar.Header>

      <View style={estilos.contenedorCaratula}>
        <View style={[estilos.caratula, { backgroundColor: cancion.color }]} />
      </View>

      <View style={estilos.filaTitulo}>
        <View style={{ flex: 1 }}>
          <Text style={estilos.titulo} numberOfLines={1}>{cancion.titulo}</Text>
          <Text style={estilos.artista} numberOfLines={1}>{cancion.artista}</Text>
        </View>
        <TouchableOpacity onPress={alternarFavorito}>
          <Ionicons
            name={favorito ? 'heart' : 'heart-outline'}
            size={22}
            color={favorito ? colores.acento : colores.texto}
          />
        </TouchableOpacity>
      </View>

      <View style={estilos.barraProgreso}>
        <View style={estilos.progresoActual} />
      </View>

      <View style={estilos.controles}>
        <Ionicons name="shuffle" size={22} color={colores.textoSecundario} />
        <Ionicons name="play-skip-back" size={28} color={colores.texto} />
        <TouchableOpacity style={estilos.botonPlay}>
          <Ionicons name="play" size={28} color={colores.textoSobreAcento} />
        </TouchableOpacity>
        <Ionicons name="play-skip-forward" size={28} color={colores.texto} />
        <Ionicons name="repeat" size={22} color={colores.textoSecundario} />
      </View>

      <TouchableOpacity style={estilos.botonLyrics}>
        <Text style={estilos.textoLyrics}>LYRICS</Text>
        <Ionicons name="chevron-down" size={16} color={colores.textoSecundario} />
      </TouchableOpacity>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={1800}
        style={estilos.snackbar}
      >
        {favorito ? 'Agregado a favoritos' : 'Quitado de favoritos'}
      </Snackbar>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  contenedorCarga: { flex: 1, backgroundColor: colores.fondo, alignItems: 'center', justifyContent: 'center' },
  contenedor: { flex: 1, backgroundColor: colores.fondo, paddingHorizontal: 24 },
  appbar: { backgroundColor: 'transparent', marginTop: -8, marginHorizontal: -24 },
  textoChico: { color: colores.textoSecundario, fontSize: 11 },
  textoMediano: { color: colores.texto, fontSize: 13, fontWeight: '600' },
  contenedorCaratula: { flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 16 },
  caratula: { width: '85%', aspectRatio: 1, maxHeight: '100%', borderRadius: 16 },
  filaTitulo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titulo: { color: colores.texto, fontSize: 22, fontWeight: 'bold' },
  artista: { color: colores.textoSecundario, fontSize: 14, marginTop: 2 },
  barraProgreso: { height: 3, backgroundColor: colores.borde, borderRadius: 2, marginTop: 20 },
  progresoActual: { width: '35%', height: 3, backgroundColor: colores.acento, borderRadius: 2 },
  controles: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28 },
  botonPlay: { width: 60, height: 60, borderRadius: 30, backgroundColor: colores.acento, alignItems: 'center', justifyContent: 'center' },
  botonLyrics: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 24, marginBottom: 12, gap: 6 },
  textoLyrics: { color: colores.textoSecundario, fontSize: 12, fontWeight: '600' },
  snackbar: { backgroundColor: colores.fondoTarjeta },
});