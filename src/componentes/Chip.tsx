import { colores } from '@/estilos/colores';
import { PropsChip } from '@/tipos/tipos';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

//chip usado en filtros de categoria
export default function Chip({ texto, activo, alPresionar }: PropsChip) {
  return (
    <TouchableOpacity
      style={[estilos.chip, activo && estilos.chipActivo]}
      onPress={alPresionar}
    >
      <Text style={[estilos.texto, activo && estilos.textoActivo]}>{texto}</Text>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: colores.fondoTarjeta,
    marginRight: 8,
  },
  chipActivo: { backgroundColor: colores.acento },
  texto: { color: colores.textoSecundario, fontSize: 13, fontWeight: '600' },
  textoActivo: { color: colores.textoSobreAcento },
});