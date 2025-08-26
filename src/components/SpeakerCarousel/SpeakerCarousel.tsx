import React, { useState, useEffect, useCallback } from 'react';
import { eventoConfig } from '../../config/evento';
import { getTimeUntil, formatDuration, parseISOInTimezone, generateICS, downloadICS, generateGoogleCalendarLink } from '../../utils/datetime';
import { handleCarouselKeyNavigation } from '../../utils/a11y';
import './SpeakerCarousel.css';

interface SpeakerCarouselProps {
  className?: string;
}

interface SpeakerState {
  isRevealed: boolean;
  timeUntilReveal: number;
  isEnded: boolean;
}

export const SpeakerCarousel: React.FC<SpeakerCarouselProps> = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speakerStates, setSpeakerStates] = useState<{ [key: string]: SpeakerState }>({});
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

  const updateSpeakerStates = useCallback(() => {
    const now = Date.now();
    const newStates: { [key: string]: SpeakerState } = {};

    eventoConfig.datasESessoes.forEach(sessao => {
      const startTime = parseISOInTimezone(sessao.inicioISO).getTime();
      const endTime = parseISOInTimezone(sessao.fimISO).getTime();
      const revealTime = startTime - (60 * 60 * 1000); // 60 minutes before

      newStates[sessao.idSessao] = {
        isRevealed: now >= revealTime,
        timeUntilReveal: Math.max(0, revealTime - now),
        isEnded: now >= endTime
      };
    });

    setSpeakerStates(newStates);
  }, []);

  const preloadImages = useCallback(() => {
    const now = Date.now();
    const newPreloaded = new Set(preloadedImages);

    eventoConfig.datasESessoes.forEach(sessao => {
      const startTime = parseISOInTimezone(sessao.inicioISO).getTime();
      const preloadTime = startTime - (2 * 60 * 60 * 1000); // 2 hours before

      if (now >= preloadTime && !preloadedImages.has(sessao.imagemReal)) {
        const img = new Image();
        img.src = sessao.imagemReal;
        img.onload = () => {
          newPreloaded.add(sessao.imagemReal);
          setPreloadedImages(new Set(newPreloaded));
        };
      }
    });
  }, [preloadedImages]);

  useEffect(() => {
    updateSpeakerStates();
    preloadImages();

    const interval = setInterval(() => {
      updateSpeakerStates();
      preloadImages();
    }, 1000);

    return () => clearInterval(interval);
  }, [updateSpeakerStates, preloadImages]);

  const handlePrevious = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : eventoConfig.datasESessoes.length - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev < eventoConfig.datasESessoes.length - 1 ? prev + 1 : 0);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    handleCarouselKeyNavigation(
      event,
      currentIndex,
      eventoConfig.datasESessoes.length,
      setCurrentIndex
    );
  };

  const handleAddToCalendar = (sessao: typeof eventoConfig.datasESessoes[0], type: 'ics' | 'google') => {
    const startDate = parseISOInTimezone(sessao.inicioISO);
    const endDate = parseISOInTimezone(sessao.fimISO);
    const title = `Salto No Hype - ${sessao.pregador}`;
    const description = sessao.descricaoCurta;
    const location = `${eventoConfig.local.nome}, ${eventoConfig.local.endereco}`;

    if (type === 'ics') {
      const icsContent = generateICS(title, startDate, endDate, description, location);
      downloadICS(icsContent, `salto-${sessao.idSessao}.ics`);
    } else {
      const googleUrl = generateGoogleCalendarLink(title, startDate, endDate, description, location);
      window.open(googleUrl, '_blank');
    }
  };

  const currentSessao = eventoConfig.datasESessoes[currentIndex];
  const currentState = speakerStates[currentSessao?.idSessao];

  return (
    <section id="pregadores" className={`speaker-carousel ${className}`}>
      <div className="container">
        <div className="speaker-carousel__header">
          <h2 className="speaker-carousel__title">
            Nossos <span className="speaker-carousel__title-highlight">Pregadores</span>
          </h2>
          <p className="speaker-carousel__subtitle">
            Sete sessões com ministros focados na essência do evangelho.
            <br />
            <strong>Pregadores revelados 60 minutos antes de cada sessão.</strong>
          </p>
        </div>

        <div 
          className="speaker-carousel__container"
          role="region"
          aria-label="Carrossel de pregadores"
          onKeyDown={handleKeyDown as any}
          tabIndex={0}
        >
          <div className="speaker-carousel__content">
            {eventoConfig.datasESessoes.map((sessao, index) => {
              const state = speakerStates[sessao.idSessao];
              const isActive = index === currentIndex;
              
              return (
                <div
                  key={sessao.idSessao}
                  className={`speaker-carousel__slide ${isActive ? 'speaker-carousel__slide--active' : ''}`}
                  aria-hidden={!isActive}
                >
                  <div className="speaker-carousel__card">
                    <div className="speaker-carousel__image-container">
                      <img
                        src={state?.isRevealed ? sessao.imagemReal : sessao.imagemSilhueta}
                        alt={state?.isRevealed ? `Foto de ${sessao.pregador}` : 'Pregador será revelado em breve'}
                        className={`speaker-carousel__image ${state?.isRevealed ? 'speaker-carousel__image--revealed' : ''}`}
                        loading={isActive ? 'eager' : 'lazy'}
                      />
                      
                      {!state?.isRevealed && state?.timeUntilReveal > 0 && (
                        <div className="speaker-carousel__countdown">
                          <span className="speaker-carousel__countdown-label">Revela em:</span>
                          <span className="speaker-carousel__countdown-time">
                            {formatDuration(state.timeUntilReveal)}
                          </span>
                        </div>
                      )}

                      {state?.isEnded && (
                        <div className="speaker-carousel__status">
                          <span className="speaker-carousel__status-text">Encerrado</span>
                        </div>
                      )}
                    </div>

                    <div className="speaker-carousel__info">
                      <h3 className="speaker-carousel__speaker-name">
                        {state?.isRevealed ? sessao.pregador : 'Pregador Surpresa'}
                      </h3>
                      
                      <div className="speaker-carousel__session-info">
                        <div className="speaker-carousel__date">
                          <span className="speaker-carousel__day">
                            {sessao.dia === 'sexta' ? 'Sexta-feira' :
                             sessao.dia === 'sabado' ? 'Sábado' : 'Domingo'}
                          </span>
                          <span className="speaker-carousel__time">
                            {new Date(sessao.inicioISO).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>

                      <p className="speaker-carousel__description">
                        {sessao.descricaoCurta}
                      </p>

                      <div className="speaker-carousel__actions">
                        <div className="speaker-carousel__calendar-actions">
                          <button
                            onClick={() => handleAddToCalendar(sessao, 'ics')}
                            className="speaker-carousel__calendar-btn"
                            aria-label={`Adicionar sessão de ${sessao.pregador} ao calendário`}
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M14 2H12V1C12 0.4 11.6 0 11 0C10.4 0 10 0.4 10 1V2H6V1C6 0.4 5.6 0 5 0C4.4 0 4 0.4 4 1V2H2C0.9 2 0 2.9 0 4V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V4C16 2.9 15.1 2 14 2ZM14 14H2V7H14V14Z"
                                fill="currentColor"
                              />
                            </svg>
                            Lembrete
                          </button>
                          
                          <button
                            onClick={() => handleAddToCalendar(sessao, 'google')}
                            className="speaker-carousel__calendar-btn speaker-carousel__calendar-btn--google"
                            aria-label={`Adicionar sessão de ${sessao.pregador} ao Google Calendar`}
                          >
                            Google
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="speaker-carousel__controls">
            <button
              onClick={handlePrevious}
              className="speaker-carousel__control speaker-carousel__control--prev"
              aria-label="Pregador anterior"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="speaker-carousel__control speaker-carousel__control--next"
              aria-label="Próximo pregador"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="speaker-carousel__indicators">
            {eventoConfig.datasESessoes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`speaker-carousel__indicator ${index === currentIndex ? 'speaker-carousel__indicator--active' : ''}`}
                aria-label={`Ir para pregador ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Add All Sessions */}
        <div className="speaker-carousel__add-all">
          <button
            onClick={() => {
              // Generate ICS for all sessions
              let allICS = '';
              eventoConfig.datasESessoes.forEach(sessao => {
                const startDate = parseISOInTimezone(sessao.inicioISO);
                const endDate = parseISOInTimezone(sessao.fimISO);
                const title = `Salto No Hype - ${sessao.pregador}`;
                const description = sessao.descricaoCurta;
                const location = `${eventoConfig.local.nome}, ${eventoConfig.local.endereco}`;
                
                if (allICS) allICS += '\n';
                allICS += generateICS(title, startDate, endDate, description, location);
              });
              
              downloadICS(allICS, 'salto-no-hype-completo.ics');
            }}
            className="speaker-carousel__add-all-btn"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M17.5 5H15V3.75C15 3.3 14.7 3 14.25 3C13.8 3 13.5 3.3 13.5 3.75V5H6.5V3.75C6.5 3.3 6.2 3 5.75 3C5.3 3 5 3.3 5 3.75V5H2.5C1.1 5 0 6.1 0 7.5V17.5C0 18.9 1.1 20 2.5 20H17.5C18.9 20 20 18.9 20 17.5V7.5C20 6.1 18.9 5 17.5 5ZM17.5 17.5H2.5V10H17.5V17.5Z"
                fill="currentColor"
              />
            </svg>
            Adicionar todas as sessões ao calendário
          </button>
        </div>
      </div>
    </section>
  );
};
