# 🐛 BugHunter Academy 2.0

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Vite-5.0-purple?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.0-cyan?style=for-the-badge&logo=tailwindcss" />
</div>

## 📖 Sobre o Projeto

**BugHunter Academy 2.0** é a evolução do projeto *QA Detective Game*, trazendo a experiência de treinamento ainda mais completa e desafiadora para futuros profissionais de **Quality Assurance (QA)**.

Este sistema gamificado foi desenvolvido para **capacitar e avaliar o raciocínio crítico** de novos analistas um **ambiente simulado realista**, inspirado no dia a dia de grandes fábricas de software.

O sistema contém **30+ bugs intencionais** distribuídos em diferentes módulos,  **Bug Hunter Academy 2.0** permite que o QA pratique análise de comportamento, identificação de falhas, documentação detalhada e priorização de defeitos, de forma prática e interativa.

### ✨ Características

- 🎮 **Sistema de Gamificação**: XP, níveis (Trainee → Sênior), missões e ranking
- 🎯 **4 Módulos de Treinamento**: Cada um com bugs específicos e desafios únicos
- 🔍 **30+ Bugs Intencionais**: De simples a complexos, cobrindo UI, UX, validações, APIs e lógica
- 📊 **Sistema de Relatórios**: Documente bugs encontrados com severidade e passos para reproduzir

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js 18+ ou Bun
- npm, yarn ou bun

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/ericgenovez/BugHunter-Academy-2.0.git
cd bughunter-academy-3.0

# 2. Instale as dependências
npm install
# ou
yarn install
# ou
bun install

# 3. Execute o projeto em modo de desenvolvimento
npm run dev
# ou
yarn dev
# ou
bun dev

# 4. Acesse no navegador
# O sistema estará rodando em http://localhost:8080
```

### Build para Produção

```bash
npm run build
npm run preview
```

## 🎯 Módulos do Sistema

### 1. 📊 Dashboard
- Visão geral do progresso
- Estatísticas de XP e missões
- Acesso rápido aos módulos

### 2. 🎯 Painel de Missões
- Missões organizadas por dificuldade
- Sistema de filtros e progresso
- **Bugs implementados**: 5

### 3. 🧪 Testes Funcionais
- CRUD de usuários com validações
- Campos: nome, email, senha
- **Bugs implementados**: 9

### 4. 🔌 API Tester
- Interface tipo Postman
- Endpoints: `/users`, `/missions`, `/reports`
- **Bugs implementados**: 8

### 5. 📝 Relatórios de Bugs
- Sistema de documentação de bugs
- Campos: título, descrição, severidade, passos
- **Bugs implementados**: 7

## 🎓 Como Usar (Para QAs em Treinamento)

1. **Explore os módulos** e familiarize-se com o sistema
2. **Identifique bugs** testando todas as funcionalidades
3. **Documente** cada bug encontrado no módulo de Relatórios
4. **Ganhe XP** reportando bugs corretamente (+10 XP por bug)
5. **Evolua** de Trainee até Sênior
6. **Complete missões** para ganhar mais XP

### 💡 Dicas para QAs

- ✅ Teste validações de formulários
- ✅ Verifique comportamento de APIs
- ✅ Observe inconsistências visuais
- ✅ Teste edge cases (campos vazios, dados inválidos)
- ✅ Compare comportamento esperado vs. atual
- ✅ Documente passos para reproduzir
- ✅ Classifique severidade corretamente

## 📋 Sistema de Pontuação

| Ação | XP |
|------|-----|
| Bug reportado corretamente | +10 XP |
| Falso positivo | -5 XP |
| Missão completa (fácil) | +50 XP |
| Missão completa (média) | +100 XP |
| Missão completa (difícil) | +200 XP |

### Níveis
- 🌱 **Trainee**: 0-50 XP
- 🔰 **Junior**: 51-100 XP
- ⚡ **Pleno**: 101-200 XP
- 🏆 **Sênior**: 201+ XP

## 🔒 Gabarito (Somente para Instrutores)

A lista completa de todos os bugs intencionais, suas localizações e critérios de avaliação está disponível em:

**📂 [`/GABARITO/README.md`](./GABARITO/README.md)**

⚠️ **Atenção**: Este documento deve ser usado apenas para correção e avaliação dos QAs.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Estilo**: Tailwind CSS + shadcn-ui
- **Gerenciamento de Estado**: Context API
- **Roteamento**: React Router DOM
- **Ícones**: Lucide React
- **Notificações**: Sonner + Toast

## 📄 Licença

Este projeto é de uso educacional para treinamento de QAs.

## 📧 Contato

Para dúvidas sobre o sistema de treinamento, consulte a documentação no diretório `/GABARITO`.

---

<div align="center">
  <p><strong>Boa caçada de bugs! 🐛🔍</strong></p>
  <p><em>Desenvolvido para capacitar a próxima geração de QAs</em></p>
</div>
