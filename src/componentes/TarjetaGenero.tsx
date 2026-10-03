import { colores } from '@/estilos/colores';
import { DimensionValue, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-paper';

type Props = {
  nombre: string;
  color: string;
  ancho?: DimensionValue;
  alto?: number;
  mostrarHashtag?: boolean;
  alPresionar?: () => void;
};

// tarjeta rectangular de genero, usa card
export default function TarjetaGenero({
  nombre,
  color,
  ancho = 150,
  alto = 180,
  mostrarHashtag = false,
  alPresionar,
}: Props) {
  return (
    <Card
      style={[estilos.tarjeta, { width: ancho, height: alto, backgroundColor: color }]}
      mode="contained"
      onPress={alPresionar}
    >
      <Card.Content style={estilos.contenido}>
        <Text style={estilos.texto}>{mostrarHashtag ? `#${nombre}` : nombre}</Text>
      </Card.Content>
    </Card>
  );
}

const estilos = StyleSheet.create({
  tarjeta: { borderRadius: 16, justifyContent: 'flex-end' },
  contenido: { padding: 12 },
  texto: { color: colores.texto, fontSize: 14, fontWeight: '700' },
});