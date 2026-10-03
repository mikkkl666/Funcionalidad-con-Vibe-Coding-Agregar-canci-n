import { cargarPlaylists, guardarPlaylists } from '@/datos/almacenamientoPlaylists';
import { cancionesPopulares } from '@/datos/canciones';
import { Playlist } from '@/tipos/tipos';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

type ContextoPlaylists = {
  playlists: Playlist[];
  cargando: boolean;
  error: string | null;
  crearPlaylist: (nombre: string) => Playlist | null;
  agregarCancion: (playlistId: string, cancionId: string) => boolean;
  limpiarError: () => void;
};

const ContextoPlaylists = createContext<ContextoPlaylists | null>(null);

type PropsProveedor = {
  children: ReactNode;
};

export function ProveedorPlaylists({ children }: PropsProveedor) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const playlistsRef = useRef<Playlist[]>([]);
  const cargadoRef = useRef(false);
  const colaGuardadoRef = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    let activo = true;

    cargarPlaylists()
      .then((listasGuardadas) => {
        if (activo) {
          playlistsRef.current = listasGuardadas;
          setPlaylists(listasGuardadas);
          cargadoRef.current = true;
          setCargando(false);
        }
      })
      .catch(() => {
        if (activo) {
          cargadoRef.current = true;
          setCargando(false);
          setError('No se pudieron cargar las playlists guardadas.');
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  function actualizarPlaylists(actualizar: (actuales: Playlist[]) => Playlist[]) {
    if (!cargadoRef.current) {
      return false;
    }

    const siguientes = actualizar(playlistsRef.current);
    playlistsRef.current = siguientes;
    setPlaylists(siguientes);

    colaGuardadoRef.current = colaGuardadoRef.current
      .then(() => guardarPlaylists(siguientes))
      .then(() => setError(null))
      .catch(() => setError('No se pudieron guardar los cambios de la playlist.'));

    return true;
  }

  function crearPlaylist(nombre: string) {
    const nombreLimpio = nombre.trim();
    if (!nombreLimpio || !cargadoRef.current) {
      return null;
    }

    const playlist: Playlist = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      nombre: nombreLimpio,
      cancionIds: [],
    };

    return actualizarPlaylists((actuales) => [...actuales, playlist]) ? playlist : null;
  }

  function agregarCancion(playlistId: string, cancionId: string) {
    if (!cancionesPopulares.some((cancion) => cancion.id === cancionId)) {
      return false;
    }

    const playlist = playlistsRef.current.find((item) => item.id === playlistId);
    if (!playlist) {
      return false;
    }
    if (playlist.cancionIds.includes(cancionId)) {
      return true;
    }

    return actualizarPlaylists((actuales) =>
      actuales.map((item) =>
        item.id === playlistId ? { ...item, cancionIds: [...item.cancionIds, cancionId] } : item
      )
    );
  }

  const valor: ContextoPlaylists = {
    playlists,
    cargando,
    error,
    crearPlaylist,
    agregarCancion,
    limpiarError: () => setError(null),
  };

  return <ContextoPlaylists.Provider value={valor}>{children}</ContextoPlaylists.Provider>;
}

export function usePlaylists() {
  const contexto = useContext(ContextoPlaylists);
  if (!contexto) {
    throw new Error('usePlaylists debe usarse dentro de ProveedorPlaylists.');
  }
  return contexto;
}