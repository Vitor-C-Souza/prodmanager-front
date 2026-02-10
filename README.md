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

## 🔌 Serviços de API

### authService
- `login(credentials)` - Autentica usuário e retorna token
- `register(data)` - Registra novo usuário

### productService
- `create(product)` - Cria novo produto
- `list()` - Obtém lista de todos os produtos
- `update(id, product)` - Atualiza dados do produto
- `delete(id)` - Deleta um produto
- `addComposition(productId, material)` - Adiciona material à composição
- `removeComposition(productId, materialId)` - Remove material da composição

### rawMaterialService
- `create(material)` - Cria novo material
- `list()` - Obtém lista de todos os materiais
- `update(id, material)` - Atualiza material
- `delete(id)` - Deleta um material

### productionService
- `simulate()` - Simula cenários de produção
- `getReport()` - Obtém relatório consolidado de produção (contagem, unidades, receita)

## 📊 Tipos de Dados

### Product
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  productRawMaterial: ProductRawMaterial[];
}
```

### ProductionReport
```typescript
interface ProductionReport {
  productsCount: number;      // Total de produtos
  totalUnits: number;         // Total de unidades produzidas
  totalRevenue: number;       // Receita total
}
```

### RawMaterial
```typescript
interface RawMaterial {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}
```

## 📱 Funcionalidades Principais

### Login
- Autenticação segura com validação de credenciais
- Armazenamento seguro de token no Redux
- Redirecionamento automático para dashboard após autenticação

### Dashboard de Produção
- **Estatísticas em Tempo Real**: Visualização de produtos, unidades e receita total
- **Simulação de Cenários**: Simule diferentes cenários de produção
- **Relatórios de Produção**: Acesse dados consolidados de produtividade e receita
- Cards informativos com métricas principais
- Integração com dados atualizados de produtos e materiais

### Gerenciamento de Produtos
- **Listagem Completa**: Visualize todos os produtos cadastrados
- **Criar Produtos**: Interface intuitiva para adicionar novos produtos
- **Editar Produtos**: Modifique informações de produtos existentes
- **Gerenciar Composição**: 
  - Visualizar materiais brutos utilizados em cada produto
  - Adicionar materiais à composição do produto
  - Definir quantidade necessária de cada material
  - Remover materiais da composição
  - Modal interativo com validações em tempo real
- **Excluir Produtos**: Remove produtos do sistema com confirmação
- Suporte a múltiplos materiais por produto

### Gerenciamento de Materiais Brutos
- **Listagem Completa**: Visualize todos os materiais brutos disponíveis
- **Adicionar Materiais**: Cadastre novos materiais com facilidade
- **Atualizar Informações**: Modifique dados de materiais existentes
- **Remover Materiais**: Delete materiais do inventário
- **Rastreamento**: Acompanhe disponibilidade e uso em produtos
- Validação de materiais utilizados em composições

### Relatórios de Produção
- **Dados Consolidados**: 
  - Contagem total de produtos
  - Total de unidades produzidas
  - Receita total gerada
- **Integração com Dashboard**: Dados automaticamente sincronizados
- **Endpoint Dedicado**: `/production/report` para obtenção de relatórios

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
