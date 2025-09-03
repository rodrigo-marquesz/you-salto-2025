// src/components/Schedule/Schedule.tsx
import React, { useState } from 'react';
import { eventoConfig } from '../../config/evento';
import { formatTime, parseISOInTimezone } from '../../utils/datetime';
import './Schedule.css';

interface ScheduleProps {
  className?: string;
}

type DayFilter = 'todos' | 'sexta' | 'sabado' | 'domingo';

export const Schedule: React.FC<ScheduleProps> = ({ className = '' }) => {
  const [activeDay, setActiveDay] = useState<DayFilter>('todos');

  const filteredSessions = eventoConfig.datasESessoes.filter(sessao => 
    activeDay === 'todos' || sessao.dia === activeDay
  );

  const getDayName = (dia: string = '') => {
    switch (dia) {
      case 'sexta': return 'Sexta';
      case 'sabado': return 'Sábado';
      case 'domingo': return 'Domingo';
      default: return dia;
    }
  };

  const getDayDate = (dia: string = '') => {
    switch (dia) {
      case 'sexta': return '14/11';
      case 'sabado': return '15/11';
      case 'domingo': return '16/11';
      default: return '';
    }
  };

  const dayFilters: { id: DayFilter; label: string; date: string }[] = [
    { id: 'todos', label: 'Todos', date: '' },
    { id: 'sexta', label: 'Sexta', date: '14/11' },
    { id: 'sabado', label: 'Sábado', date: '15/11' },
    { id: 'domingo', label: 'Domingo', date: '16/11' }
  ];

  return (
    <section id="programacao" className={`schedule-section ${className}`}>
      <div className="schedule-container">
        <div className="schedule-header">
          <h2 className="schedule-title">
            Programação <span className="schedule-accent">Completa</span>
          </h2>
          <p className="schedule-subtitle">
            Três dias transformadores de experiência autêntica com Cristo
          </p>
        </div>

        {/* Filtros modernos estilo abas */}
        <div className="schedule-tabs">
          {dayFilters.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className={`schedule-tab ${activeDay === day.id ? 'schedule-tab--active' : ''}`}
            >
              <span className="schedule-tab-label">{day.label}</span>
              {day.date && <span className="schedule-tab-date">{day.date}</span>}
            </button>
          ))}
        </div>

        {/* Timeline moderna */}
        <div className="schedule-timeline">
          {filteredSessions.length === 0 ? (
            <div className="schedule-empty">
              <div className="schedule-empty-icon">📅</div>
              <h3 className="schedule-empty-title">Nenhuma sessão encontrada</h3>
              <p className="schedule-empty-text">Selecione um dia para ver a programação</p>
            </div>
          ) : (
            filteredSessions.map((sessao, index) => {
              const startTime = parseISOInTimezone(sessao.inicioISO);
              const endTime = parseISOInTimezone(sessao.fimISO);
              const isFirstOfDay = index === 0 || filteredSessions[index - 1].dia !== sessao.dia;
              
              return (
                <div key={sessao.idSessao} className="schedule-item">
                  {isFirstOfDay && sessao.dia && (
                    <div className="schedule-day-divider">
                      <span className="schedule-day-text">
                        {getDayName(sessao.dia)} • {getDayDate(sessao.dia)}
                      </span>
                    </div>
                  )}
                  
                  <div className="schedule-card">
                    <div className="schedule-time">
                      <div className="schedule-time-circle"></div>
                      <div className="schedule-time-content">
                        <span className="schedule-start">{formatTime(startTime)}</span>
                        <span className="schedule-duration">
                          {Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60))}min
                        </span>
                      </div>
                    </div>

                    <div className="schedule-content">
                      <div className="schedule-main">
                        <h3 className="schedule-speaker">
                          {sessao.pregador || 'Slot Misterioso'}
                        </h3>
                        {sessao.descricaoCurta && (
                          <p className="schedule-description">
                            {sessao.descricaoCurta}
                          </p>
                        )}
                      </div>

                      <div className="schedule-meta">
                        <div className="schedule-tags">
                          <span className="schedule-tag schedule-tag--location">
                            📍 Auditório Principal
                          </span>
                          <span className="schedule-tag schedule-tag--type">
                            {sessao.dia === 'sexta' ? '🎉 Abertura' :
                             sessao.dia === 'domingo' ? '🙏 Encerramento' :
                             '⚡ Ministração'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Cards informativos */}
        <div className="schedule-features">
          <div className="schedule-feature">
            <div className="schedule-feature-icon">🎵</div>
            <div className="schedule-feature-content">
              <h4>Momentos de Louvor</h4>
              <p>Experiências transformadoras de adoração em cada sessão</p>
            </div>
          </div>

          <div className="schedule-feature">
            <div className="schedule-feature-icon">☕</div>
            <div className="schedule-feature-content">
              <h4>Coffee Break</h4>
              <p>Lanches e bebidas inclusos para todos os participantes</p>
            </div>
          </div>

          <div className="schedule-feature">
            <div className="schedule-feature-icon">👶</div>
            <div className="schedule-feature-content">
              <h4>Espaço Kids</h4>
              <p>Programação especial para crianças durante as sessões</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};