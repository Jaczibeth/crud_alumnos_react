import { useState } from 'react';
import Splash from './app/pages/splash/Splash';
import Alumnos from './app/pages/alumnos/Alumnos';

function App() {
  const [mostrarSplash, setMostrarSplash] = useState(true);

  return (
    <>
      {mostrarSplash ? (
        <Splash alTerminar={() => setMostrarSplash(false)} />
      ) : (
        <Alumnos />
        
      )}
    </>
  );
}

export default App;
