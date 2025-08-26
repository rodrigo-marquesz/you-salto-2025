export interface SessaoEvento {
  idSessao: string;
  inicioISO: string;
  fimISO: string;
  pregador: string;
  imagemSilhueta: string;
  imagemReal: string;
  descricaoCurta: string;
  dia: 'sexta' | 'sabado' | 'domingo';
}

export interface ProdutoLoja {
  id: string;
  nome: string;
  tipo: 'camiseta' | 'livro' | 'outros';
  preco: number;
  imagem: string;
  linkCompra?: string;
}

export interface ConfigEvento {
  timezoneDoEvento: string;
  datasESessoes: SessaoEvento[];
  links: {
    ingressos: string;
    whatsapp: string;
    instagram: string;
    regulamento: string;
  };
  produtos: ProdutoLoja[];
  ingressos: {
    preco: number;
    precoPrevenda?: number;
    loteAtual: string;
    beneficios: string[];
  };
  local: {
    nome: string;
    endereco: string;
    cidade: string;
    mapEmbed?: string;
  };
}

export const eventoConfig: ConfigEvento = {
  timezoneDoEvento: "America/Sao_Paulo",
  
  datasESessoes: [
    // Sexta-feira
    {
      idSessao: "sexta-abertura",
      inicioISO: "2024-09-19T19:00:00-03:00",
      fimISO: "2024-09-19T21:30:00-03:00",
      pregador: "Pastor João Silva",
      imagemSilhueta: "/images/silhouettes/pastor-joao.jpg",
      imagemReal: "/images/speakers/pastor-joao.jpg",
      descricaoCurta: "Abertura com louvor e mensagem de boas-vindas ao Salto",
      dia: "sexta"
    },
    
    // Sábado
    {
      idSessao: "sabado-manha",
      inicioISO: "2024-09-20T09:00:00-03:00",
      fimISO: "2024-09-20T11:00:00-03:00",
      pregador: "Pastora Maria Santos",
      imagemSilhueta: "/images/silhouettes/pastora-maria.jpg",
      imagemReal: "/images/speakers/pastora-maria.jpg",
      descricaoCurta: "Voltando ao essencial: Cristo como centro",
      dia: "sabado"
    },
    {
      idSessao: "sabado-tarde",
      inicioISO: "2024-09-20T14:00:00-03:00",
      fimISO: "2024-09-20T16:30:00-03:00",
      pregador: "Pastor Carlos Mendes",
      imagemSilhueta: "/images/silhouettes/pastor-carlos.jpg",
      imagemReal: "/images/speakers/pastor-carlos.jpg",
      descricaoCurta: "Fé sem hype: autenticidade na vida cristã",
      dia: "sabado"
    },
    {
      idSessao: "sabado-noite",
      inicioISO: "2024-09-20T19:00:00-03:00",
      fimISO: "2024-09-20T21:30:00-03:00",
      pregador: "Pr. André Costa",
      imagemSilhueta: "/images/silhouettes/pastor-andre.jpg",
      imagemReal: "/images/speakers/pastor-andre.jpg",
      descricaoCurta: "Culto de celebração e adoração",
      dia: "sabado"
    },
    
    // Domingo
    {
      idSessao: "domingo-manha",
      inicioISO: "2024-09-21T09:00:00-03:00",
      fimISO: "2024-09-21T11:00:00-03:00",
      pregador: "Pastora Ana Oliveira",
      imagemSilhueta: "/images/silhouettes/pastora-ana.jpg",
      imagemReal: "/images/speakers/pastora-ana.jpg",
      descricaoCurta: "Comunidade real em tempos virtuais",
      dia: "domingo"
    },
    {
      idSessao: "domingo-tarde",
      inicioISO: "2024-09-21T14:00:00-03:00",
      fimISO: "2024-09-21T16:00:00-03:00",
      pregador: "Pastor Ricardo Lima",
      imagemSilhueta: "/images/silhouettes/pastor-ricardo.jpg",
      imagemReal: "/images/speakers/pastor-ricardo.jpg",
      descricaoCurta: "Servir com propósito e simplicidade",
      dia: "domingo"
    },
    {
      idSessao: "domingo-encerramento",
      inicioISO: "2024-09-21T18:00:00-03:00",
      fimISO: "2024-09-21T20:30:00-03:00",
      pregador: "Pastor Daniel Ferreira",
      imagemSilhueta: "/images/silhouettes/pastor-daniel.jpg",
      imagemReal: "/images/speakers/pastor-daniel.jpg",
      descricaoCurta: "Encerramento: levando Cristo para casa",
      dia: "domingo"
    }
  ],

  links: {
    ingressos: "https://pay.hotmart.com/placeholder-salto-2024",
    whatsapp: "https://wa.me/5511999999999",
    instagram: "https://instagram.com/saltoevent",
    regulamento: "/regulamento"
  },

  ingressos: {
    preco: 150,
    precoPrevenda: 120,
    loteAtual: "2º Lote",
    beneficios: [
      "Acesso a todas as 7 sessões",
      "Material de apoio digital",
      "Coffee break incluso",
      "Acesso à área de networking",
      "Certificado de participação"
    ]
  },

  produtos: [
    {
      id: "camiseta-salto-2024",
      nome: "Camiseta Salto No Hype 2024",
      tipo: "camiseta",
      preco: 45,
      imagem: "/images/products/camiseta-salto.jpg",
      linkCompra: "#"
    },
    {
      id: "livro-no-hype",
      nome: "Livro: Fé Sem Hype",
      tipo: "livro",
      preco: 35,
      imagem: "/images/products/livro-no-hype.jpg",
      linkCompra: "#"
    },
    {
      id: "caneca-salto",
      nome: "Caneca Salto 2024",
      tipo: "outros",
      preco: 25,
      imagem: "/images/products/caneca-salto.jpg",
      linkCompra: "#"
    },
    {
      id: "boton-no-hype",
      nome: "Boton No Hype",
      tipo: "outros",
      preco: 8,
      imagem: "/images/products/boton-no-hype.jpg",
      linkCompra: "#"
    }
  ],

  local: {
    nome: "Centro de Convenções São Paulo",
    endereco: "Rua das Convenções, 1000 - Vila Olímpia",
    cidade: "São Paulo - SP",
    mapEmbed: "https://maps.google.com/embed?placeholder"
  }
};

