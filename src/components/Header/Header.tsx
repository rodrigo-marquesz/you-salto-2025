import React, { useState, useEffect } from 'react';
import './Header.css';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''} ${className}`}>
      <div className="container">
        <div className="header__content">
          {/* Logo */}
          <div className="header__logo">
            <button
              onClick={() => scrollToSection('hero')}
              className="header__logo-button"
              aria-label="Voltar ao início"
            >
              <span className="header__logo-text">SALTO</span>
              <span className="header__logo-subtitle">NO HYPE</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="header__nav" aria-label="Navegação principal">
            <ul className="header__nav-list">
              <li>
                <button
                  onClick={() => scrollToSection('pregadores')}
                  className="header__nav-link"
                >
                  Pregadores
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('programacao')}
                  className="header__nav-link"
                >
                  Programação
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('ingressos')}
                  className="header__nav-link"
                >
                  Ingressos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('loja')}
                  className="header__nav-link"
                >
                  Loja
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="header__nav-link"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="header__cta">
            <button
              onClick={() => scrollToSection('ingressos')}
              className="header__cta-button"
            >
              Comprar Ingresso
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`header__mobile-toggle ${isMobileMenuOpen ? 'header__mobile-toggle--open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="header__mobile-toggle-line"></span>
            <span className="header__mobile-toggle-line"></span>
            <span className="header__mobile-toggle-line"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <nav
          className={`header__mobile-nav ${isMobileMenuOpen ? 'header__mobile-nav--open' : ''}`}
          aria-label="Menu mobile"
        >
          <ul className="header__mobile-nav-list">
            <li>
              <button
                onClick={() => scrollToSection('pregadores')}
                className="header__mobile-nav-link"
              >
                Pregadores
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('programacao')}
                className="header__mobile-nav-link"
              >
                Programação
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('ingressos')}
                className="header__mobile-nav-link"
              >
                Ingressos
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('loja')}
                className="header__mobile-nav-link"
              >
                Loja
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('faq')}
                className="header__mobile-nav-link"
              >
                FAQ
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('ingressos')}
                className="header__mobile-nav-cta"
              >
                Comprar Ingresso
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};