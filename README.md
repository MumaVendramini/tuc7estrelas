# Tenda de Umbanda Caboclo 7 Estrelas - PWA

Aplicativo web progressivo (PWA) para a Tenda de Umbanda Caboclo 7 Estrelas, desenvolvido com React, TypeScript, Tailwind CSS e Firebase.

## Sobre o Projeto

Este aplicativo foi criado para facilitar a gestão e comunicação interna do templo religioso, oferecendo funcionalidades como calendário de eventos, gestão de entidades espirituais, materiais de estudo, galeria de fotos, pontos cantados, aniversários, gestão financeira e área administrativa.

## Funcionalidades

- **Autenticação**: Sistema de login com diferentes níveis de acesso (Super_user, Adm, Tesoureiro, Medium)
- **Calendário**: Eventos com data, linha (tipo de trabalho espiritual), traje e observações
- **Entidades**: Lista de entidades espirituais e médiuns associados
- **Estudos**: Materiais de estudo e conhecimento
- **Fotos**: Galeria de imagens
- **Pontos Cantados**: Cantigas/músicas rituais
- **Aniversários**: Datas de aniversário dos membros
- **Financeiro**: Gestão financeira personalizada por utilizador
- **Perfil**: Informações pessoais de cada utilizador
- **Administrativo**: Área restrita para administradores

## Tecnologias Utilizadas

- **Frontend**: React.js com TypeScript
- **Estilização**: Tailwind CSS
- **Autenticação e Base de Dados**: Firebase (Authentication, Firestore, Storage)
- **PWA**: Service Worker, Web App Manifest

## Como Clonar e Executar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou pnpm

### Passos para Clonar e Executar

1. **Clone o repositório**
   ```bash
   git clone https://github.com/MumaVendramini/tuc7estrelas.git
   cd tuc7estrelas
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou, se preferir usar pnpm
   pnpm install
   ```

3. **Execute o projeto em modo de desenvolvimento**
   ```bash
   npm run dev
   # ou
   pnpm run dev
   ```

4. **Acesse o aplicativo**
   Abra o navegador e acesse `http://localhost:5173`

## Estrutura do Projeto

```
src/
├── assets/         # Imagens, ícones e recursos estáticos
├── components/     # Componentes reutilizáveis
├── contexts/       # Contextos React (autenticação, etc.)
├── firebase/       # Configuração e serviços do Firebase
├── hooks/          # Custom hooks
├── pages/          # Páginas principais
├── pwa/            # Configurações PWA
├── routes/         # Configuração de rotas
├── styles/         # Estilos globais
└── utils/          # Funções utilitárias
```

## Níveis de Acesso

- **Super_user**: Acesso total ao sistema
- **Adm**: Acesso a tudo, exceto ao perfil de Tesoureiro; pode gerir utilizadores
- **Tesoureiro**: Acesso à gestão financeira
- **Medium**: Acesso limitado a visualização de conteúdo

## Contribuição

Este projeto está em desenvolvimento ativo. Para contribuir, por favor entre em contato com os administradores do projeto.

## Licença

Este projeto é privado e destinado exclusivamente para uso da Tenda de Umbanda Caboclo 7 Estrelas.
