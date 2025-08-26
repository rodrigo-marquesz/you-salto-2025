import React, { useState } from 'react';
import { eventoConfig } from '../../config/evento';
import './Tickets.css';

interface TicketsProps {
  className?: string;
}

export const Tickets: React.FC<TicketsProps> = ({ className = '' }) => {
  const [couponCode, setCouponCode] = useState('');
  const [showCouponField, setShowCouponField] = useState(false);

  const handleBuyTicket = () => {
    window.open(eventoConfig.links.ingressos, '_blank', 'noopener,noreferrer');
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for coupon validation logic
    console.log('Aplicando cupom:', couponCode);
  };

  return (
    <section id="ingressos" className={`tickets ${className}`}>
      <div className="container">
        <div className="tickets__header">
          <h2 className="tickets__title">
            Garanta seu <span className="tickets__title-highlight">Ingresso</span>
          </h2>
          <p className="tickets__subtitle">
            Três dias de experiência autêntica com Cristo.
            <br />
            Últimas vagas disponíveis!
          </p>
        </div>

        <div className="tickets__content">
          <div className="tickets__card">
            <div className="tickets__card-header">
              <div className="tickets__badge">
                <span className="tickets__badge-text">{eventoConfig.ingressos.loteAtual}</span>
              </div>
              <div className="tickets__urgency">
                <span className="tickets__urgency-text">🔥 Últimas Vagas</span>
              </div>
            </div>

            <div className="tickets__pricing">
              {eventoConfig.ingressos.precoPrevenda && (
                <div className="tickets__price-old">
                  <span className="tickets__price-label">Preço anterior:</span>
                  <span className="tickets__price-value">
                    R$ {eventoConfig.ingressos.precoPrevenda}
                  </span>
                </div>
              )}
              <div className="tickets__price-current">
                <span className="tickets__price-label">Preço atual:</span>
                <span className="tickets__price-value">
                  R$ {eventoConfig.ingressos.preco}
                </span>
              </div>
            </div>

            <div className="tickets__benefits">
              <h3 className="tickets__benefits-title">O que está incluso:</h3>
              <ul className="tickets__benefits-list">
                {eventoConfig.ingressos.beneficios.map((beneficio, index) => (
                  <li key={index} className="tickets__benefits-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="tickets__benefits-icon">
                      <path
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tickets__actions">
              <button
                onClick={handleBuyTicket}
                className="tickets__buy-button"
                aria-label="Comprar ingresso para o Salto No Hype"
              >
                <span className="tickets__buy-text">Comprar Agora</span>
                <span className="tickets__buy-price">R$ {eventoConfig.ingressos.preco}</span>
              </button>

              <button
                onClick={() => setShowCouponField(!showCouponField)}
                className="tickets__coupon-toggle"
                aria-expanded={showCouponField}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm4 9H9v3H7V9H4V7h3V4h2v3h3v2z"
                    fill="currentColor"
                  />
                </svg>
                Tenho um cupom
              </button>

              {showCouponField && (
                <form onSubmit={handleApplyCoupon} className="tickets__coupon-form">
                  <div className="tickets__coupon-field">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Digite seu cupom"
                      className="tickets__coupon-input"
                      aria-label="Código do cupom de desconto"
                    />
                    <button
                      type="submit"
                      className="tickets__coupon-apply"
                      disabled={!couponCode.trim()}
                    >
                      Aplicar
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="tickets__security">
              <div className="tickets__security-icons">
                <div className="tickets__security-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Compra Segura</span>
                </div>
                <div className="tickets__security-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Ingresso Digital</span>
                </div>
              </div>
            </div>
          </div>

          <div className="tickets__faq-quick">
            <h3 className="tickets__faq-title">Dúvidas Frequentes:</h3>
            <div className="tickets__faq-list">
              <details className="tickets__faq-item">
                <summary className="tickets__faq-question">
                  Como funciona o reembolso?
                </summary>
                <div className="tickets__faq-answer">
                  <p>
                    Reembolso integral até 7 dias antes do evento.
                    Até 3 dias antes: 50% do valor.
                    Transferência de ingresso até 48h antes.
                  </p>
                </div>
              </details>

              <details className="tickets__faq-item">
                <summary className="tickets__faq-question">
                  O ingresso é digital?
                </summary>
                <div className="tickets__faq-answer">
                  <p>
                    Sim! Você receberá o ingresso por email após a compra.
                    Pode ser apresentado no celular ou impresso.
                  </p>
                </div>
              </details>

              <details className="tickets__faq-item">
                <summary className="tickets__faq-question">
                  Crianças pagam ingresso?
                </summary>
                <div className="tickets__faq-answer">
                  <p>
                    Crianças até 12 anos não pagam ingresso.
                    Temos espaço kids com atividades supervisionadas.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>

        <div className="tickets__testimonials">
          <h3 className="tickets__testimonials-title">O que dizem sobre o Salto:</h3>
          <div className="tickets__testimonials-grid">
            <div className="tickets__testimonial">
              <div className="tickets__testimonial-content">
                <p>
                  "Uma experiência que mudou minha vida. Saí de lá com uma fé mais genuína e autêntica."
                </p>
              </div>
              <div className="tickets__testimonial-author">
                <strong>Marina Silva</strong>
                <span>Participante 2023</span>
              </div>
            </div>

            <div className="tickets__testimonial">
              <div className="tickets__testimonial-content">
                <p>
                  "Três dias intensos focados no que realmente importa: nossa relação com Cristo."
                </p>
              </div>
              <div className="tickets__testimonial-author">
                <strong>Carlos Santos</strong>
                <span>Participante 2023</span>
              </div>
            </div>

            <div className="tickets__testimonial">
              <div className="tickets__testimonial-content">
                <p>
                  "Sem frescura, sem show. Só Jesus e uma comunidade real buscando crescer na fé."
                </p>
              </div>
              <div className="tickets__testimonial-author">
                <strong>Ana Costa</strong>
                <span>Participante 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
