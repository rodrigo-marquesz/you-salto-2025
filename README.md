# you-salto-2025

README rápido para os desenvolvedores do you que chegam ao repositório.

Este projeto é uma aplicação React + TypeScript criada com Vite. Ele usa TailwindCSS para estilos, Radix e alguns utilitários modernos (React Query, Zod, etc.), e sim, esta misturado CSS puro com tailwind pq n consegui tirar essa joça toda, tem q refatorar o projeto todo e manjar pra nada quebrar 🫠

Use este documento para configurar o ambiente local, rodar em desenvolvimento e entender a estrutura do projeto.

## Checklist — o que este README cobre

- Pré-requisitos (Node, npm/yarn)
- Instalação das dependências
- Scripts úteis (dev, build, preview, lint)
- Estrutura de pastas e convenções
- Notas sobre Tailwind, TypeScript e ESLint
- Como contribuir rapidamente

## Pré-requisitos

- Node.js (recomendado >= 18). Versões LTS recentes funcionam melhor.
- npm (vem com Node) ou yarn/pnpm (se preferir). Este README usa npm nos exemplos.

## Instalação

Clone o repositório e instale dependências:

```powershell
git clone https://github.com/rodrigo-marquesz/you-salto-2025.git
cd you-salto-2025
npm install
```

Observação: se você usa `pnpm` ou `yarn`, substitua `npm install` pelo comando equivalente.

## Scripts disponíveis

Os scripts estão declarados em `package.json` e são os pontos principais para desenvolvimento e build:

- `npm run dev` — inicia o servidor de desenvolvimento (Vite + HMR)
- `npm run build` — compila o TypeScript (via `tsc -b`) e gera o build de produção com Vite
- `npm run preview` — executa `vite preview` para servir o build localmente
- `npm run lint` — executa o ESLint sobre o código

Exemplos rápidos:

```powershell
npm run dev
npm run build
npm run preview
npm run lint
```

## Estrutura do projeto (resumo)

- `src/` — código fonte
  - `components/` — componentes React organizados por feature
  - `pages/` — páginas e rotas
  - `hooks/` — hooks personalizados
  - `lib/` — utilitários compartilhados
  - `styles/` — resets e tema (Tailwind + CSS global)
- `public/` — assets públicos
- `tsconfig.*.json` — configuração TypeScript
- `vite.config.ts` — configuração do Vite

Arquivos chave:

- `src/main.tsx` — entrada da aplicação
- `src/App.tsx` — roteamento/estrutura principal

## Convenções e dicas rápidas

- Componentes pequenos e reutilizáveis vivem em `src/components/ui`.
- Use `className` com utilitários Tailwind; o projeto já inclui `tailwindcss` e `tailwindcss-animate`.
- Validação de formulários: `react-hook-form` + `zod` (ver `@hookform/resolvers`).
- Estado assíncrono: `@tanstack/react-query` está disponível para caching/requests.

## TailwindCSS

O projeto já tem `tailwindcss` como dependência. Se precisar atualizar ou gerar o build de estilos localmente:

```powershell
npx tailwindcss -i ./src/index.css -o ./dist/assets/styles.css --minify
```

Para desenvolvimento, o Vite já injeta os estilos via a importação em `src/index.css`.

## TypeScript

- O projeto usa TypeScript com múltiplos `tsconfig` (veja `tsconfig.app.json` e `tsconfig.node.json`).
- O script `build` executa `tsc -b` antes do `vite build` para garantir checagem de tipos em build.

## ESLint

- Execute `npm run lint` para rodar o ESLint. A configuração atual é baseada em regras modernas; ajustes podem ser feitos em `eslint.config.js`.

## Rodando e testando localmente

1. Instale dependências: `npm install`
2. Inicie em modo dev: `npm run dev`
3. Abra `http://localhost:5173` (padrão do Vite)

Se precisar inspecionar o build gerado:

```powershell
npm run build
npm run preview
```

## Contribuição rápida

- Crie uma branch com um nome descritivo: `feature/descricao-curta` ou `fix/descricao-curta`.
- Adicione testes ou validações simples quando modificar comportamento crítico.
- Abra um Pull Request descrevendo a mudança e qualquer passo para reproduzir.

## Troubleshooting

- Dependências faltando depois de clonar: rode `npm install` novamente.
- Erros de TypeScript em `build`: verifique se os `tsconfig` estão corretos e rode `npx tsc -b` localmente para detalhes.
- Problemas de CSS do Tailwind: verifique se `src/index.css` importa `@tailwind base; @tailwind components; @tailwind utilities;` e reinicie o dev server.

## Dependências principais

Principais libs usadas no projeto (veja `package.json` para a lista completa):

- React 19
- Vite
- TypeScript
- TailwindCSS
- Radix UI
- React Router
- @tanstack/react-query
- Zod
- Shadcn/ui

## Contato / Próximos passos

Se algo estiver faltando neste README (ex.: scripts adicionais, workflows CI/CD, secrets), adicione uma issue descrevendo o que precisa ser documentado.

---

Arquivo gerado automaticamente: deixe sugestões ou PRs para melhorar instruções específicas do time.
