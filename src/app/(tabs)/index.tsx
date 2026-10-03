import Chip from '@/componentes/Chip';
import TarjetaCancion from '@/componentes/TarjetaCancion';
import { cancionesPopulares, categorias } from '@/datos/canciones';
import { colores } from '@/estilos/colores';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Dialog, FAB, Portal, Snackbar } from 'react-native-paper';

export default function Inicio() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [dialogoVisible, setDialogoVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const router = useRouter();

  const cancionesFiltradas =
    categoriaActiva === 'Todas'
      ? cancionesPopulares
      : cancionesPopulares.filter((c) => c.categoria === categoriaActiva);

  function confirmarAgregado() {
    setDialogoVisible(false);
    setSnackbarVisible(true);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={estilos.contenedor} contentContainerStyle={estilos.contenido}>
        <Text style={estilos.saludo}>Hola Daniel</Text>
        <Text style={estilos.titulo}>Selecciona una categoria</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={estilos.filaChips}>
          {categorias.map((c) => (
            <Chip key={c} texto={c} activo={categoriaActiva === c} alPresionar={() => setCategoriaActiva(c)} />
          ))}
        </ScrollView>

        <Text style={estilos.subtitulo}>Canciones Populares</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cancionesFiltradas.map((cancion) => (
            <TarjetaCancion
              key={cancion.id}
              titulo={cancion.titulo}
              artista={cancion.artista}
              color={cancion.color}
              alPresionar={() => router.push({ pathname: '/reproductor', params: { id: cancion.id } })}
            />
          ))}
        </ScrollView>
      </ScrollView>

      {/* fab flotante para agregar una cancion a favoritos*/}
      <FAB
        icon="plus"
        style={estilos.fab}
        color={colores.textoSobreAcento}
        customSize={56}
        onPress={() => setDialogoVisible(true)}
      />

      <Portal>
        <Dialog visible={dialogoVisible} onDismiss={() => setDialogoVisible(false)} style={estilos.dialogo}>
          <Dialog.Title style={estilos.tituloDialogo}>Agregar a favoritos</Dialog.Title>
          <Dialog.Content>
            <Text style={estilos.textoDialogo}>Se agregara la primera cancion de la lista a tus favoritos</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button textColor={colores.textoSecundario} onPress={() => setDialogoVisible(false)}>Cancelar</Button>
            <Button textColor={colores.acento} onPress={confirmarAgregado}>Agregar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={1800} style={estilos.snackbar}>
        Cancion agregada a favoritos
      </Snackbar>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo },
  contenido: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 140 },
  saludo: { color: colores.texto, fontSize: 20, fontWeight: '600' },
  titulo: { color: colores.texto, fontSize: 24, fontWeight: 'bold', marginTop: 16, marginBottom: 12 },
  filaChips: { marginBottom: 8 },
  subtitulo: { color: colores.texto, fontSize: 16, fontWeight: '600', marginTop: 24, marginBottom: 12 },
  fab: { position: 'absolute', right: 20, bottom: 110, backgroundColor: colores.acento },
  dialogo: { backgroundColor: colores.fondoTarjeta },
  tituloDialogo: { color: colores.texto },
  textoDialogo: { color: colores.textoSecundario },
  snackbar: { backgroundColor: colores.fondoTarjeta },
});