import { colores } from '@/estilos/colores';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';

type Props = {
  titulo: string;
  artista: string;
  color: string;
  alPresionar: () => void;
};

// tarjeta de cancion, usa card de rnp
export default function TarjetaCancion({ titulo, artista, color, alPresionar }: Props) {
  return (
    <Card style={estilos.tarjeta} mode="contained" onPress={alPresionar}>
      <View style={[estilos.imagen, { backgroundColor: color }]} />
      <Card.Content style={estilos.contenido}>
        <Text style={estilos.titulo} numberOfLines={1}>{titulo}</Text>
        <Text style={estilos.artista} numberOfLines={1}>{artista}</Text>
      </Card.Content>
    </Card>
  );
}

const estilos = StyleSheet.create({
  tarjeta: { marginRight: 14, width: 140, backgroundColor: 'transparent' },
  imagen: { width: 140, height: 140, borderRadius: 16 },
  contenido: { paddingHorizontal: 0, paddingTop: 8, paddingBottom: 0 },
  titulo: { color: colores.texto, fontSize: 13, fontWeight: '600' },
  artista: { color: colores.textoSecundario, fontSize: 12, marginTop: 2 },
});