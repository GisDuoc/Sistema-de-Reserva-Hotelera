import Image from "next/image";
import styles from "./page.module.scss";

export default function PaginaPrincipal() {
  return (
    <div className={styles.paginaPrincipal}>
      <section className={styles.hero}>
        <div className={styles.imagenHero}>
          <Image
            src="/assets/images/Hotel 1.png"
            alt="Hotel de lujo con piscina"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className={styles.contenidoHero}>
          <h1>Disfruta de la mejor comodidad en nuestro hotel</h1>
          <p>Experimenta el lujo y la comodidad en cada momento de tu estadía</p>
          <button className={styles.botonReservar}>
            RESERVA AQUÍ
          </button>
        </div>
      </section>

      <section id="habitaciones" className={styles.habitaciones}>
        <div className={styles.contenedor}>
          <h2>Tenemos las mejores opciones para ti y los tuyos</h2>
          
          <div className={styles.tiposHabitacion}>
            <div className={styles.habitacion}>
              <div className={styles.imagenHabitacion}>
                <Image
                  src="/assets/images/suite-de-dormitorio-de-lujo-de-renderizado-3d-en-hotel-resort-con-dos-camas-individuales-y-sala-de-estar.png"
                  alt="Habitación cama King"
                  width={300}
                  height={200}
                />
              </div>
              <h3>Habitaciones cama King</h3>
            </div>

            <div className={styles.habitacion}>
              <div className={styles.imagenHabitacion}>
                <Image
                  src="/assets/images/suite-de-dormitorio-de-lujo-de-renderizado-3d-en-hotel-resort-con-dos-camas-individuales-y-sala-de-estar (1).png"
                  alt="Habitaciones dobles"
                  width={300}
                  height={200}
                />
              </div>
              <h3>Habitaciones dobles</h3>
            </div>

            <div className={styles.habitacion}>
              <div className={styles.imagenHabitacion}>
                <Image
                  src="/assets/images/interior-del-sitio-de-alojamiento-comodo.png"
                  alt="Habitaciones individuales"
                  width={300}
                  height={200}
                />
              </div>
              <h3>Habitaciones individuales</h3>
            </div>

            <div className={styles.reservaCard}>
              <div className={styles.iconoReserva}>
                💻
              </div>
              <h3>RESERVA AQUÍ</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
