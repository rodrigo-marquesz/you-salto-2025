import React from 'react';
import { faqData } from '../../config/evento';
import './FAQ.css';

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="faq">
      <div className="container">
        <div className="faq__header">
          <h2 className="faq__title">
            Dúvidas <span className="faq__title-highlight">Frequentes</span>
          </h2>
        </div>

        <div className="faq__list">
          {faqData.map((item) => (
            <details key={item.id} className="faq__item">
              <summary className="faq__question">
                {item.pergunta}
              </summary>
              <div className="faq__answer">
                <p>{item.resposta}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};