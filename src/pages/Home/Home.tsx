import React from 'react';
import { Header } from '../../components/Header/Header';
import { Hero } from '../../components/Hero/Hero';
import { SpeakerCarousel } from '../../components/SpeakerCarousel/SpeakerCarousel';
import { Tickets } from '../../components/Tickets/Tickets';
import { Schedule } from '../../components/Schedule/Schedule';
import { Merch } from '../../components/Merch/Merch';
import { FAQ } from '../../components/FAQ/FAQ';
import { Footer } from '../../components/Footer/Footer';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="home">
      <Header />
      <main className="home__main">
        <Hero />
        <SpeakerCarousel />
        <Tickets />
        <Schedule />
        <Merch />
        <FAQ />
      </main>
      <Footer />
      
      {/* Sticky CTA for Mobile */}
      <div className="home__sticky-cta">
        <button
          onClick={() => {
            const element = document.getElementById('ingressos');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="home__sticky-btn"
        >
          Comprar Ingresso - R$ 150
        </button>
      </div>
    </div>
  );
};