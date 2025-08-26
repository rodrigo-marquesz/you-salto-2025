import React from 'react';
import './Hero.css';

interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={`hero ${className}`}>
      <div className="hero__background">
        <div className="hero__gradient"></div>
        <div className="hero__shapes">
          <div className="hero__shape hero__shape--1"></div>
          <div className="hero__shape hero__shape--2"></div>
          <div className="hero__shape hero__shape--3"></div>
        </div>
      </div>

      <div className="container">
        <div className="hero__content">
          <div className="hero__text">
            <h1 className="hero__title">
              <span className="hero__title-main">SALTO</span>
              <span className="hero__title-theme">NO HYPE</span>
            </h1>
            
            <p className="hero__subtitle">
              Uma experiência autêntica onde a fé encontra a vida real.
              <br />
              Três dias focados em Cristo, sem artificialismo.
            </p>

            <div className="hero__info">
              <div className="hero__info-item">
                <span className="hero__info-label">Data</span>
                <span className="hero__info-value">19, 20 e 21 Set</span>
              </div>
              <div className="hero__info-item">
                <span className="hero__info-label">Local</span>
                <span className="hero__info-value">São Paulo - SP</span>
              </div>
              <div className="hero__info-item">
                <span className="hero__info-label">Sessões</span>
                <span className="hero__info-value">7 encontros</span>
              </div>
            </div>

            <div className="hero__actions">
              <button
                onClick={() => scrollToSection('ingressos')}
                className="hero__cta-primary"
              >
                Comprar Ingresso
                <span className="hero__cta-price">R$ 150</span>
              </button>
              
              <button
                onClick={() => scrollToSection('programacao')}
                className="hero__cta-secondary"
              >
                Ver Programação
              </button>
            </div>

            <div className="hero__badges">
              <div className="hero__badge">
                <span className="hero__badge-text">2º Lote</span>
              </div>
              <div className="hero__badge hero__badge--highlight">
                <span className="hero__badge-text">Últimas Vagas</span>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__image-container">
              <div className="hero__image-background"></div>
              <div className="hero__image-content">
                <div className="hero__logo-large">
                  <span className="hero__logo-text">SALTO</span>
                  <span className="hero__logo-year">2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll-indicator">
        <button
          onClick={() => scrollToSection('pregadores')}
          className="hero__scroll-button"
          aria-label="Ver pregadores"
        >
          <span className="hero__scroll-text">Descobrir</span>
          <div className="hero__scroll-arrow">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M6 8L10 12L14 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>
    </section>
  );
};