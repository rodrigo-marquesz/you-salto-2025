import React, { useState } from 'react';
import { eventoConfig } from '../../config/evento';
import { formatTime, parseISOInTimezone, generateICS, downloadICS } from '../../utils/datetime';
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

  const handleAddAllToCalendar = () => {
    let allICS = '';
    eventoConfig.datasESessoes.forEach((sessao, index) => {
      const startDate = parseISOInTimezone(sessao.inicioISO);
      const endDate = parseISOInTimezone(sessao.fimISO);
      const title = `Salto No Hype - ${sessao.pregador}`;
      const description = sessao.descricaoCurta;
      const location = `${eventoConfig.local.nome}, ${eventoConfig.local.endereco}`;
      
      if (index > 0) allICS += '\n';
      allICS += generateICS(title, startDate, endDate, description, location);
    });
    
    downloadICS(allICS, 'salto-no-hype-programacao-completa.ics');
  };

  const getDayName = (dia: string) => {
    switch (dia) {
      case 'sexta': return 'Sexta-feira';
      case 'sabado': return 'Sábado';
      case 'domingo': return 'Domingo';
      default: return dia;
    }
  };

  const getDayDate = (dia: string) => {
    switch (dia) {
      case 'sexta': return '19 Set';
      case 'sabado': return '20 Set';
      case 'domingo': return '21 Set';
      default: return '';
    }
  };

  return (
    <section id="programacao" className={`schedule ${className}`}>
      <div className="container">
        <div className="schedule__header">
          <h2 className="schedule__title">
            Nossa <span className="schedule__title-highlight">Programação</span>
          </h2>
          <p className="schedule__subtitle">
            Três dias de experiência autêntica distribuídos em 7 sessões especiais.
            <br />
            Cada momento pensado para uma conexão real com Cristo.
          </p>
        </div>

        <div className="schedule__filters">
          <button
            onClick={() => setActiveDay('todos')}
            className={`schedule__filter ${activeDay === 'todos' ? 'schedule__filter--active' : ''}`}
          >
            Todos os Dias
          </button>
          <button
            onClick={() => setActiveDay('sexta')}
            className={`schedule__filter ${activeDay === 'sexta' ? 'schedule__filter--active' : ''}`}
          >
            Sexta (19)
          </button>
          <button
            onClick={() => setActiveDay('sabado')}
            className={`schedule__filter ${activeDay === 'sabado' ? 'schedule__filter--active' : ''}`}
          >
            Sábado (20)
          </button>
          <button
            onClick={() => setActiveDay('domingo')}
            className={`schedule__filter ${activeDay === 'domingo' ? 'schedule__filter--active' : ''}`}
          >
            Domingo (21)
          </button>
        </div>

        <div className="schedule__timeline">
          {filteredSessions.map((sessao, index) => {
            const startTime = parseISOInTimezone(sessao.inicioISO);
            const endTime = parseISOInTimezone(sessao.fimISO);
            const isFirstOfDay = index === 0 || filteredSessions[index - 1].dia !== sessao.dia;
            
            return (
              <div key={sessao.idSessao} className="schedule__session-group">
                {isFirstOfDay && (
                  <div className="schedule__day-header">
                    <div className="schedule__day-info">
                      <h3 className="schedule__day-name">{getDayName(sessao.dia)}</h3>
                      <span className="schedule__day-date">{getDayDate(sessao.dia)}</span>
                    </div>
                  </div>
                )}
                
                <div className="schedule__session">
                  <div className="schedule__session-time">
                    <div className="schedule__time-badge">
                      <span className="schedule__start-time">{formatTime(startTime)}</span>
                      <span className="schedule__end-time">{formatTime(endTime)}</span>
                    </div>
                  </div>

                  <div className="schedule__session-content">
                    <div className="schedule__session-card">
                      <div className="schedule__session-header">
                        <h4 className="schedule__session-title">
                          {sessao.pregador}
                        </h4>
                        <div className="schedule__session-badges">
                          <span className="schedule__session-type">
                            {sessao.dia === 'sexta' ? 'Abertura' :
                             sessao.dia === 'domingo' && index === filteredSessions.length - 1 ? 'Encerramento' :
                             'Ministração'}
                          </span>
                        </div>
                      </div>

                      <p className="schedule__session-description">
                        {sessao.descricaoCurta}
                      </p>

                      <div className="schedule__session-details">
                        <div className="schedule__session-info">
                          <div className="schedule__info-item">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"
                                fill="currentColor"
                              />
                              <path
                                d="M8 4v4l3 2 1-1.5L10 7V4z"
                                fill="currentColor"
                              />
                            </svg>
                            <span>
                              {Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60))} min
                            </span>
                          </div>
                          
                          <div className="schedule__info-item">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M8 0C5.8 0 4 1.8 4 4c0 2.2 4 8 4 8s4-5.8 4-8c0-2.2-1.8-4-4-4zm0 6c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2-0.9 2-2 2z"
                                fill="currentColor"
                              />
                            </svg>
                            <span>Auditório Principal</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            const title = `Salto No Hype - ${sessao.pregador}`;
                            const description = sessao.descricaoCurta;
                            const location = `${eventoConfig.local.nome}, ${eventoConfig.local.endereco}`;
                            
                            const icsContent = generateICS(title, startTime, endTime, description, location);
                            downloadICS(icsContent, `salto-${sessao.idSessao}.ics`);
                          }}
                          className="schedule__add-calendar"
                          aria-label={`Adicionar sessão de ${sessao.pregador} ao calendário`}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M14 2H12V1C12 0.4 11.6 0 11 0C10.4 0 10 0.4 10 1V2H6V1C6 0.4 5.6 0 5 0C4.4 0 4 0.4 4 1V2H2C0.9 2 0 2.9 0 4V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V4C16 2.9 15.1 2 14 2ZM14 14H2V7H14V14Z"
                              fill="currentColor"
                            />
                            <path d="M8 9H9V12H8V9Z" fill="currentColor"/>
                            <path d="M8 9H11V10H8V9Z" fill="currentColor"/>
                          </svg>
                          Lembrete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="schedule__actions">
          <button
            onClick={handleAddAllToCalendar}
            className="schedule__add-all-btn"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M17.5 5H15V3.75C15 3.3 14.7 3 14.25 3C13.8 3 13.5 3.3 13.5 3.75V5H6.5V3.75C6.5 3.3 6.2 3 5.75 3C5.3 3 5 3.3 5 3.75V5H2.5C1.1 5 0 6.1 0 7.5V17.5C0 18.9 1.1 20 2.5 20H17.5C18.9 20 20 18.9 20 17.5V7.5C20 6.1 18.9 5 17.5 5ZM17.5 17.5H2.5V10H17.5V17.5Z"
                fill="currentColor"
              />
            </svg>
            Baixar programação completa
          </button>
        </div>

        <div className="schedule__info-cards">
          <div className="schedule__info-card">
            <div className="schedule__info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 9.5V11.5L21 9ZM18 14H21V16H18V21H16V16H13L15.5 10H18V14ZM8 10C9.1 10 10 10.9 10 12S8.9 14 8 14 6 13.1 6 12 6.9 10 8 10ZM8 16C10.7 16 13 17.3 13 19V21H3V19C3 17.3 5.3 16 8 16Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h3 className="schedule__info-title">Música & Louvor</h3>
            <p className="schedule__info-description">
              Cada sessão inclui momentos especiais de louvor e adoração com músicos locais.
            </p>
          </div>

          <div className="schedule__info-card">
            <div className="schedule__info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 18C5.9 18 5 17.1 5 16S5.9 14 7 14 9 14.9 9 16 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5H5.21L4.27 3H1ZM17 18C15.9 18 15 17.1 15 16S15.9 14 17 14 19 14.9 19 16 18.1 18 17 18Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h3 className="schedule__info-title">Praça de Alimentação</h3>
            <p className="schedule__info-description">
              Lanches, refeições e bebidas disponíveis no local. Coffee break incluso no ingresso.
            </p>
          </div>

          <div className="schedule__info-card">
            <div className="schedule__info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h3 className="schedule__info-title">Espaço Kids</h3>
            <p className="schedule__info-description">
              Atividades supervisionadas para crianças durante as sessões principais.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};