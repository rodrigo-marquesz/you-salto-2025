// src/components/Tickets/Tickets.tsx
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
    // Lógica simples de cupom
    console.log('Aplicando cupom:', couponCode);
    setCouponCode('');
    setShowCouponField(false);
  };

  return (
    <section id="ingressos" className={`tickets-section ${className}`}>
      <div className="tickets-container">
        <div className="tickets-header">
          <h2 className="tickets-title">
            Garanta seu <span className="tickets-accent">Ingresso</span>
          </h2>
          <p className="tickets-subtitle">
            Três dias de experiência autêntica com Cristo
          </p>
        </div>

        <div className="tickets-content">
          <div className="tickets-card">
            <div className="tickets-card-header">
              <div className="tickets-badge">
                {eventoConfig.ingressos.loteAtual}
              </div>
              <div className="tickets-urgency">
                Últimas Vagas
              </div>
            </div>

            <div className="tickets-pricing">
              {eventoConfig.ingressos.precoPrevenda && (
                <div className="tickets-price-old">
                  <span>De: R$ {eventoConfig.ingressos.precoPrevenda}</span>
                </div>
              )}
              <div className="tickets-price-current">
                <span>Por: R$ {eventoConfig.ingressos.preco}</span>
              </div>
            </div>

            <div className="tickets-benefits">
              <h3 className="tickets-benefits-title">O que está incluso:</h3>
              <ul className="tickets-benefits-list">
                {eventoConfig.ingressos.beneficios.map((beneficio, index) => (
                  <li key={index} className="tickets-benefits-item">
                    <span className="tickets-benefits-check">✓</span>
                    {beneficio}
                  </li>
                ))}
              </ul>
            </div>

            <div className="tickets-actions">
              <button
                onClick={handleBuyTicket}
                className="tickets-buy-btn"
              >
                Comprar Agora - R$ {eventoConfig.ingressos.preco}
              </button>

              <button
                onClick={() => setShowCouponField(!showCouponField)}
                className="tickets-coupon-btn"
              >
                Tenho um cupom
              </button>

              {showCouponField && (
                <form onSubmit={handleApplyCoupon} className="tickets-coupon-form">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Digite seu cupom"
                    className="tickets-coupon-input"
                  />
                  <button
                    type="submit"
                    className="tickets-coupon-apply"
                    disabled={!couponCode.trim()}
                  >
                    Aplicar
                  </button>
                </form>
              )}
            </div>

            <div className="tickets-security">
              <div className="tickets-security-item">
                <span className="tickets-security-icon">🔒</span>
                Compra Segura
              </div>
              <div className="tickets-security-item">
                <span className="tickets-security-icon">📧</span>
                Ingresso Digital
              </div>
            </div>
          </div>

          <div className="tickets-faq">
            <h3 className="tickets-faq-title">Dúvidas Frequentes</h3>
            <div className="tickets-faq-content">
              <div className="tickets-faq-item">
                <h4>Como funciona o reembolso?</h4>
                <p>Reembolso integral até 7 dias antes do evento. Até 3 dias antes: 50% do valor.</p>
              </div>
              <div className="tickets-faq-item">
                <h4>O ingresso é digital?</h4>
                <p>Sim! Você receberá por email e pode apresentar no celular ou impresso.</p>
              </div>
              <div className="tickets-faq-item">
                <h4>Crianças pagam ingresso?</h4>
                <p>Crianças até 12 anos não pagam. Temos espaço kids com atividades.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="tickets-testimonials">
          <h3 className="tickets-testimonials-title">O que dizem sobre o Salto</h3>
          <div className="tickets-testimonials-grid">
            <div className="tickets-testimonial">
              <p>"Uma experiência que mudou minha vida. Saí de lá com uma fé mais genuína."</p>
              <div className="tickets-testimonial-author">
                <strong>Marina Silva</strong>
                <span>Participante 2023</span>
              </div>
            </div>
            <div className="tickets-testimonial">
              <p>"Três dias intensos focados no que realmente importa: nossa relação com Cristo."</p>
              <div className="tickets-testimonial-author">
                <strong>Carlos Santos</strong>
                <span>Participante 2023</span>
              </div>
            </div>
            <div className="tickets-testimonial">
              <p>"Sem frescura, sem show. Só Jesus e uma comunidade real buscando crescer na fé."</p>
              <div className="tickets-testimonial-author">
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