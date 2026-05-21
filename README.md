<div align="center">

# 🪖 ebtransf — Brazilian Army Pay Calculator

[![Português](https://img.shields.io/badge/lang-PT--BR-009c3b?style=for-the-badge)](https://github.com/henrylsilveira/ebtransf#vers%C3%A3o-em-portugu%C3%AAs)
[![English](https://img.shields.io/badge/lang-EN-002776?style=for-the-badge)](https://github.com/henrylsilveira/ebtransf#english-version)

</div>

---
# 🇺🇸 English Version

> The original version of the military pay calculation platform for Brazilian Army soldiers. Now **honorably discharged to the Reserve** 🎖️ — succeeded by the fully redesigned [ebcalc.net](https://ebcalc.net).

## ⚠️ Project Status

![Status](https://img.shields.io/badge/status-archived-lightgrey)
![Version](https://img.shields.io/badge/version-2.0-blue)
![New Version](https://img.shields.io/badge/new%20version-ebcalc.net-green)

**This project is no longer actively maintained.** It has been archived and replaced by a brand-new, fully redesigned version available at **[ebcalc.net](https://ebcalc.net)**. The code remains public as a historical record and learning resource.

## About the Project

**ebtransf** was born from a very practical need: a soldier who, while performing his daily duties, realized there was no accessible and reliable tool for military personnel to calculate their own pay and benefits (*proventos*).

Like most of the author's military-focused projects — including [SisAGI](https://github.com/henrylsilveira/SisAGI) — this one started from a personal pain point: the desire to increase performance in the role being performed, using software development as a tool. Unlike internal systems, this project was **made public from day one**, because the need to calculate military pay is not specific to any unit — it is a reality shared by every soldier in the Brazilian Army.

The platform went live, gained users, evolved through multiple iterations, and eventually reached its **v2.0** milestone — rebuilt from scratch with a new visual identity, improved features, and a proper domain: **[ebcalc.net](https://ebcalc.net)**.

This repository represents the **v1.x of the platform** — now honorably archived. Mission accomplished.

## 🔗 The New Version

The platform has been fully redesigned and is now live at:

**[ebcalc.net](https://ebcalc.net)**

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 13](https://nextjs.org/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Components | [Radix UI](https://www.radix-ui.com/) + [MUI Material](https://mui.com/) |
| Auth / Database | [Firebase](https://firebase.google.com/) |
| CMS (News) | [Prismic](https://prismic.io/) + Slice Machine |
| Maps | [Mapbox GL](https://www.mapbox.com/) + [react-map-gl](https://visgl.github.io/react-map-gl/) |
| 3D Rendering | [Three.js](https://threejs.org/) + [@react-three/drei](https://github.com/pmndrs/drei) |
| PDF Generation | [Adobe PDF Services SDK](https://developer.adobe.com/document-services/) |
| QR Code | [react-qrcode-logo](https://github.com/gcoro/react-qrcode-logo) |
| Notifications | [React Toastify](https://fkhadra.github.io/react-toastify/) |
| Onboarding Tour | [driver.js](https://driverjs.com/) |
| Dates | [date-fns](https://date-fns.org/) |
| Icons | [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) |
| Cryptography | [crypto-js](https://github.com/brix/crypto-js) |

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) >= 18.x
- [pnpm](https://pnpm.io/) (recommended) or npm

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/henrylsilveira/ebtransf.git
cd ebtransf
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
```

### 3. Set up environment variables

Create a `.env.local` file at the project root (see below).

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
pnpm build
pnpm start
```

## 🔑 Environment Variables

Create a `.env.local` file at the project root with the following:

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

> ⚠️ Firebase, Prismic, Mapbox and Adobe PDF Services credentials must be created on their respective platforms. No production credentials are included in this repository.

## 📁 Project Structure

```
ebtransf/
├── public/                      # Static assets
├── src/
│   ├── app/                     # Routes (Next.js App Router)
│   ├── components/              # Reusable components
│   ├── lib/                     # Integrations (Firebase, Prismic, etc.)
│   └── styles/                  # Global styles
├── customtypes/ebcalcnoticia/   # Prismic custom types (news/articles)
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## 👨‍💻 About the Author

**Henry Leão** is a Brazilian Army soldier who taught himself software development to solve real problems he faced in his daily military duties. Over time, his side projects grew from internal tools into public platforms used by soldiers across Brazil.

His work sits at the intersection of **software engineering** and **military operations** — building tools that modernize administrative processes, calculate pay and benefits, and improve the day-to-day lives of military personnel. Beyond web development, he also studies **offensive security and Red Team** techniques.

**Tech stack:** TypeScript · JavaScript · React · Next.js · Node.js · Prisma · PostgreSQL · React Native · Tailwind CSS

**Notable projects:**
- 🧮 [ebcalc.net](https://ebcalc.net) — Current version of this platform, fully redesigned
- 🪖 [SisAGI](https://github.com/henrylsilveira/SisAGI) — Internal management system for Military Organizations, submitted to **PREMIA 2024** (Brazilian Army Innovation Award)

**Find Henry online:**

[![Portfolio](https://img.shields.io/badge/Portfolio-000?style=for-the-badge&logo=vercel&logoColor=white)](https://hleao.dev/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/henryleao)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/henrylsilveira)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:henrylsilveira@gmail.com)

## ⚖️ Disclaimer

This is a **personal and independent project**, built by a soldier with a developer mindset. It has **no official affiliation with the Brazilian Army** or any Military Organization. The goal has always been — and continues to be in the new version — to help military personnel in a free and accessible way.

---

**Current platform:** [ebcalc.net](https://ebcalc.net)

Built with 🖥️ + 🪖 by [henrylsilveira](https://github.com/henrylsilveira)


# 🇧🇷 Versão em Português

> A versão original da plataforma de cálculo de proventos para militares do Exército Brasileiro. Hoje **na Reserva** com honras 🎖️ — substituída pela versão totalmente redesenhada em [ebcalc.net](https://ebcalc.net).

## ⚠️ Status do Projeto

![Status](https://img.shields.io/badge/status-arquivado-lightgrey)
![Versão](https://img.shields.io/badge/versão-2.0-blue)
![Nova Versão](https://img.shields.io/badge/nova%20versão-ebcalc.net-green)

**Este projeto não está mais em desenvolvimento ativo.** Foi arquivado e substituído por uma versão completamente redesenhada disponível em **[ebcalc.net](https://ebcalc.net)**. O código permanece público como registro histórico e fonte de aprendizado.

## Sobre o Projeto

O **ebtransf** nasceu de uma necessidade prática: um militar que, no exercício da sua função, sentiu falta de uma ferramenta acessível para calcular seus próprios proventos.

Assim como a maioria dos projetos militares do autor — incluindo o [SisAGI](https://github.com/henrylsilveira/SisAGI) — este surgiu da vontade de aumentar a performance na função desempenhada, usando o desenvolvimento de software como ferramenta. A diferença é que este foi **tornado público desde o início**, porque a necessidade de calcular proventos não é exclusiva de nenhuma unidade — é uma realidade de todo militar.

A plataforma foi ao ar, ganhou usuários e evoluiu até chegar em sua **versão 2.0**, quando foi completamente reconstruída com nova identidade visual, novas funcionalidades e um novo endereço: **[ebcalc.net](https://ebcalc.net)**.

Este repositório representa a **versão 1.x da plataforma** — agora na Reserva, com a missão cumprida.

## 🔗 A Nova Versão

A plataforma foi totalmente redesenhada. A versão atual está disponível em:

**[ebcalc.net](https://ebcalc.net)**

## 🛠️ Tecnologias

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

## 📦 Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18.x
- [pnpm](https://pnpm.io/) (recomendado) ou npm

## 🚀 Instalação e Execução

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

Crie um arquivo `.env.local` na raiz do projeto (veja a seção abaixo).

### 4. Execute o projeto

```bash
# Desenvolvimento
pnpm dev

# Produção
pnpm build
pnpm start
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz com as seguintes variáveis:

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

> ⚠️ As credenciais do Firebase, Prismic, Mapbox e Adobe PDF Services precisam ser criadas nas respectivas plataformas. Nenhuma credencial de produção está incluída neste repositório.

## 📁 Estrutura do Projeto

```
ebtransf/
├── public/                      # Arquivos estáticos
├── src/
│   ├── app/                     # Rotas (Next.js App Router)
│   ├── components/              # Componentes reutilizáveis
│   ├── lib/                     # Integrações (Firebase, Prismic, etc.)
│   └── styles/                  # Estilos globais
├── customtypes/ebcalcnoticia/   # Tipos customizados do Prismic (notícias)
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## 👨‍💻 Sobre o Autor

**Henry Leão** é um militar do Exército Brasileiro que aprendeu desenvolvimento de software para resolver problemas reais do serviço. Com o tempo, seus projetos pessoais cresceram de ferramentas internas para plataformas públicas utilizadas por militares em todo o Brasil.

Seu trabalho está na interseção entre **engenharia de software** e **operações militares** — construindo ferramentas que modernizam processos administrativos, calculam proventos e facilitam o dia a dia do serviço militar. Além do desenvolvimento web, também estuda **segurança ofensiva e Red Team**.

**Stack:** TypeScript · JavaScript · React · Next.js · Node.js · Prisma · PostgreSQL · React Native · Tailwind CSS

**Projetos em destaque:**
- 🧮 [ebcalc.net](https://ebcalc.net) — Versão atual desta plataforma, totalmente redesenhada
- 🪖 [SisAGI](https://github.com/henrylsilveira/SisAGI) — Sistema de gestão interna para Organizações Militares, submetido ao **PREMIA 2024**

**Encontre o Henry:**

[![Portfólio](https://img.shields.io/badge/Portfólio-000?style=for-the-badge&logo=vercel&logoColor=white)](https://hleao.dev/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/henryleao)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/henrylsilveira)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:henrylsilveira@gmail.com)

## ⚖️ Aviso

Este é um projeto **pessoal e independente**, desenvolvido por um militar com perfil de desenvolvedor. **Não possui vínculo oficial com o Exército Brasileiro** nem com qualquer Organização Militar. O objetivo sempre foi — e continua sendo na nova versão — ajudar militares de forma geral, de maneira acessível e gratuita.

---
---
