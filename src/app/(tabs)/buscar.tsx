import TarjetaGenero from '@/componentes/TarjetaGenero';
import { generosDestacados, generosYEstados } from '@/datos/generos';
import { colores } from '@/estilos/colores';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput as CampoBusqueda } from 'react-native-paper';

// pantalla de busqueda... segunda pestana
export default function Buscar() {
  const [textoBusqueda, setTextoBusqueda] = useState('');

  // filtra segun lo escrito
  const generosFiltrados = generosYEstados.filter((genero) =>
    genero.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
  );

  return (
    <ScrollView style={estilos.contenedor} contentContainerStyle={estilos.contenido}>
      <CampoBusqueda
        mode="outlined"
        placeholder="buscar"
        value={textoBusqueda}
        onChangeText={setTextoBusqueda}
        right={<CampoBusqueda.Icon icon="magnify" color={colores.texto} />}
        style={estilos.input}
        outlineStyle={estilos.inputBorde}
        textColor={colores.texto}
        placeholderTextColor={colores.textoSecundario}
        theme={{ roundness: 24 }}
      />

      <Text style={estilos.subtitulo}>Explora por genero</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={estilos.filaDestacados}
      >
        {generosDestacados.map((genero) => (
          <TarjetaGenero key={genero.id} nombre={genero.nombre} color={genero.color} mostrarHashtag />
        ))}
      </ScrollView>

      <Text style={estilos.subtitulo}>Mood & Generos</Text>

      <View style={estilos.grilla}>
        {generosFiltrados.map((genero) => (
          <TarjetaGenero key={genero.id} nombre={genero.nombre} color={genero.color} ancho="47%" alto={100} />
        ))}
      </View>

      {/* estado vacio: mensaje + boton de rnp para limpiar la busqueda*/}
      {generosFiltrados.length === 0 && (
        <View style={estilos.sinResultadosContenedor}>
          <Text style={estilos.sinResultados}>No se encontraron generos</Text>
          <Button
            mode="contained"
            buttonColor={colores.acento}
            textColor={colores.textoSobreAcento}
            onPress={() => setTextoBusqueda('')}
          >
            Limpiar busqueda
          </Button>
        </View>
      )}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colores.fondo },
  contenido: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 140 },
  input: { backgroundColor: colores.fondoTarjeta },
  inputBorde: { borderColor: colores.borde },
  subtitulo: { color: colores.texto, fontSize: 16, fontWeight: '600', marginTop: 24, marginBottom: 12 },
  filaDestacados: { gap: 12 },
  grilla: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  sinResultadosContenedor: { width: '100%', alignItems: 'center', gap: 12, marginTop: 8 },
  sinResultados: { color: colores.textoSecundario, fontSize: 14 },
});