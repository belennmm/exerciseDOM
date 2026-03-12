
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



  // sección de de fetch 
const cargarUsuario = async () => {
  const mensaje = document.querySelector("#mensaje");

  try {
    mensaje.textContent = "...";

    // se lo cambié porque por el límite ya no me lo mostraba 
    const respuesta = await fetch("https://api.github.com/users/gaearon");

    const datos = await respuesta.json();

    const perfil = construirPerfil(datos);
    renderizarPerfil(perfil);
    mostrarEtiquetas(habilidades);

    mensaje.textContent = "";
  } catch (error) {
    mensaje.textContent = "Error al cargar...";
    console.error(error);
  }
};


// sección de conexión de botón 
document.querySelector("#btn").addEventListener("click", cargarUsuario);