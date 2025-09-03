// src/components/SpeakerCarousel/SpeakerCarousel.tsx
import React, { useEffect, useRef, useState } from 'react';
import { eventoConfig } from '../../config/evento';
import placeholderImg from '@/assets/pregador_1_placeholder.png';
import joaoHeuldesImg from '@/assets/joao_heuldes.png';
import pregador2PlaceholderImg from '@/assets/pregador_2_placeholder.png';
import './SpeakerCarousel.css';

export interface Sessao {
  idSessao: string;
  pregador?: string;
  imagem?: string;
  inicioISO: string;
  fimISO: string;
}

const AUTOPLAY_MS = 3000;
const PAUSE_AFTER_INTERACTION_MS = 4000;

// Mapeamento direto de imagens
const ASSETS_MAP: Record<string, string> = {
  'pregador_1_placeholder.png': placeholderImg,
  'joao_heuldes.png': joaoHeuldesImg,
  'pregador_2_placeholder.png': pregador2PlaceholderImg
};

// Função simplificada para obter imagens
function getImageSrc(filename?: string): string {
  if (!filename) return placeholderImg;
  return ASSETS_MAP[filename] || placeholderImg;
}

export const SpeakerCarousel: React.FC<{ className?: string }> = ({ className = '' }) => {
  const sessions = (eventoConfig.datasESessoes ?? []) as Sessao[];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const interactionTimerRef = useRef<number | null>(null);
  const autoplayTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (autoplayTimerRef.current) {
      window.clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }

    if (!isPaused && sessions.length > 1) {
      autoplayTimerRef.current = window.setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % sessions.length);
      }, AUTOPLAY_MS);
    }

    return () => {
      if (autoplayTimerRef.current) {
        window.clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isPaused, sessions.length]);

  const pauseAfterInteraction = () => {
    setIsPaused(true);
    
    if (interactionTimerRef.current) {
      window.clearTimeout(interactionTimerRef.current);
    }
    
    interactionTimerRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, PAUSE_AFTER_INTERACTION_MS);
  };

  const goToPrevious = () => {
    pauseAfterInteraction();
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? sessions.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    pauseAfterInteraction();
    setCurrentIndex(prevIndex => 
      (prevIndex + 1) % sessions.length
    );
  };

  const goToSlide = (index: number) => {
    pauseAfterInteraction();
    setCurrentIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setCurrentIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setCurrentIndex(sessions.length - 1);
    }
  };

  useEffect(() => {
    return () => {
      if (interactionTimerRef.current) {
        window.clearTimeout(interactionTimerRef.current);
      }
      if (autoplayTimerRef.current) {
        window.clearInterval(autoplayTimerRef.current);
      }
    };
  }, []);

  if (!sessions || sessions.length === 0) {
    return null;
  }

  const currentSession = sessions[currentIndex];
  const isMystery = !currentSession.pregador || currentSession.pregador.trim() === '';
  const imageSrc = getImageSrc(currentSession.imagem);

  return (
    <section 
      className={`speaker-carousel-container ${className}`}
      role="region" 
      aria-label="Carrossel de pregadores"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="speaker-carousel">
        <div className="speaker-track">
          <div className="speaker-slide speaker-slide--active">
            <div className="speaker-card">
              <div className="speaker-left">
                <img 
                  className="speaker-img"
                  src={imageSrc}
                  alt={isMystery ? 'Pregador a ser revelado' : `Foto de ${currentSession.pregador}`}
                  loading="eager"
                  draggable={false}
                />
              </div>
              
              <div className="speaker-right">
                {isMystery ? (
                  <div className="speaker-mystery">
                    <div className="speaker-mystery-mark">?</div>
                    <div className="speaker-mystery-text">Eaí, quem será? 👀</div>
                  </div>
                ) : (
                  <div className="speaker-name" aria-live="polite">
                    {currentSession.pregador}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {sessions.length > 1 && (
          <>
            <div className="speaker-controls">
              <button 
                className="speaker-btn speaker-btn--prev"
                aria-label="Anterior"
                onClick={goToPrevious}
              >
                ‹
              </button>
              <button 
                className="speaker-btn speaker-btn--next"
                aria-label="Próximo"
                onClick={goToNext}
              >
                ›
              </button>
            </div>

            <div className="speaker-dots" role="tablist" aria-label="Navegação de slides">
              {sessions.map((_, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={index === currentIndex}
                  className={`speaker-dot ${index === currentIndex ? 'speaker-dot--active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Ir para pregador ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};