# 🪖 ebtransf — Calculadora de Proventos Militares

> A versão original da plataforma de cálculo de proventos para militares do Exército Brasileiro. Hoje **na Reserva** com honras 🎖️ — substituída pela versão totalmente redesenhada em [ebcalc.net](https://ebcalc.net).

---

## 📋 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [A Nova Versão](#a-nova-versão)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Aviso](#aviso)

---

## Sobre o Projeto

O **ebtransf** nasceu da necessidade prática de um militar que, no exercício da sua função, sentiu falta de uma ferramenta acessível para calcular seus próprios proventos — o tipo de coisa que no dia a dia toma tempo e gera dúvida.

Assim como o [SisAGI](https://github.com/henrylsilveira/SisAGI), este projeto surgiu de uma dor real: a vontade de aumentar a performance na função desempenhada, usando o desenvolvimento de software como ferramenta. A diferença é que este foi **tornado público**, porque a necessidade de calcular proventos não é exclusiva de nenhuma unidade — é uma realidade de todo militar.

O projeto foi ao ar, cresceu, ganhou usuários e evoluiu até chegar em sua **versão 2.0**, quando foi completamente redesenhado com nova identidade visual, novas funcionalidades e um novo endereço: **[ebcalc.net](https://ebcalc.net)**.

Este repositório representa a **versão 1.x da plataforma** — agora na Reserva, com a missão cumprida. O código permanece público como registro histórico e fonte de aprendizado.

> ⚠️ **Este projeto não está mais em desenvolvimento ativo.** A versão atual e mantida da plataforma está em [ebcalc.net](https://ebcalc.net).

---

## A Nova Versão

A plataforma evoluiu! A versão atual, com novo design, novas funcionalidades e melhor desempenho, está disponível em:

🔗 **[ebcalc.net](https://ebcalc.net)**

---

## Tecnologias

| Categoria | Tecnologia |
|---|---|
| Framework | [Next.js 13](https://nextjs.org/) |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) |
| Estilo | [Tailwind CSS](https://tailwindcss.com/) |
| Componentes | [Radix UI](https://www.radix-ui.com/) + [MUI Material](https://mui.com/) |
| Banco / Auth | [Firebase](https://firebase.google.com/) |
| CMS (Notícias) | [Prismic](https://prismic.io/) + Slice Machine |
| Mapas | [Mapbox GL](https://www.mapbox.com/) + [react-map-gl](https://visgl.github.io/react-map-gl/) |
| 3D | [Three.js](https://threejs.org/) + [@react-three/drei](https://github.com/pmndrs/drei) |
| Geração de PDF | [Adobe PDF Services SDK](https://developer.adobe.com/document-services/) |
| QR Code | [react-qrcode-logo](https://github.com/gcoro/react-qrcode-logo) |
| Notificações | [React Toastify](https://fkhadra.github.io/react-toastify/) |
| Tour / Onboarding | [driver.js](https://driverjs.com/) |
| Datas | [date-fns](https://date-fns.org/) |
| Ícones | [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) |
| Criptografia | [crypto-js](https://github.com/brix/crypto-js) |

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18.x
- [pnpm](https://pnpm.io/) (recomendado) ou npm

---

## Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/henrylsilveira/ebtransf.git
cd ebtransf
```

### 2. Instale as dependências

```bash
pnpm install
# ou
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz (veja a seção abaixo).

### 4. Execute o projeto

```bash
# Desenvolvimento
pnpm dev

# Build de produção
pnpm build
pnpm start
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## Variáveis de Ambiente

Crie um `.env.local` na raiz com as variáveis necessárias para os serviços integrados:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Prismic CMS
NEXT_PUBLIC_PRISMIC_ENDPOINT=

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=

# Adobe PDF Services
PDF_SERVICES_CLIENT_ID=
PDF_SERVICES_CLIENT_SECRET=
```

> ⚠️ As configurações do Firebase, Prismic, Mapbox e Adobe PDF Services precisam ser criadas nas respectivas plataformas. Este repositório não inclui credenciais de produção.

---

## Estrutura do Projeto

```
ebtransf/
├── public/                  # Arquivos estáticos
├── src/
│   ├── app/                 # Rotas (Next.js App Router)
│   ├── components/          # Componentes reutilizáveis
│   ├── lib/                 # Configurações (Firebase, Prismic, etc.)
│   └── styles/              # Estilos globais
├── customtypes/             # Tipos customizados do Prismic (CMS)
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## Aviso

Este é um projeto **pessoal e independente**, desenvolvido por um militar com perfil de desenvolvedor. **Não possui vínculo oficial com o Exército Brasileiro** nem com qualquer Organização Militar. O objetivo sempre foi — e continua sendo na nova versão — ajudar militares de forma geral, de maneira acessível.

---

**Plataforma atual:** [ebcalc.net](https://ebcalc.net)

Desenvolvido por [henrylsilveira](https://github.com/henrylsilveira) - Portfolio: https://hleao.dev
