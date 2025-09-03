// src/components/Merch/Merch.tsx
import React from 'react';
import { eventoConfig } from '../../config/evento';
import './Merch.css';

export const Merch: React.FC<{ className?: string }> = ({ className = '' }) => {
  const handleBuyClick = (linkCompra?: string) => {
    if (linkCompra && linkCompra !== '#') {
      window.open(linkCompra, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="loja" className={`merch-section ${className}`}>
      <div className="merch-container">
        <div className="merch-header">
          <h2 className="merch-title">
            Nossa <span className="merch-accent">Loja</span>
          </h2>
          <p className="merch-subtitle">
            Leve uma lembrança especial do Salto No Hype
          </p>
        </div>

        <div className="merch-grid">
          {eventoConfig.produtos.map((produto) => (
            <div key={produto.id} className="merch-item">
              <div className="merch-image">
                <img 
                  src={produto.imagem} 
                  alt={produto.nome} 
                  loading="lazy" 
                  
                />
              </div>
              <div className="merch-info">
                <h3 className="merch-name">{produto.nome}</h3>
                <span className="merch-price">R$ {produto.preco}</span>
                <button 
                  className="merch-buy-btn"
                  onClick={() => handleBuyClick(produto.linkCompra)}
                  disabled={!produto.linkCompra || produto.linkCompra === '#'}
                >
                  {produto.linkCompra && produto.linkCompra !== '#' ? 'Comprar' : 'Em breve'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};