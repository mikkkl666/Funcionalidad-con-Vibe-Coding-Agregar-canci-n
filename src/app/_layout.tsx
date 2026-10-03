import { temaPaper } from '@/estilos/temaPaper';
import { ProveedorPlaylists } from '@/contexto/ProveedorPlaylists';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export default function LayoutRaiz() {
  return (
    <PaperProvider
      theme={temaPaper}
      settings={{ icon: (props) => <MaterialCommunityIcons {...props} /> }}
    >
      <ProveedorPlaylists>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="reproductor" options={{ presentation: 'modal' }} />
          <Stack.Screen name="ajustes" options={{ presentation: 'modal' }} />
          <Stack.Screen name="listas/[id]" />
        </Stack>
      </ProveedorPlaylists>
    </PaperProvider>
  );
}