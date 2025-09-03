import { eventoConfig } from '../config/evento';

/**
 * Obtém o timezone local do usuário com fallback para o timezone do evento
 */
export function getLocalTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return eventoConfig.timezoneDoEvento;
  }
}

/**
 * Converte uma string ISO para Date no timezone especificado
 */
export function parseISOInTimezone(isoString: string, timezone: string = getLocalTimezone()): Date {
  return new Date(isoString);
}

/**
 * Calcula o tempo restante em milissegundos até uma data específica
 */
export function getTimeUntil(targetDate: Date): number {
  return targetDate.getTime() - Date.now();
}

/**
 * Formata uma duração em milissegundos para formato HH:MM:SS
 */
export function formatDuration(ms: number): string {
  if (ms <= 0) return "00:00:00";
  
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Formata uma data para exibição (ex: "Sáb, 20 Set - 19:00")
 */
export function formatDateDisplay(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: getLocalTimezone()
  };
  
  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

/**
 * Formata apenas o horário (ex: "19:00")
 */
export function formatTime(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: getLocalTimezone()
  };
  
  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

/**
 * Gera arquivo .ics para adicionar evento ao calendário
 */
export function generateICS(title: string, startDate: Date, endDate: Date, description?: string, location?: string): string {
  const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Salto//No Hype Event//PT',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@salto-nohype.com`,
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    `SUMMARY:${title}`,
    description ? `DESCRIPTION:${description}` : '',
    location ? `LOCATION:${location}` : '',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(line => line).join('\r\n');

  return icsContent;
}

/**
 * Cria URL para download do arquivo .ics
 */
export function downloadICS(icsContent: string, filename: string = 'evento.ics'): void {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

/**
 * Gera link para Google Calendar
 */
export function generateGoogleCalendarLink(title: string, startDate: Date, endDate: Date, description?: string, location?: string): string {
  const formatGoogleDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
    details: description || '',
    location: location || ''
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Hook para criar um timer que atualiza a cada segundo
 */
export function useTimer(callback: () => void, delay: number = 1000): (() => void) | void {
  if (typeof window === 'undefined') return;
  
  const intervalId = setInterval(callback, delay);
  
  // Cleanup function
  return () => clearInterval(intervalId);
}
