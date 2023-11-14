import React, { useState } from 'react';
import './App.css';
import VideoSwitcher from './components/VideoSwitcher/VideoSwitcher';
import bio from './assets/images/bio.jpeg'; // Importe a imagem

function App() {
  const [isVideoStarted, setIsVideoStarted] = useState(false);

    const handleStart = () => {
      setIsVideoStarted(true); // Torna o vídeo visível
        // Outras ações de início, se necessário
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Retículo Endoplasmático rugoso</h1>
            </header>
            <main>
                {!isVideoStarted &&  (
                    <>
                        <img src={bio} alt="Descrição da imagem" className="bio-image" />
                        <button onClick={handleStart} className="start-button">Iniciar</button>
                    </>
                )}
                {isVideoStarted && <VideoSwitcher isStarted={isVideoStarted}/>}
            </main>
        </div>
    );
}

export default App;