// FAQ Data
export const faqData = [
  {
    id: 1,
    pergunta: "Como funciona o ingresso digital?",
    resposta: "Após a compra, você receberá o ingresso por email. Basta apresentar na entrada (impresso ou no celular) junto com um documento de identidade."
  },
  {
    id: 2,
    pergunta: "Posso levar crianças?",
    resposta: "Sim! Crianças até 12 anos não pagam ingresso. Teremos espaço kids com atividades supervisionadas durante as sessões."
  },
  {
    id: 3,
    pergunta: "Tem estacionamento no local?",
    resposta: "Sim, o local possui estacionamento pago. Recomendamos também o uso de transporte público devido à localização central."
  },
  {
    id: 4,
    pergunta: "E se eu não puder comparecer?",
    resposta: "Ingressos podem ser transferidos até 48h antes do evento. Reembolsos seguem a política: até 7 dias antes (100%), até 3 dias (50%)."
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
];

// Depoimentos
export const depoimentos = [
  {
    id: 1,
    nome: "Julia Martins",
    igreja: "Igreja Central",
    texto: "O Salto do ano passado mudou minha perspectiva sobre fé autêntica. Saí de lá com uma conexão real com Cristo.",
    foto: "/images/testimonials/julia.jpg"
  },
  {
    id: 2,
    nome: "Pedro Santos",
    igreja: "Comunidade Vida",
    texto: "Três dias que transformaram minha caminhada. A ministração foi profunda e real, sem artificialismo.",
    foto: "/images/testimonials/pedro.jpg"
  },
  {
    id: 3,
    nome: "Carla Oliveira",
    igreja: "Igreja do Vale",
    texto: "A experiência no Salto me ajudou a entender que não precisamos de hype para ter encontros genuínos com Deus.",
    foto: "/images/testimonials/carla.jpg"
  }
];