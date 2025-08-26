/**
 * Utilitários para acessibilidade
 */

/**
 * Gera IDs únicos para elementos de formulário
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Gerencia foco para modais e overlays
 */
export class FocusTrap {
  private focusableElements: HTMLElement[] = [];
  private firstElement: HTMLElement | null = null;
  private lastElement: HTMLElement | null = null;
  private previousActiveElement: HTMLElement | null = null;

  constructor(private container: HTMLElement) {
    this.updateFocusableElements();
  }

  private updateFocusableElements(): void {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable]'
    ].join(', ');

    this.focusableElements = Array.from(
      this.container.querySelectorAll(focusableSelectors)
    ) as HTMLElement[];

    this.firstElement = this.focusableElements[0] || null;
    this.lastElement = this.focusableElements[this.focusableElements.length - 1] || null;
  }

  public activate(): void {
    this.previousActiveElement = document.activeElement as HTMLElement;
    
    if (this.firstElement) {
      this.firstElement.focus();
    }

    document.addEventListener('keydown', this.handleKeyDown);
  }

  public deactivate(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
    
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== 'Tab') return;

    if (this.focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === this.firstElement) {
        event.preventDefault();
        this.lastElement?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === this.lastElement) {
        event.preventDefault();
        this.firstElement?.focus();
      }
    }
  };
}

/**
 * Gerencia anúncios para leitores de tela
 */
export class ScreenReaderAnnouncer {
  private static instance: ScreenReaderAnnouncer;
  private liveRegion: HTMLElement;

  private constructor() {
    this.liveRegion = this.createLiveRegion();
  }

  static getInstance(): ScreenReaderAnnouncer {
    if (!ScreenReaderAnnouncer.instance) {
      ScreenReaderAnnouncer.instance = new ScreenReaderAnnouncer();
    }
    return ScreenReaderAnnouncer.instance;
  }

  private createLiveRegion(): HTMLElement {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
    return liveRegion;
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    this.liveRegion.setAttribute('aria-live', priority);
    this.liveRegion.textContent = message;

    // Limpa a mensagem após um tempo para permitir novos anúncios
    setTimeout(() => {
      this.liveRegion.textContent = '';
    }, 1000);
  }
}

/**
 * Verifica se um elemento está visível na tela
 */
export function isElementVisible(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);

  return (
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= viewHeight &&
    rect.left <= viewWidth
  );
}

/**
 * Scroll suave para um elemento com callback
 */
export function scrollToElement(
  element: HTMLElement | string,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' },
  callback?: () => void
): void {
  const targetElement = typeof element === 'string' 
    ? document.querySelector(element) as HTMLElement
    : element;

  if (!targetElement) return;

  targetElement.scrollIntoView(options);

  if (callback) {
    // Aguarda o scroll terminar antes de executar o callback
    setTimeout(callback, 500);
  }
}

/**
 * Gerencia foco ao navegar por teclado em carrosséis
 */
export function handleCarouselKeyNavigation(
  event: KeyboardEvent,
  currentIndex: number,
  totalItems: number,
  onIndexChange: (newIndex: number) => void
): void {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault();
      onIndexChange(currentIndex > 0 ? currentIndex - 1 : totalItems - 1);
      break;
    case 'ArrowRight':
      event.preventDefault();
      onIndexChange(currentIndex < totalItems - 1 ? currentIndex + 1 : 0);
      break;
    case 'Home':
      event.preventDefault();
      onIndexChange(0);
      break;
    case 'End':
      event.preventDefault();
      onIndexChange(totalItems - 1);
      break;
  }
}

/**
 * Valida contraste de cores para acessibilidade
 */
export function calculateContrastRatio(foreground: string, background: string): number {
  // Função simplificada - em produção usar biblioteca específica
  // Esta é uma implementação básica para referência
  
  function getLuminance(color: string): number {
    // Converter hex para RGB e calcular luminância
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }
  
  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Verifica se o contraste atende aos padrões WCAG
 */
export function meetsContrastRequirements(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  const ratio = calculateContrastRatio(foreground, background);
  
  if (level === 'AAA') {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7;
  } else {
    return size === 'large' ? ratio >= 3 : ratio >= 4.5;
  }
}
