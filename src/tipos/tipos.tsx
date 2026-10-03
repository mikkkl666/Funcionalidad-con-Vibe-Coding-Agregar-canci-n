export type Cancion = {
  id: string;
  titulo: string;
  artista: string;
  color: string;
  categoria: string;
};

export type PropsChip = {
  texto: string;
  activo: boolean;
  alPresionar: () => void;
};