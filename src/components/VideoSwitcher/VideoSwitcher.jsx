import React, { useState, useEffect, useRef } from 'react';
import './VideoSwitcher.css';
// Importe todos os seus vídeos
import video1 from '../../assets/videos/video1(2).mp4';
import video2 from '../../assets/videos/video2(2).mp4';
//import video3 from '../../assets/videos/video3(2).mp4';
import video4 from '../../assets/videos/video4(2).mp4';
import video5 from '../../assets/videos/video5(2).mp4';
import video6 from '../../assets/videos/video6(2).mp4';
import scissorsImage from '../../assets/images/scissors.png';

const VideoSwitcher = () => {
  // Lista de vídeos a serem reproduzidos
  const videoList = [video1, video2, video4, video5, video6];
  const [isAwaitingTouch, setIsAwaitingTouch] = useState(false); // Novo estado para controlar o toque após vídeo 2

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showElements, setShowElements] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    console.log('useEffect inicial: Configurando para mostrar elementos após 3 segundos');
    const timer = setTimeout(() => {
      console.log('Mostrando elementos (tesoura e linhas)');
      setShowElements(true);
    }, 3000);

    return () => {
      console.log('Limpando timer');
      clearTimeout(timer);
    };
  }, []);

  const handleScissorsClick = () => {
    console.log('Clicou na tesoura');
    if (showElements && !animationStarted) {
      console.log('Iniciando animação da tesoura');
      setAnimationStarted(true);
      videoRef.current.play();
    } else {
      console.log('Animação já iniciada ou elementos ainda não estão prontos para serem mostrados');
    }
  };

  const handleAnimationEnd = () => {
    console.log('Animação da tesoura terminou.');
    if (animationStarted) {
      console.log('Verificando se é hora de tocar o vídeo');
      if (currentVideoIndex === 0) {
        console.log('Tentando iniciar a reprodução do vídeo 1');
        videoRef.current.play(); // Aqui deve iniciar a reprodução do vídeo
      }
      setAnimationStarted(false);
      setShowElements(false);
    } else {
      console.log('handleAnimationEnd chamado, mas a animação não foi iniciada.');
    }
  };

  const handleVideoEnd = () => {
    console.log(`Vídeo ${currentVideoIndex} terminou.`);
    if (currentVideoIndex === 0) {
      // Se for o primeiro vídeo, simplesmente avance para o segundo.
      console.log('Avançando automaticamente para o vídeo 1.');
      setCurrentVideoIndex(1);
    } else if (currentVideoIndex < videoList.length - 1) {
      // Se não for o último vídeo, aguarde a interação do usuário para continuar.
      console.log(`Esperando pelo toque na tela após o vídeo ${currentVideoIndex}.`);
      setIsAwaitingTouch(true);
    } else {
      // Último vídeo terminou, trate conforme necessário.
      console.log('Todos os vídeos foram reproduzidos.');
    }
  };

  

  const handleTouch = () => {
    console.log('Tela tocada.');
    if (isAwaitingTouch && currentVideoIndex > 0) {
      advanceToNextVideo();
    }
  };

  const advanceToNextVideo = () => {
    const nextVideoIndex = currentVideoIndex + 1;
    if (nextVideoIndex < videoList.length) {
      console.log(`Avançando para o vídeo ${nextVideoIndex}.`);
      setCurrentVideoIndex(nextVideoIndex);
      setIsAwaitingTouch(false);
    }
  };
  
  useEffect(() => {
    console.log(`useEffect para troca de vídeo: índice atual do vídeo: ${currentVideoIndex}`);
    if (currentVideoIndex > 0) {
      console.log(`Carregando vídeo ${currentVideoIndex}`);
      videoRef.current.src = videoList[currentVideoIndex];
      videoRef.current.load();
      videoRef.current.play();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideoIndex]);

  return (
    <div className="video-container" onClick={isAwaitingTouch ? handleTouch : undefined}>
      <video
        ref={videoRef}
        src={videoList[currentVideoIndex]}
        loop={false}
        muted
        playsInline
        className="video-player"
        onEnded={handleVideoEnd}
      />
      {showElements && currentVideoIndex === 0 && (
        <>
          <div className="line vertical-line"></div>
          <div className="line horizontal-line"></div>
          <img
            src={scissorsImage}
            alt="Scissors"
            className={`scissors ${animationStarted ? 'cutting' : ''}`}
            onClick={handleScissorsClick}
            onAnimationEnd={handleAnimationEnd}
          />
          {!animationStarted && <p className="message">Toque no objeto para iniciar</p>}
        </>
      )}
      {isAwaitingTouch && currentVideoIndex > 0 && (
        <div className="touch-prompt">
          Toque aqui!
        </div>
      )}
    </div>
  );
};

export default VideoSwitcher;
