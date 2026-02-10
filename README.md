# ProdManager Front

Sistema de gerenciamento de produção e materiais bruto com interface moderna e responsiva.

## 📋 Sobre

ProdManager é uma aplicação web desenvolvida para gerenciar:
- **Produtos**: Criar, editar e visualizar produtos com suas composições
- **Materiais Brutos**: Gerenciar matérias-primas utilizadas na produção
- **Dashboard de Produção**: Visualizar estatísticas e simulações de produção em tempo real

A aplicação possui autenticação segura e interface intuitiva para facilitar o uso.

## 🚀 Tecnologias

- **React** 19 - Biblioteca JavaScript para construção da interface
- **TypeScript** - Tipagem estática para melhor qualidade de código
- **Vite** - Build tool moderno e rápido
- **React Router DOM** - Roteamento de páginas
- **Redux Toolkit** - Gerenciamento de estado global
- **Tailwind CSS** - Framework de estilização utility-first
- **Axios** - Cliente HTTP para comunicação com API
- **Lucide React** - Biblioteca de ícones SVG
- **ESLint** - Análise estática de código

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos

1. Clone o repositório:
```bash
git clone <seu-repositório>
cd prodmanager-front
```

2. Instale as dependências:
```bash
npm install
```

## 🎯 Como Executar

### Modo Desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:5173`

### Build para Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 📁 Estrutura do Projeto

```
src/
├── assets/                 # Recursos estáticos
├── components/             # Componentes reutilizáveis
│   ├── auth/              # Componentes de autenticação
│   ├── common/            # Componentes genéricos
│   ├── layout/            # Componentes de layout
│   ├── product/           # Componentes de produtos
│   └── rawMaterial/       # Componentes de materiais brutos
├── hooks/                 # Hooks customizados
├── pages/                 # Páginas da aplicação
│   ├── login/             # Página de login
│   ├── product/           # Gerenciamento de produtos
│   ├── rawMaterial/       # Gerenciamento de materiais
│   └── ProductionDashboard/ # Dashboard de produção
├── service/               # Serviços de API
│   ├── api.ts            # Configuração do Axios
│   ├── authService.ts    # Autenticação
│   ├── productService.ts # Gestão de produtos
│   ├── productionService.ts # Produção
│   └── rawMaterialService.ts # Materiais brutos
├── store/                 # Configuração Redux
│   └── slices/           # Slices Redux
├── types/                 # Definições TypeScript
│   ├── auth.ts
│   ├── product.ts
│   ├── productionSimulation.ts
│   └── rawMaterial.ts
├── App.tsx               # Componente raiz
└── main.tsx              # Entrada da aplicação
```

## 🔐 Autenticação

A aplicação utiliza um sistema de autenticação com rotas protegidas:
- Usuários não autenticados são redirecionados para a página de login
- O token de autenticação é armazenado no Redux
- A rota protegida valida a autenticação antes de permitir acesso

## 🎨 Estilização

O projeto utiliza **Tailwind CSS** para estilização responsiva. As configurações estão em:
- `tailwind.config.js` - Configuração do Tailwind
- `postcss.config.js` - Configuração do PostCSS
- Arquivos CSS em `src/` para estilos globais

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:
```env
VITE_API_BASE_URL=http://seu-servidor-api
```

### TypeScript

Configurado em:
- `tsconfig.json` - Configuração base
- `tsconfig.app.json` - Configuração para aplicação
- `tsconfig.node.json` - Configuração para ferramentas

### ESLint

Configurado em `eslint.config.js` para manter a qualidade do código.

## 📱 Funcionalidades Principais

### Login
- Autenticação segura
- Validação de credenciais
- Redirecionamento automático para dashboard

### Dashboard de Produção
- Estatísticas de produção em tempo real
- Simulação de cenários de produção
- Cards com informações consolidadas

### Gerenciamento de Produtos
- Listagem de todos os produtos
- Criar novo produto
- Editar produto existente
- Visualizar composição do produto
- Excluir produtos

### Gerenciamento de Materiais Brutos
- Listagem de materiais
- Adicionar novo material
- Atualizar informações de material
- Remover materiais
- Rastreamento de disponibilidade

## 🤝 Contribuindo

Para contribuir com o projeto:

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 📞 Contato

Para dúvidas ou sugestões, entre em contato através dos issues do repositório.

---

**Desenvolvido com ❤️**
