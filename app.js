
// sección A de intereses
const habilidades = [ "Comida", "Java", "Música", "CSS", "Arte"]

// sección B  de función 

const mostrarEtiquetas = (lista) => { 
    const dom = document.querySelector("#etiquetas");

    dom.innerHTML = "";
    
    lista.forEach(habilidad => {

        const span = document.createElement("span" );
        span.classList.add("etiqueta");

        span.textContent= habilidad;

        dom.appendChild(span);

    });
};

// la sección  c  de función de perfil 
const construirPerfil = (datos) => { 
  return {
    nombre: datos.name ,
    usuario:"@" + (datos.login || "usuario"),
    email: datos.email || "No disponible",
    ciudad: datos.location || "Sin ubicación",
    avatar: datos.avatar_url
  };

};



// sección d para para el dom 

const renderizarPerfil = (perfil) => {

    const elNombre = document.querySelector("#nombre");
    const elUsuario = document.querySelector("#usuario");
    const elEmail = document.querySelector("#email");
    const elCiudad = document.querySelector("#ciudad");
    const elAvatar = document.querySelector("#avatar")
        
    elNombre.textContent = perfil.nombre;
    elUsuario.textContent = perfil.usuario;
    elEmail.textContent = perfil.email;
    elCiudad.textContent = perfil.ciudad;
    elAvatar.src = perfil.avatar;


};

// varios users 

const usuarios = ["torvalds", "gaearon", "yyx990803", "tj"];
let indiceUsuario = 0;

  // sección de de fetch 
const cargarUsuario = async () => {
  const mensaje = document.querySelector("#mensaje");

  try {
    mensaje.textContent = "buscando...";

    const username = usuarios[indiceUsuario];

    // se lo cambié porque por el límite ya no me lo mostraba 
    const respuesta = await fetch(`https://api.github.com/users/${username}`);

    const datos = await respuesta.json();

      if (!respuesta.ok) {
      throw new Error(datos.message);
    }

    const perfil = construirPerfil(datos);
    renderizarPerfil(perfil);
    mostrarEtiquetas(habilidades);

    mensaje.textContent = "";
    // next usuario 
    indiceUsuario = (indiceUsuario + 1) % usuarios.length;

  } catch (error) {
    mensaje.textContent = "Error al cargar user...";
    console.error(error);
  }
};


// sección de conexión de botón 
document.querySelector("#btn").addEventListener("click", cargarUsuario);