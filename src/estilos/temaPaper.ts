import { MD3DarkTheme } from 'react-native-paper';
import { colores } from './colores';

// tema de rnp, ajustado a la paleta ya definida en colores.ts
export const temaPaper = {
  ...MD3DarkTheme,
  roundness: 16,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colores.acento,
    onPrimary: colores.textoSobreAcento,
    background: colores.fondo,
    surface: colores.fondoTarjeta,
    onSurface: colores.texto,
    onSurfaceVariant: colores.textoSecundario,
    outline: colores.borde,
  },
};