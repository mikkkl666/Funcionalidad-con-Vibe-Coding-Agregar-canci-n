import BarraNavegacion from '@/componentes/BarraNavegacion';
import { Tabs } from 'expo-router';
export default function LayoutPestanas() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BarraNavegacion {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="buscar" />
    </Tabs>
  );
}