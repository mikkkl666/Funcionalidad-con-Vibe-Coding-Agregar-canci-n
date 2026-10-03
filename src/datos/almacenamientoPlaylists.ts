import * as FileSystem from 'expo-file-system/legacy';
import { Playlist } from '@/tipos/tipos';

const VERSION_ALMACENAMIENTO = 1;

function obtenerRutaArchivo(): string | null {
  const directorioDocumentos = FileSystem.documentDirectory;
  return directorioDocumentos ? `${directorioDocumentos}playlists.json` : null;
}

type DatosAlmacenados = {
  version: number;
  playlists: unknown[];
};

function esObjeto(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === 'object' && valor !== null;
}

function convertirPlaylist(valor: unknown): Playlist | null {
  if (
    !esObjeto(valor) ||
    typeof valor.id !== 'string' ||
    typeof valor.nombre !== 'string' ||
    !Array.isArray(valor.cancionIds) ||
    !valor.cancionIds.every((id) => typeof id === 'string')
  ) {
    return null;
  }

  return {
    id: valor.id,
    nombre: valor.nombre,
    cancionIds: [...new Set(valor.cancionIds)],
  };
}

export async function cargarPlaylists(): Promise<Playlist[]> {
  const rutaArchivo = obtenerRutaArchivo();
  if (!rutaArchivo) {
    return [];
  }

  try {
    const informacion = await FileSystem.getInfoAsync(rutaArchivo);
    if (!informacion.exists) {
      return [];
    }

    const datos = JSON.parse(await FileSystem.readAsStringAsync(rutaArchivo)) as unknown;
    if (!esObjeto(datos) || datos.version !== VERSION_ALMACENAMIENTO || !Array.isArray(datos.playlists)) {
      return [];
    }

    return datos.playlists
      .map(convertirPlaylist)
      .filter((playlist): playlist is Playlist => playlist !== null);
  } catch {
    return [];
  }
}

export async function guardarPlaylists(playlists: Playlist[]): Promise<void> {
  const rutaArchivo = obtenerRutaArchivo();
  if (!rutaArchivo) {
    throw new Error('No esta disponible el directorio de documentos.');
  }

  const datos: DatosAlmacenados = {
    version: VERSION_ALMACENAMIENTO,
    playlists,
  };
  await FileSystem.writeAsStringAsync(rutaArchivo, JSON.stringify(datos));
}