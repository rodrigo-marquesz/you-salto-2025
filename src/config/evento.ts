// src/config/evento.ts
export interface Produto {
  id: string;
  nome: string;
  preco: number;
  imagem: string;
  linkCompra?: string;
}

export interface Sessao {
  idSessao: string;
  pregador?: string;
  imagem?: string;
  inicioISO: string;
  fimISO: string;
  descricaoCurta?: string;
  dia?: 'sexta' | 'sabado' | 'domingo';
}

export interface IngressoConfig {
  preco: number;
  precoPrevenda?: number;
  loteAtual: string;
  beneficios: string[];
}

export interface FAQItem {
  id: number;
  pergunta: string;
  resposta: string;
}

export interface ConfigEvento {
  timezoneDoEvento: string;
  datasESessoes: Sessao[];
  links: {
    ingressos: string;
  };
  ingressos: IngressoConfig;
  local: {
    nome: string;
    endereco: string;
    cidade: string;
  };
  produtos: Produto[];
  faq: FAQItem[];
}

export const eventoConfig: ConfigEvento = {
  timezoneDoEvento: "America/Sao_Paulo",
  
  datasESessoes: [
    // João Heuldes - imagem real
    {
      idSessao: 's1',
      pregador: 'João Heuldes',
      imagem: 'joao_heuldes.png',
      inicioISO: '2025-11-14T19:00:00Z',
      fimISO: '2025-11-14T20:00:00Z'
    },
    
    // Slots misteriosos - apenas placeholder
    {
      idSessao: 's2',
      pregador: '', // Vazio = slot misterioso
      imagem: 'pregador_1_placeholder.png',
      inicioISO: '2025-11-15T19:00:00Z',
      fimISO: '2025-11-15T20:00:00Z'
    },
    {
      idSessao: 's3',
      pregador: '', // Vazio = slot misterioso
      imagem: 'pregador_2_placeholder.png',
      inicioISO: '2025-11-16T19:00:00Z',
      fimISO: '2025-11-16T20:00:00Z'
    }
  ],
  
  links: {
    ingressos: "https://youministerio.hotmart.host/conf2025",
  },

  ingressos: {
    preco: 150,
    precoPrevenda: 120,
    loteAtual: "2º Lote",
    beneficios: [
      "Acesso a todas as sessões",
      "Material de apoio digital",
      "Coffee break incluso",
      "Área de networking",
      "Certificado de participação"
    ]
  },

  local: {
    nome: "Centro de Convenções São Paulo",
    endereco: "Rua das Convenções, 1000 - Vila Olímpia",
    cidade: "São Paulo - SP"
  },

  produtos: [
    {
      id: "camiseta-salto",
      nome: "Camiseta Salto No Hype",
      preco: 45,
      imagem: "camiseta_salto.png",
      linkCompra: "#"
    },
    {
      id: "livro-fe-sem-hype",
      nome: "Livro: Fé Sem Hype",
      preco: 35,
      imagem: "livro_fe_sem_hype.png",
      linkCompra: "#"
    },
    {
      id: "caneca-salto",
      nome: "Caneca Salto 2024",
      preco: 25,
      imagem: "caneca_salto.png",
      linkCompra: "#"
    }
  ],

  faq: [
    {
      id: 1,
      pergunta: "Como funciona o reembolso?",
      resposta: "Reembolso integral até 7 dias antes do evento. Até 3 dias antes: 50% do valor. Transferência de ingresso até 48h antes."
    },
    {
      id: 2,
      pergunta: "O ingresso é digital?",
      resposta: "Sim! Você receberá o ingresso por email após a compra. Pode ser apresentado no celular ou impresso."
    },
    {
      id: 3,
      pergunta: "Crianças pagam ingresso?",
      resposta: "Crianças até 12 anos não pagam ingresso. Teremos espaço kids com atividades supervisionadas durante as sessões."
    },
    {
      id: 4,
      pergunta: "Tem estacionamento no local?",
      resposta: "Sim, o local possui estacionamento pago. Recomendamos também o uso de transporte público devido à localização central."
    },
    {
      id: 5,
      pergunta: "Haverá transmissão online?",
      resposta: "Algumas sessões serão transmitidas ao vivo em nossas redes sociais, mas a experiência completa é presencial."
    },
    {
      id: 6,
      pergunta: "Que tipo de alimentação estará disponível?",
      resposta: "Teremos praça de alimentação com lanches, refeições e bebidas. Coffee break está incluso no ingresso."
    }
  ]
};
