import { usePlaylists } from '@/contexto/ProveedorPlaylists';
import { colores } from '@/estilos/colores';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Button, Dialog, FAB, HelperText, List, Portal, Snackbar, TextInput } from 'react-native-paper';

export default function Biblioteca() {
  const router = useRouter();
  const { playlists, cargando, error, crearPlaylist, limpiarError } = usePlaylists();
  const [dialogoVisible, setDialogoVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [intentoCrear, setIntentoCrear] = useState(false);

  function guardarNuevaPlaylist() {
    setIntentoCrear(true);
    const playlist = crearPlaylist(nombre);
    if (!playlist) {
      return;
    }

    setNombre('');
    setIntentoCrear(false);
    setDialogoVisible(false);
    router.push({ pathname: '/listas/[id]', params: { id: playlist.id } });
  }

  return (
    <View style={estilos.pantalla}>
      <ScrollView style={estilos.contenedor} contentContainerStyle={estilos.contenido}>
        <Text style={estilos.titulo}>Tu biblioteca</Text>
        <Text style={estilos.subtitulo}>Playlists</Text>

        {cargando ? (
          <ActivityIndicator animating color={colores.acento} style={estilos.cargando} />
        ) : playlists.length === 0 ? (
          <View style={estilos.vacio}>
            <List.Icon icon="playlist-music" color={colores.textoSecundario} />
            <Text style={estilos.textoVacio}>Aun no tienes playlists</Text>
            <Button mode="text" textColor={colores.acento} onPress={() => setDialogoVisible(true)}>
              Crear playlist
            </Button>
          </View>
        ) : (
          <View style={estilos.lista}>
            {playlists.map((playlist) => (
              <List.Item
                key={playlist.id}
                title={playlist.nombre}
                description={`${playlist.cancionIds.length} canciones`}
                titleStyle={estilos.nombrePlaylist}
                descriptionStyle={estilos.descripcionPlaylist}
                left={() => <List.Icon icon="playlist-music" color={colores.acento} />}
                right={() => <List.Icon icon="chevron-right" color={colores.textoSecundario} />}
                onPress={() => router.push({ pathname: '/listas/[id]', params: { id: playlist.id } })}
                style={estilos.elementoLista}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <FAB
        icon="plus"
        accessibilityLabel="Crear playlist"
        style={estilos.fab}
        color={colores.textoSobreAcento}
        onPress={() => setDialogoVisible(true)}
      />

      <Portal>
        <Dialog visible={dialogoVisible} onDismiss={() => setDialogoVisible(false)} style={estilos.dialogo}>
          <Dialog.Title style={estilos.tituloDialogo}>Nueva playlist</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label="Nombre"
              value={nombre}
              onChangeText={setNombre}
              autoFocus
              maxLength={50}
              textColor={colores.texto}
              outlineColor={colores.borde}
              activeOutlineColor={colores.acento}
            />
            <HelperText type="error" visible={intentoCrear && !nombre.trim()}>
              Escribe un nombre para continuar.
            </HelperText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button textColor={colores.textoSecundario} onPress={() => setDialogoVisible(false)}>
              Cancelar
            </Button>
            <Button textColor={colores.acento} onPress={guardarNuevaPlaylist} disabled={!nombre.trim() || cargando}>
              Crear
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar visible={Boolean(error)} onDismiss={limpiarError} duration={3000} style={estilos.snackbar}>
        {error ?? ''}
      </Snackbar>
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1 },
  contenedor: { flex: 1, backgroundColor: colores.fondo },
  contenido: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 150 },
  titulo: { color: colores.texto, fontSize: 24, fontWeight: 'bold' },
  subtitulo: { color: colores.textoSecundario, fontSize: 14, marginTop: 28, marginBottom: 12 },
  cargando: { marginTop: 40 },
  vacio: { alignItems: 'center', marginTop: 50, gap: 8 },
  textoVacio: { color: colores.textoSecundario, fontSize: 14 },
  lista: { gap: 4 },
  elementoLista: { backgroundColor: colores.fondoTarjeta, borderRadius: 12, marginBottom: 8 },
  nombrePlaylist: { color: colores.texto, fontWeight: '600' },
  descripcionPlaylist: { color: colores.textoSecundario },
  fab: { position: 'absolute', right: 20, bottom: 110, backgroundColor: colores.acento },
  dialogo: { backgroundColor: colores.fondoTarjeta },
  tituloDialogo: { color: colores.texto },
  snackbar: { backgroundColor: colores.fondoTarjeta },
});