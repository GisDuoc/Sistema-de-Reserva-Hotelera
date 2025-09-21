'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { gestorSesion } from '@/utils/localStorage';
import styles from './Header.module.scss';

export default function Header() {
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  useEffect(() => {
    const sesion = gestorSesion.obtener();
    if (sesion) {
      setUsuarioActivo(sesion.usuario);
    }
  }, []);

  const manejarCierreSesion = () => {
    gestorSesion.cerrar();
    setUsuarioActivo(null);
    window.location.href = '/';
  };

  return (
    <header className={styles.header}>
      <div className={styles.contenedor}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/assets/images/logo_hotel.png"
            alt="Logo Hotel"
            width={50}
            height={50}
            priority
          />
          <span>Hotel Lujo</span>
        </Link>

        <nav className={styles.navegacion}>
          <Link href="/" className={styles.enlace}>
            Inicio
          </Link>
          <Link href="/#habitaciones" className={styles.enlace}>
            Habitaciones
          </Link>
          <Link href="/#servicios" className={styles.enlace}>
            Servicios
          </Link>
          <Link href="/#contacto" className={styles.enlace}>
            Contacto
          </Link>
        </nav>

        <div className={styles.acciones}>
          {usuarioActivo ? (
            <div className={styles.usuarioLogueado}>
              <span>Hola, {usuarioActivo.nombre}</span>
              <button 
                onClick={manejarCierreSesion}
                className={styles.botonCerrarSesion}
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className={styles.botonesAuth}>
              <Link href="/login" className={styles.botonLogin}>
                Iniciar Sesión
              </Link>
              <Link href="/registro" className={styles.botonRegistro}>
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
