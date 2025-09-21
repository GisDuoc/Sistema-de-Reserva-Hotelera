export const gestorUsuarios = {
  obtenerTodos: () => {
    if (typeof window === 'undefined') return [];
    const usuarios = localStorage.getItem('usuarios');
    return usuarios ? JSON.parse(usuarios) : [];
  },

  obtenerPorEmail: (email) => {
    const usuarios = gestorUsuarios.obtenerTodos();
    return usuarios.find(usuario => usuario.email === email);
  },

  crear: (nuevoUsuario) => {
    const usuarios = gestorUsuarios.obtenerTodos();
    const usuarioExiste = usuarios.find(usuario => usuario.email === nuevoUsuario.email);
    
    if (usuarioExiste) {
      throw new Error('El usuario ya existe');
    }

    const usuario = {
      id: Date.now().toString(),
      ...nuevoUsuario,
      fechaCreacion: new Date().toISOString()
    };

    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    return usuario;
  },

  actualizar: (id, datosActualizados) => {
    const usuarios = gestorUsuarios.obtenerTodos();
    const indice = usuarios.findIndex(usuario => usuario.id === id);
    
    if (indice === -1) {
      throw new Error('Usuario no encontrado');
    }

    usuarios[indice] = { ...usuarios[indice], ...datosActualizados };
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    return usuarios[indice];
  },

  eliminar: (id) => {
    const usuarios = gestorUsuarios.obtenerTodos();
    const usuariosFiltrados = usuarios.filter(usuario => usuario.id !== id);
    localStorage.setItem('usuarios', JSON.stringify(usuariosFiltrados));
    return true;
  },

  autenticar: (email, contrasena) => {
    const usuario = gestorUsuarios.obtenerPorEmail(email);
    if (!usuario || usuario.contrasena !== contrasena) {
      throw new Error('Credenciales incorrectas');
    }
    return usuario;
  }
};

export const gestorSesion = {
  iniciar: (usuario) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('sesionActiva', JSON.stringify({
      usuario,
      fechaInicio: new Date().toISOString()
    }));
  },

  obtener: () => {
    if (typeof window === 'undefined') return null;
    const sesion = localStorage.getItem('sesionActiva');
    return sesion ? JSON.parse(sesion) : null;
  },

  cerrar: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('sesionActiva');
  }
};
