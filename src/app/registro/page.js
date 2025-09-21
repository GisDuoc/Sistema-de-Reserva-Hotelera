'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { gestorUsuarios, gestorSesion } from '@/utils/localStorage';
import styles from './page.module.scss';

export default function PaginaRegistro() {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    contrasena: '',
    confirmarContrasena: ''
  });
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const router = useRouter();

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario(prev => ({
      ...prev,
      [name]: value
    }));
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!datosFormulario.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido';
    } else if (datosFormulario.nombre.trim().length < 2) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!datosFormulario.email.trim()) {
      nuevosErrores.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(datosFormulario.email)) {
      nuevosErrores.email = 'El email no es válido';
    }

    if (!datosFormulario.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s-()]{8,}$/.test(datosFormulario.telefono)) {
      nuevosErrores.telefono = 'El teléfono no es válido';
    }

    if (!datosFormulario.contrasena.trim()) {
      nuevosErrores.contrasena = 'La contraseña es requerida';
    } else if (datosFormulario.contrasena.length < 6) {
      nuevosErrores.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!datosFormulario.confirmarContrasena.trim()) {
      nuevosErrores.confirmarContrasena = 'Confirma tu contraseña';
    } else if (datosFormulario.contrasena !== datosFormulario.confirmarContrasena) {
      nuevosErrores.confirmarContrasena = 'Las contraseñas no coinciden';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    setCargando(true);

    try {
      const nuevoUsuario = {
        nombre: datosFormulario.nombre.trim(),
        email: datosFormulario.email.trim().toLowerCase(),
        telefono: datosFormulario.telefono.trim(),
        contrasena: datosFormulario.contrasena
      };

      const usuario = gestorUsuarios.crear(nuevoUsuario);
      gestorSesion.iniciar(usuario);
      router.push('/');
    } catch (error) {
      setErrores({
        general: error.message
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.paginaRegistro}>
      <div className={styles.contenedorFormulario}>
        <div className={styles.formulario}>
          <div className={styles.encabezado}>
            <h1>Registrarse</h1>
            <p>Crea tu cuenta para acceder a nuestros servicios</p>
          </div>

          <form onSubmit={manejarEnvio} className={styles.form}>
            {errores.general && (
              <div className={styles.errorGeneral}>
                {errores.general}
              </div>
            )}

            <div className={styles.campo}>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={datosFormulario.nombre}
                onChange={manejarCambio}
                className={errores.nombre ? styles.campoError : ''}
                placeholder="Ingresa tu nombre completo"
              />
              {errores.nombre && (
                <span className={styles.mensajeError}>{errores.nombre}</span>
              )}
            </div>

            <div className={styles.campo}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={datosFormulario.email}
                onChange={manejarCambio}
                className={errores.email ? styles.campoError : ''}
                placeholder="Ingresa tu email"
              />
              {errores.email && (
                <span className={styles.mensajeError}>{errores.email}</span>
              )}
            </div>

            <div className={styles.campo}>
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={datosFormulario.telefono}
                onChange={manejarCambio}
                className={errores.telefono ? styles.campoError : ''}
                placeholder="Ingresa tu teléfono"
              />
              {errores.telefono && (
                <span className={styles.mensajeError}>{errores.telefono}</span>
              )}
            </div>

            <div className={styles.campo}>
              <label htmlFor="contrasena">Contraseña</label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                value={datosFormulario.contrasena}
                onChange={manejarCambio}
                className={errores.contrasena ? styles.campoError : ''}
                placeholder="Crea una contraseña"
              />
              {errores.contrasena && (
                <span className={styles.mensajeError}>{errores.contrasena}</span>
              )}
            </div>

            <div className={styles.campo}>
              <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmarContrasena"
                name="confirmarContrasena"
                value={datosFormulario.confirmarContrasena}
                onChange={manejarCambio}
                className={errores.confirmarContrasena ? styles.campoError : ''}
                placeholder="Confirma tu contraseña"
              />
              {errores.confirmarContrasena && (
                <span className={styles.mensajeError}>{errores.confirmarContrasena}</span>
              )}
            </div>

            <button 
              type="submit" 
              className={styles.botonEnviar}
              disabled={cargando}
            >
              {cargando ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </form>

          <div className={styles.enlaceLogin}>
            <p>
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className={styles.enlace}>
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
