import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.contenedor}>
        <div className={styles.seccionLogo}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/assets/images/logo_hotel.png"
              alt="Logo Hotel"
              width={40}
              height={40}
            />
            <span>Hotel Lujo</span>
          </Link>
          <p className={styles.descripcion}>
            Disfruta de la mejor comodidad en nuestro hotel
          </p>
        </div>

        <div className={styles.seccionEnlaces}>
          <h4>Enlaces Rápidos</h4>
          <div className={styles.enlaces}>
            <Link href="/">Inicio</Link>
            <Link href="/#habitaciones">Habitaciones</Link>
            <Link href="/#servicios">Servicios</Link>
            <Link href="/#contacto">Contacto</Link>
          </div>
        </div>

        <div className={styles.seccionContacto}>
          <h4>Contacto</h4>
          <div className={styles.infoContacto}>
            <p>📍 Dirección del Hotel</p>
            <p>📞 +56 9 1234 5678</p>
            <p>✉️ contacto@hotellujo.com</p>
          </div>
        </div>

        <div className={styles.seccionRedesSociales}>
          <h4>Síguenos</h4>
          <div className={styles.redesSociales}>
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Twitter">🐦</a>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        <div className={styles.contenedor}>
          <p>&copy; {new Date().getFullYear()} Hotel Lujo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
