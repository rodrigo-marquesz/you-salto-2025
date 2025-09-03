import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-text">SALTO</span>
              <span className="footer__logo-subtitle">NO HYPE</span>
            </div>
            <p className="footer__tagline">
              Uma experiência autêntica onde a fé encontra a vida real.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__section">
              <h3 className="footer__section-title">Evento</h3>
              <ul className="footer__section-list">
                <li><a href="#programacao">Programação</a></li>
                <li><a href="#ingressos">Ingressos</a></li>
                <li><a href="#loja">Loja</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            <div className="footer__section">
              <h3 className="footer__section-title">Contato</h3>
              <ul className="footer__section-list">
                <li><a href="#">WhatsApp</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Regulamento</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2024 Salto No Hype. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};