import { usePlaylists } from '@/contexto/ProveedorPlaylists';
import TarjetaCancion from '@/componentes/TarjetaCancion';
import { cancionesPopulares } from '@/datos/canciones';
import { colores } from '@/estilos/colores';
import { Cancion } from '@/tipos/tipos';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Appbar, Button, Checkbox, Dialog, Portal, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetallePlaylist() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const playlistId = Array.isArray(id) ? id[0] : id;
  const { playlists, cargando, error, agregarCancion, limpiarError } = usePlaylists();
  const [dialogoVisible, setDialogoVisible] = useState(false);
  const [cancionesSeleccionadas, setCancionesSeleccionadas] = useState<string[]>([]);
  const [mensaje, setMensaje] = useState('');

  const playlist = playlists.find((item) => item.id === playlistId);
  const canciones: Cancion[] = playlist
    ? playlist.cancionIds.flatMap((cancionId) => {
        const cancion = cancionesPopulares.find((item) => item.id === cancionId);
        return cancion ? [cancion] : [];
      })
    : [];

  function alternarSeleccion(cancionId: string) {
    setCancionesSeleccionadas((actuales) =>
      actuales.includes(cancionId)
        ? actuales.filter((idActual) => idActual !== cancionId)
        : [...actuales, cancionId]
    );
  }

  function agregarSeleccionadas() {
    if (!playlist) {
      return;
    }

    cancionesSeleccionadas.forEach((cancionId) => agregarCancion(playlist.id, cancionId));
    setMensaje(`${cancionesSeleccionadas.length} canciones agregadas`);
    setCancionesSeleccionadas([]);
    setDialogoVisible(false);
  }

  return (
    <SafeAreaView style={estilos.pantalla} edges={['top', 'bottom']}>
      <Appbar.Header style={estilos.appbar} elevated={false}>
        <Appbar.Action icon="chevron-left" color={colores.texto} onPress={() => router.back()} />
        <Appbar.Content title={playlist?.nombre ?? 'Playlist'} titleStyle={estilos.tituloAppbar} />
        {playlist && <Appbar.Action icon="playlist-plus" color={colores.texto} onPress={() => setDialogoVisible(true)} />}
      </Appbar.Header>

      {cargando ? (
        <ActivityIndicator animating color={colores.acento} style={estilos.cargando} />
      ) : !playlist ? (
        <View style={estilos.vacio}>
          <Text style={estilos.textoVacio}>No se encontro esta playlist</Text>
          <Button textColor={colores.acento} onPress={() => router.back()}>Volver</Button>
        </View>
      ) : (
        <ScrollView contentContainerStyle={estilos.contenido}>
          <Text style={estilos.subtitulo}>{canciones.length} canciones</Text>
          {canciones.length === 0 ? (
            <View style={estilos.vacio}>
              <Text style={estilos.textoVacio}>Esta playlist aun no tiene canciones</Text>
              <Button mode="contained" buttonColor={colores.acento} textColor={colores.textoSobreAcento} onPress={() => setDialogoVisible(true)}>
                Agregar canciones
              </Button>
            </View>
          ) : (
            <View style={estilos.grilla}>
              {canciones.map((cancion) => (
                <TarjetaCancion
                  key={cancion.id}
                  titulo={cancion.titulo}
                  artista={cancion.artista}
                  color={cancion.color}
                  alPresionar={() => router.push({ pathname: '/reproductor', params: { id: cancion.id } })}
                />
              ))}
            </View>
          )}
        </ScrollView>
      )}

      <Portal>
        <Dialog visible={dialogoVisible} onDismiss={() => setDialogoVisible(false)} style={estilos.dialogo}>
          <Dialog.Title style={estilos.tituloDialogo}>Agregar canciones</Dialog.Title>
          <Dialog.ScrollArea style={estilos.areaDialogo}>
            <ScrollView>
              {cancionesPopulares.map((cancion) => {
                const yaAgregada = playlist?.cancionIds.includes(cancion.id) ?? false;
                const seleccionada = cancionesSeleccionadas.includes(cancion.id);
                return (
                  <Checkbox.Item
                    key={cancion.id}
                    label={`${cancion.titulo} · ${cancion.artista}${yaAgregada ? ' · Agregada' : ''}`}
                    status={seleccionada || yaAgregada ? 'checked' : 'unchecked'}
                    onPress={() => alternarSeleccion(cancion.id)}
                    disabled={yaAgregada}
                    labelStyle={yaAgregada ? estilos.textoDeshabilitado : estilos.textoCancion}
                    color={colores.acento}
                  />
                );
              })}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button textColor={colores.textoSecundario} onPress={() => setDialogoVisible(false)}>
              Cancelar
            </Button>
            <Button textColor={colores.acento} onPress={agregarSeleccionadas} disabled={cancionesSeleccionadas.length === 0}>
              Agregar ({cancionesSeleccionadas.length})
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar
        visible={Boolean(error) || Boolean(mensaje)}
        onDismiss={() => {
          limpiarError();
          setMensaje('');
        }}
        duration={2500}
        style={estilos.snackbar}
      >
        {error ?? mensaje}
      </Snackbar>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  appbar: { backgroundColor: colores.fondo },
  tituloAppbar: { color: colores.texto },
  cargando: { flex: 1 },
  contenido: { paddingHorizontal: 16, paddingBottom: 40 },
  subtitulo: { color: colores.textoSecundario, fontSize: 14, marginVertical: 18 },
  grilla: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between' },
  vacio: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14, padding: 24 },
  textoVacio: { color: colores.textoSecundario, fontSize: 14, textAlign: 'center' },
  dialogo: { backgroundColor: colores.fondoTarjeta },
  tituloDialogo: { color: colores.texto },
  areaDialogo: { maxHeight: 380, paddingHorizontal: 0 },
  textoCancion: { color: colores.texto },
  textoDeshabilitado: { color: colores.textoSecundario },
  snackbar: { backgroundColor: colores.fondoTarjeta },
});