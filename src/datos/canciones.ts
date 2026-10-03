import { Cancion } from '@/tipos/tipos';
// datos compartidos entre inicio y el reproductor
export const cancionesPopulares: Cancion[] = [
  { id: '1', titulo: 'Starboy Remix', artista: 'The Weeknd', color: '#c1522a', categoria: 'Internacional' },
  { id: '2', titulo: 'Superman', artista: 'Eminem', color: '#3a3a3a', categoria: 'Internacional' },
  { id: '3', titulo: 'El Rescate', artista: 'Marca Registrada', color: '#5b3fae', categoria: 'Fiesta' },
  { id: '4', titulo: 'LADY GAGA', artista: 'Peso Pluma', color: '#8c2f2f', categoria: 'Fiesta' },
  { id: '5', titulo: 'Limon Y Sal', artista: 'Julieta Venegas', color: '#2c6e91', categoria: 'Pop' },
  { id: '6', titulo: 'Visita', artista: 'Enjambre', color: '#b8860b', categoria: 'Rock Contemporaneo' },
];
export const categorias = ['Todas', 'Internacional', 'Fiesta', 'Pop', 'Rock Contemporaneo'];