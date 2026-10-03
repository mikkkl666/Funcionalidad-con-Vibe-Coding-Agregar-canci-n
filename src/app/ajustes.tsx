import { cancionesPopulares } from '@/datos/canciones';
import { colores } from '@/estilos/colores';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appbar, Checkbox, DataTable, Drawer, RadioButton, Switch } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// pantalla de ajustes, se abre como modal desde el icono de perfil
export default function Ajustes() {
  const router = useRouter();
  const [seccionActiva, setSeccionActiva] = useState('cuenta');
  const [notificaciones, setNotificaciones] = useState(true);
  const [recomendaciones, setRecomendaciones] = useState(false);
  const [calidadAudio, setCalidadAudio] = useState('media');

  return (
    <SafeAreaView style={estilos.contenedor} edges={['top', 'bottom']}>
      <Appbar.Header style={estilos.appbar} elevated={false}>
        <Appbar.Action icon="chevron-down" color={colores.texto} onPress={() => router.back()} />
        <Appbar.Content title="Ajustes" titleStyle={estilos.tituloAppbar} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={estilos.contenido}>
        {/* drawer usado como menu de secciones dentro de la pantalla */}
        <Drawer.Section title="Secciones" style={estilos.drawer}>
          <Drawer.Item
            label="Cuenta"
            icon="account-outline"
            active={seccionActiva === 'cuenta'}
            onPress={() => setSeccionActiva('cuenta')}
          />
          <Drawer.Item
            label="Reproduccion"
            icon="tune-vertical"
            active={seccionActiva === 'reproduccion'}
            onPress={() => setSeccionActiva('reproduccion')}
          />
          <Drawer.Item
            label="Historial"
            icon="history"
            active={seccionActiva === 'historial'}
            onPress={() => setSeccionActiva('historial')}
          />
        </Drawer.Section>

        {seccionActiva === 'cuenta' && (
          <View style={estilos.bloque}>
            <Text style={estilos.subtitulo}>Notificaciones</Text>
            <View style={estilos.filaOpcion}>
              <Text style={estilos.textoOpcion}>Recibir notificaciones push</Text>
              <Switch value={notificaciones} onValueChange={setNotificaciones} color={colores.acento} />
            </View>
            <View style={estilos.filaOpcion}>
              <Checkbox
                status={recomendaciones ? 'checked' : 'unchecked'}
                onPress={() => setRecomendaciones((v) => !v)}
                color={colores.acento}
              />
              <Text style={estilos.textoOpcion}>Recibir recomendaciones semanales</Text>
            </View>
          </View>
        )}

        {seccionActiva === 'reproduccion' && (
          <View style={estilos.bloque}>
            <Text style={estilos.subtitulo}>Calidad de audio</Text>
            <RadioButton.Group value={calidadAudio} onValueChange={setCalidadAudio}>
              <View style={estilos.filaOpcion}>
                <RadioButton value="baja" color={colores.acento} />
                <Text style={estilos.textoOpcion}>Baja (ahorra datos)</Text>
              </View>
              <View style={estilos.filaOpcion}>
                <RadioButton value="media" color={colores.acento} />
                <Text style={estilos.textoOpcion}>Media</Text>
              </View>
              <View style={estilos.filaOpcion}>
                <RadioButton value="alta" color={colores.acento} />
                <Text style={estilos.textoOpcion}>Alta (mejor calidad)</Text>
              </View>
            </RadioButton.Group>
          </View>
        )}

        {seccionActiva === 'historial' && (
          <View style={estilos.bloque}>
            <Text style={estilos.subtitulo}>Reproducidas recientemente</Text>
            <DataTable style={estilos.tabla}>
              <DataTable.Header>
                <DataTable.Title textStyle={estilos.textoTabla}>Cancion</DataTable.Title>
                <DataTable.Title textStyle={estilos.textoTabla}>Artista</DataTable.Title>
                <DataTable.Title textStyle={estilos.textoTabla} numeric>Genero</DataTable.Title>
              </DataTable.Header>
              {cancionesPopulares.map((cancion) => (
                <DataTable.Row key={cancion.id}>
                  <DataTable.Cell textStyle={estilos.textoTabla}>{cancion.titulo}</DataTable.Cell>
                  <DataTable.Cell textStyle={estilos.textoTabla}>{cancion.artista}</DataTable.Cell>
                  <DataTable.Cell textStyle={estilos.textoTabla} numeric>{cancion.categoria}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo },
  appbar: { backgroundColor: 'transparent' },
  tituloAppbar: { color: colores.texto },
  contenido: { paddingHorizontal: 16, paddingBottom: 40 },
  drawer: { backgroundColor: colores.fondoTarjeta, borderRadius: 16, marginBottom: 24 },
  bloque: { gap: 4 },
  subtitulo: { color: colores.texto, fontSize: 16, fontWeight: '600', marginBottom: 12 },
  filaOpcion: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  textoOpcion: { color: colores.texto, fontSize: 14, flexShrink: 1 },
  tabla: { backgroundColor: colores.fondoTarjeta, borderRadius: 16 },
  textoTabla: { color: colores.texto },
});