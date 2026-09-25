## Funciones de services/publicaciones.js

### obtenerPublicaciones()
Se encarga de traer todas las publicaciones guardadas en Supabase.
Se dispara cuando se carga la página y también después de crear, editar o eliminar una publicación para actualizar la lista.

### crearPublicacion()
Se encarga de guardar una nueva publicación en Supabase.
Se dispara cuando completo el formulario y presiono el botón "Crear".

### actualizarPublicacion()
Se encarga de modificar una publicación que ya existe.
Se dispara cuando presiono "Editar", modifico los datos y después presiono "Actualizar".

### eliminarPublicacion()
Se encarga de eliminar una publicación por su ID.
Se dispara cuando presiono el botón "Borrar" y confirmo la eliminación.