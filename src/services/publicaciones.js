// importo la conexion con supabase
import { supabase } from "./supabaseClient";

// Obtengo todas las publicaciones
export async function obtenerPublicaciones() {
//   devolver el resultado de la consulta que hace la función
  return supabase
    // Quiero trabajar con la tabla publicaciones
    .from("publicaciones")
    // Quiero traer estos campos.
    .select("id, titulo, contenido, creado_en")
    // Quiero ordenar las publicaciones por fecha, mostrando las mas nuevas
    .order("creado_en", { ascending: false });}

// Crear una nueva publicacion
export async function crearPublicacion ({titulo,contenido}) {
    return supabase
    // Quiero trabajar con la tabla publicaciones
    .from("publicaciones")
    // inserto una nueva fila en la tabla con estos datos
    .insert({titulo, contenido})
}

//Actualizar una publicacion existente
export async function actualizarPublicacion(id,cambios) {
    return supabase
    // Quiero trabajar con la tabla publicaciones
    .from("publicaciones")
    // Actualiza los datos de esta publicacion
    .update(cambios)
    // Modifica la publicacion cuyo id sea igual al ID que recibi
    .eq("id", id);
}

// Elimina una publicacion por su ID
export async function eliminarPublicacion(id) {
    return supabase
    // Quiero trabajar con la tabla publicaciones
    .from("publicaciones")
    // Quiero eliminar un registro.
    .delete()
    // Pero solamente el registro cuyo ID coincida con el que recibi.
    .eq("id", id);
}