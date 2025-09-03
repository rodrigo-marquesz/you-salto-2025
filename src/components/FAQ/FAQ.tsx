// src/components/FAQ/FAQ.tsx
import React from 'react';
import { eventoConfig } from '../../config/evento';
import './FAQ.css';

export const FAQ: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <section id="faq" className={`faq-section ${className}`}>
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">
            Dúvidas <span className="faq-accent">Frequentes</span>
          </h2>
        </div>

        <div className="faq-list">
          {eventoConfig.faq.map((item) => (
            <details key={item.id} className="faq-item">
              <summary className="faq-question">
                {item.pergunta}
              </summary>
              <div className="faq-answer">
                <p>{item.resposta}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};