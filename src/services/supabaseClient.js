// Importo la funcion que conecta con supabase
import { createClient } from "@supabase/supabase-js";

// Obtengo la URL de mi proyecto desde el archivo .env
const supabaseurl = import.meta.env.VITE_SUPABASE_URL;
// Obtengo la clave de supabase desde el archivo .env
const supabaseanonkey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Creo y exporto la conexion con supabase
export const supabase = createClient(supabaseurl, supabaseanonkey);

