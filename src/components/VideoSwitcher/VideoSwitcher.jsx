import React, { useState, useEffect, useRef, useMemo } from 'react';
import './VideoSwitcher.css';
import video1 from '../../assets/videos/video1(2).mp4';
import video2 from '../../assets/videos/video2(2).mp4';
import video4 from '../../assets/videos/video4(2).mp4';
import video5 from '../../assets/videos/video5(2).mp4';
import video6 from '../../assets/videos/video6(2).mp4';
import scissorsImage from '../../assets/images/scissors.png';

const VideoSwitcher = ({ isStarted }) => {
  const videoList = useMemo(() => [video1, video2, video4, video5, video6], []);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [showElements, setShowElements] = useState(false);
    const [animationStarted, setAnimationStarted] = useState(false);
    const [isAwaitingTouch, setIsAwaitingTouch] = useState(false);
    const videoRef = useRef(null);
    useEffect(() => {
      if (isStarted) {
          videoRef.current.load();
          setShowElements(true); // Por exemplo
      }
  }, [isStarted]);
    const handleScissorsClick = () => {
        if (showElements && !animationStarted) {
            setAnimationStarted(true);
            videoRef.current.play(); // Inicia a reprodução do vídeo após o clique na tesoura
        }
    };

    const handleAnimationEnd = () => {
        setAnimationStarted(false);
        setShowElements(false);
        if (currentVideoIndex === 0) {
            setCurrentVideoIndex(1);
        }
    };

    const handleVideoEnd = () => {
      console.log(`Vídeo ${currentVideoIndex} terminou.`);
      if (currentVideoIndex < videoList.length - 1) {
          // Se não for o último vídeo, defina isAwaitingTouch para true
          console.log(`Esperando pelo toque na tela após o vídeo ${currentVideoIndex}.`);
          setIsAwaitingTouch(true);
      } else {
          // Último vídeo terminou, trate conforme necessário.
          console.log('Todos os vídeos foram reproduzidos.');
          // Aqui, você pode definir o comportamento para quando todos os vídeos tiverem sido reproduzidos
      }
  };

  const handleTouch = () => {
    console.log('Tela tocada.');
    if (isAwaitingTouch) {
        const nextVideoIndex = currentVideoIndex + 1;
        if (nextVideoIndex < videoList.length) {
            console.log(`Avançando para o vídeo ${nextVideoIndex}.`);
            setCurrentVideoIndex(nextVideoIndex);
            setIsAwaitingTouch(false);
        }
    }
};

    useEffect(() => {
        if (currentVideoIndex > 0) {
            videoRef.current.src = videoList[currentVideoIndex];
            videoRef.current.load();
            videoRef.current.play();
        }
    }, [currentVideoIndex, videoList]);

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
                <div className="touch-prompt">Toque aqui!</div>
            )}
        </div>
    );
};

export default VideoSwitcher;
