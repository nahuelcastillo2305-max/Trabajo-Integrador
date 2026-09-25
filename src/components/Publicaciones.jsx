// Importo los hooks que voy a usar
import {useEffect,useState } from "react";
// useState: nos permite guardar datos que cambian
// useeffect: nos permite ejecutar algo cuando se carga el componente

//------Importo las funciones del CRUD publicaciones.js------
import {obtenerPublicaciones,crearPublicacion,actualizarPublicacion,eliminarPublicacion } from "../services/publicaciones";

export default function publicaciones() {
    // Guarda todas las publicaciones
    const [lista, setLista] = useState([]);
    // Indica si estamos cargando datos
    const [cargando, setCargando] = useState(true);
    // Guarda el titulo escrito en el formulario
    const [titulo, setTitulo] = useState("");
    // Guarda el contenido escerito en el formulario
    const [contenido, setContenido] = useState("")
    // Guarda el ID de la publicacion que estamos editando
    const [publicacionEditando, setPublicacionEditando] = useState(null);


// -----Carga las publicaciones cuando se abre el componente----
// Lo utilizo para cargar las publicaciones cuando se monta el componente.
  useEffect(() => {cargarPublicaciones();}, []);

// ------Trae las publicaciones desde SupaBase---------
// Creo una funcion llamada cargarPublicaciones
async function cargarPublicaciones() {
    // cargando los datos
   setCargando(true);
// Espero la respuesta de Supabase y separo los datos del posible error
    const {data,error} = await obtenerPublicaciones();

// Si hubo error → mostramos el error.
// Si salió bien → guardamos los datos en lista
    if(error){alert(error.message)}
    else {setLista(data);}
// Terminamos la carga
    setCargando(false)
}

//-------Creamos el Handlesubmit--------
async function handleSubmit(e) {e.preventDefault();
  // Verificamos que los campos estén completos
  if (titulo.trim() === "" || contenido.trim() === "") {
    alert("Completa todos los campos");
    return;
  }

// Guardamos los datos del formulario
  const datos = {titulo,contenido};
// Si hay un ID, estamos editando
  if (publicacionEditando) {

    // Actualizamos la publicación
    const { error } = await actualizarPublicacion(
      publicacionEditando,
      datos
    );

    // Si hay un error, lo mostramos
    if (error) {
      alert(error.message);
      return;
    }

  } 
  else {

    // Si no hay ID, creamos una publicación
    const { error } = await crearPublicacion(datos);

    // Si hay un error, lo mostramos
    if (error) {alert(error.message);
      return;
    }
  }

  // Actualizamos la lista
  await cargarPublicaciones();

  // Limpiamos el formulario
  setTitulo("");
  setContenido("");

  // Salimos del modo edición
  setPublicacionEditando(null);
}


//---Funcion Editarpublicacion---
// La función carga los datos de la publicación en el formulario y guarda su ID para saber cuál voy a editar
function editarPublicacion(publicacion){
//cargamos el titulo
setTitulo(publicacion.titulo);
//Cargamos el contenido
setContenido(publicacion.contenido);
//guardar el id de la publicacion
setPublicacionEditando(publicacion.id);
}

//--Funcion Cancelar la edicion y limpia el formulario
function cancelarEdicion(){
    setTitulo("")
    setContenido("")
    setPublicacionEditando(null)
}

// Funcion BorrarPublicacion
async function borrarPublicacion(id) {
    //Pedimos Confirmacion antes de borrar
    const confirmar = window.confirm("Seguro que queres borrar esta publicacion");

    //si cancela no hacemos nada
    if (!confirmar){
        return;
    }
    //Eliminacion la publicacion de Supabase
  const { error } = await eliminarPublicacion(id);
  // Si hubo un error, lo mostramos
  if (error) {alert(error.message);
    return;
  }

  // Actualizamos la lista después de borrar
  await cargarPublicaciones();
}

// -----Voy a crear la interfaz -----

return (
  <div>

    {/* Título de la página */}
    <h1>Publicaciones</h1>

    {/* Formulario para crear una publicación */}
    <form onSubmit={handleSubmit}>

      {/* Campo para el título */}
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        required
        onChange={(e) => setTitulo(e.target.value)}
      />

      {/* Campo para el contenido */}
      <textarea
        placeholder="Contenido"
        value={contenido}
        required
        onChange={(e) => setContenido(e.target.value)}
      />

      {/* Botón para crear */}
      <button type="submit">
        {publicacionEditando ? "Actualizar" : "Crear"}
      </button>
      {/* Boton para cancelar la edicion */}
      {publicacionEditando && (
        <button type="button" onClick={cancelarEdicion}>
            cancelar
        </button>
      )}

    </form>

    {/* Mostramos "Cargando..." mientras esperamos */}
    {cargando ? (

      <p>Cargando...</p>

    ) : lista.length === 0 ? (

      /* Si no hay publicaciones */
      <p>Todavía no hay publicaciones</p>

    ) : (

      /* Si hay publicaciones, las mostramos */
      lista.map((publicacion) => (

        <div className="publicacion" key={publicacion.id}>

          {/* Título de la publicación */}
          <h2>{publicacion.titulo}</h2>

          {/* Contenido de la publicación */}
          <p>{publicacion.contenido}</p>

          {/* Fecha de creación */}
          <small>{publicacion.creado_en}</small>

         {/* Botón para editar */}
        <button onClick={() => editarPublicacion(publicacion)}>
            Editar
            </button>
        {/* Boton para borrar */}
        <button onClick={() => borrarPublicacion(publicacion.id)}>
            borrar
        </button>

        </div>

      ))
    )}

  </div>
);
}
