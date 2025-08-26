import React from 'react';
import { eventoConfig } from '../../config/evento';
import './Merch.css';

export const Merch: React.FC = () => {
  return (
    <section id="loja" className="merch">
      <div className="container">
        <div className="merch__header">
          <h2 className="merch__title">
            Nossa <span className="merch__title-highlight">Loja</span>
          </h2>
          <p className="merch__subtitle">
            Leve uma lembrança especial do Salto No Hype
          </p>
        </div>

        <div className="merch__grid">
          {eventoConfig.produtos.map((produto) => (
            <div key={produto.id} className="merch__item">
              <div className="merch__image">
                <img src={produto.imagem} alt={produto.nome} loading="lazy" />
              </div>
              <div className="merch__info">
                <h3 className="merch__name">{produto.nome}</h3>
                <span className="merch__price">R$ {produto.preco}</span>
                <button className="merch__buy-btn">
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};