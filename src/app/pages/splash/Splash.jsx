import { useEffect, useState } from 'react';
import { IoSchoolSharp } from 'react-icons/io5';
import { useBurbujas } from '../../core/hooks/useBurbujas';
import Cargador from '../../shared/components/Cargador/Cargador';
import './splash.css';

const Splash = ({ alTerminar }) => {
  const burbujas = useBurbujas(12);
  const [saliendo, setSaliendo] = useState(false);

  useEffect(() => {
    const inicializarAplicacion = async () => {
      try {
        console.log("Cargando componentes del sistema...");
        
        // Tiempo de espera de 5 segundos antes de empezar a salir
        setTimeout(() => {
          setSaliendo(true);
          // Tiempo para que termine la animación de desvanecimiento
          setTimeout(alTerminar, 1000);
        }, 5000);


      } catch (error) {
        console.error("Error al inicializar:", error);
        alert("Ocurrió un error al cargar el sistema. Por favor, recarga la página.");
      }
    };

    inicializarAplicacion();
  }, [alTerminar]);

  return (
    <div className={`splash-container ${saliendo ? 'splash-fade-out' : ''}`}>
      <div className="splash-bubbles">
        {burbujas.map((b) => (
          <div key={b.id} className="splash-bubble" style={b.estilo} />
        ))}
      </div>

      <div className="splash-content">
        <div className="splash-glow">
          <IoSchoolSharp className="splash-icon" />
        </div>

        <h1 className="splash-title">Sistema de Alumnos</h1>
        <p className="splash-subtitle">Gestión Académica</p>

        <Cargador />

        <p className="splash-hint">Toca para comenzar la experiencia</p>
      </div>
    </div>
  );
};

export default Splash;
