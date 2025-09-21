'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { gestorUsuarios, gestorSesion } from '@/utils/localStorage';
import styles from './page.module.scss';

export default function PaginaLogin() {
  const [datosFormulario, setDatosFormulario] = useState({
    email: '',
    contrasena: ''
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

    if (!datosFormulario.email.trim()) {
      nuevosErrores.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(datosFormulario.email)) {
      nuevosErrores.email = 'El email no es válido';
    }

    if (!datosFormulario.contrasena.trim()) {
      nuevosErrores.contrasena = 'La contraseña es requerida';
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
      const usuario = gestorUsuarios.autenticar(
        datosFormulario.email,
        datosFormulario.contrasena
      );
      
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
    <div className={styles.paginaLogin}>
      <div className={styles.contenedorFormulario}>
        <div className={styles.formulario}>
          <div className={styles.encabezado}>
            <h1>Iniciar Sesión</h1>
            <p>Accede a tu cuenta para continuar</p>
          </div>

          <form onSubmit={manejarEnvio} className={styles.form}>
            {errores.general && (
              <div className={styles.errorGeneral}>
                {errores.general}
              </div>
            )}

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
              <label htmlFor="contrasena">Contraseña</label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                value={datosFormulario.contrasena}
                onChange={manejarCambio}
                className={errores.contrasena ? styles.campoError : ''}
                placeholder="Ingresa tu contraseña"
              />
              {errores.contrasena && (
                <span className={styles.mensajeError}>{errores.contrasena}</span>
              )}
            </div>

            <button 
              type="submit" 
              className={styles.botonEnviar}
              disabled={cargando}
            >
              {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className={styles.enlaceRegistro}>
            <p>
              ¿No tienes cuenta?{' '}
              <Link href="/registro" className={styles.enlace}>
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
