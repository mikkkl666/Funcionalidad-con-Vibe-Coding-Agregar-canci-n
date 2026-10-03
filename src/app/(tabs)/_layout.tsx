import BarraNavegacion from '@/componentes/BarraNavegacion';
import { Tabs } from 'expo-router';
export default function LayoutPestanas() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => (
        <BarraNavegacion
          state={props.state}
          navegarTab={(nombre) => props.navigation.navigate(nombre)}
        />
      )}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="buscar" />
      <Tabs.Screen name="biblioteca" />
    </Tabs>
  );
}