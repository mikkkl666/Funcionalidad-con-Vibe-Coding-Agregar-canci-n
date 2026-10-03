import { colores } from '@/estilos/colores';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RutaTab = 'index' | 'buscar' | 'biblioteca';
type Props = {
  state: { index: number; routes: { name: string }[] };
  navegarTab: (nombre: RutaTab) => void;
};

const rutasDeTabs: RutaTab[] = ['index', 'buscar', 'biblioteca'];

const botones = [
  { nombre: 'index', icono: 'home' as const, etiqueta: 'Home' },
  { nombre: 'buscar', icono: 'search' as const, etiqueta: 'Search' },
  { nombre: 'agregar', icono: 'add-circle-outline' as const, etiqueta: '' },
  { nombre: 'biblioteca', icono: 'library-outline' as const, etiqueta: 'Library' },
  { nombre: 'perfil', icono: 'person-outline' as const, etiqueta: '' },
];

// tab bar personalizada, estilo pildora flotante como en la referencia
export default function BarraNavegacion({ state, navegarTab }: Props) {
  const router = useRouter();
  const rutaActiva = state.routes[state.index]?.name;

  // el perfil abre ajustes como modal y el boton de agregar sigue decorativo
  function alPresionarBoton(nombre: string) {
    if (nombre === 'index' || nombre === 'buscar' || nombre === 'biblioteca') {
      navegarTab(nombre);
    } else if (nombre === 'perfil') {
      router.push('/ajustes');
    }
  }

  return (
    <View style={estilos.contenedor}>
      {botones.map((boton) => {
        const activo = boton.nombre === rutaActiva;
        const esFuncional = rutasDeTabs.includes(boton.nombre as RutaTab) || boton.nombre === 'perfil';

        return (
          <TouchableOpacity
            key={boton.nombre}
            style={[estilos.boton, activo && estilos.botonActivo]}
            disabled={!esFuncional}
            onPress={() => alPresionarBoton(boton.nombre)}
          >
            <Ionicons
              name={boton.icono}
              size={20}
              color={activo ? colores.textoSobreAcento : colores.textoSecundario}
            />
            {activo && <Text style={estilos.etiqueta}>{boton.etiqueta}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    backgroundColor: colores.fondoTarjeta,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  boton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
    gap: 6,
  },
  botonActivo: { backgroundColor: colores.acento },
  etiqueta: { color: colores.textoSobreAcento, fontWeight: '700', fontSize: 13 },
});