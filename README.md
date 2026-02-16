# ProdManager Front

Production and raw materials management system with modern and responsive interface.

## 📋 About

ProdManager is a web application developed to manage:
- **Products**: Create, edit and view products with their compositions
- **Raw Materials**: Manage raw materials used in production
- **Production Dashboard**: View production statistics and simulations in real-time

The application has secure authentication and an intuitive interface for easy use.

## 🚀 Technologies

- **React** 19 - JavaScript library for building user interfaces
- **TypeScript** - Static typing for better code quality
- **Vite** - Modern and fast build tool
- **React Router DOM** - Page routing
- **Redux Toolkit** - Global state management
- **Tailwind CSS** - Utility-first styling framework
- **Axios** - HTTP client for API communication
- **Lucide React** - SVG icon library
- **ESLint** - Static code analysis

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Steps

1. Clone the repository:
```bash
git clone <your-repository>
cd prodmanager-front
```

2. Install dependencies:
```bash
npm install
```

## 🎯 How to Run

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 🧪 End-to-end tests (Cypress)

- Location: `cypress/e2e/`
- Run all tests (headless): `npm run test`
- Open Cypress (interactive): `npm run cypress:open`
- Run a single spec: `npx cypress run --spec "cypress/e2e/products.cy.ts"`

Test scenarios (by spec file):

- `cypress/e2e/auth.cy.ts` — Authentication
  - validation errors for empty fields
  - login failure with incorrect credentials
  - redirect unauthenticated users to `/login`
  - logout clears token and redirects
  - loading state during login (slow response stub)

- `cypress/e2e/navigation.cy.ts` — Navigation & layout
  - navbar navigation (Materials, Products, Dashboard)
  - logout from navbar

- `cypress/e2e/products.cy.ts` — Product management
  - validation on create
  - create product
  - update product name & price
  - delete product

- `cypress/e2e/raw-materials.cy.ts` — Raw materials management
  - validation on create
  - create raw material
  - update name and adjust stock
  - delete material

- `cypress/e2e/product-raw-material.cy.ts` — Product ↔ Raw Material (composition)
  - create material and product, link material to product composition
  - remove linked material from composition
  - test cleanup removes created records

Notes:
- Tests use a custom `cy.login()` command (see `cypress/support/commands.ts`) which sends a real POST to `http://localhost:8080/api/v1/auth/login` — ensure the API is available or adapt the command for stubbing.
- Several specs intercept API requests (request aliases) — they work with a running backend or with the network stubbed by Cypress.

## 📁 Project Structure

```
src/
├── assets/                 # Static resources
├── components/             # Reusable components
│   ├── auth/              # Authentication components
│   ├── common/            # Generic components
│   ├── layout/            # Layout components
│   ├── product/           # Product components
│   └── rawMaterial/       # Raw material components
├── hooks/                 # Custom hooks
├── pages/                 # Application pages
│   ├── login/             # Login page
│   ├── product/           # Product management
│   ├── rawMaterial/       # Material management
│   └── ProductionDashboard/ # Production dashboard
├── service/               # API services
│   ├── api.ts            # Axios configuration
│   ├── authService.ts    # Authentication
│   ├── productService.ts # Product management
│   ├── productionService.ts # Production
│   └── rawMaterialService.ts # Raw materials
├── store/                 # Redux configuration
│   └── slices/           # Redux slices
├── types/                 # TypeScript definitions
│   ├── auth.ts
│   ├── product.ts
│   ├── productionSimulation.ts
│   └── rawMaterial.ts
├── App.tsx               # Root component
└── main.tsx              # Application entry
```

## 🔐 Authentication

The application uses an authentication system with protected routes:
- Unauthenticated users are redirected to the login page
- Authentication token is stored in Redux
- Protected routes validate authentication before allowing access

## 🎨 Styling

The project uses **Tailwind CSS** for responsive styling. Configurations are in:
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration
- CSS files in `src/` for global styles

## 🔧 Configuration

### Environment Variables

Create a `.env` file at the project root:
```env
VITE_API_BASE_URL=http://your-api-server
```

### TypeScript

Configured in:
- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - Application configuration
- `tsconfig.node.json` - Tools configuration

### ESLint

Configured in `eslint.config.js` to maintain code quality.

## 🔌 API Services

### authService
- `login(credentials)` - Authenticates user and returns token
- `register(data)` - Registers a new user

### productService
- `create(product)` - Creates a new product
- `list()` - Gets list of all products
- `update(id, product)` - Updates product data
- `delete(id)` - Deletes a product
- `addComposition(productId, material)` - Adds material to composition
- `removeComposition(productId, materialId)` - Removes material from composition

### rawMaterialService
- `create(material)` - Creates a new material
- `list()` - Gets list of all materials
- `update(id, material)` - Updates material
- `delete(id)` - Deletes a material

### productionService
- `simulate()` - Simulates production scenarios
- `getReport()` - Gets consolidated production report (count, units, revenue)

## 📊 Data Types

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
  productsCount: number;      // Total products
  totalUnits: number;         // Total units produced
  totalRevenue: number;       // Total revenue
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

## 📱 Main Features

### Login
- Secure authentication with credential validation
- Secure token storage in Redux
- Automatic redirect to dashboard after authentication

### Production Dashboard
- **Real-time Statistics**: View products, units and total revenue
- **Scenario Simulation**: Simulate different production scenarios
- **Production Reports**: Access consolidated productivity and revenue data
- Informative cards with key metrics
- Integration with updated product and material data

### Product Management
- **Complete Listing**: View all registered products
- **Create Products**: Intuitive interface to add new products
- **Edit Products**: Modify existing product information
- **Manage Composition**: 
  - View raw materials used in each product
  - Add materials to product composition
  - Set required quantity for each material
  - Remove materials from composition
  - Interactive modal with real-time validations
- **Delete Products**: Remove products from system with confirmation
- Support for multiple materials per product

### Raw Materials Management
- **Complete Listing**: View all available raw materials
- **Add Materials**: Register new materials with ease
- **Update Information**: Modify existing material data
- **Remove Materials**: Delete materials from inventory
- **Tracking**: Monitor availability and usage in products
- Validation of materials used in compositions

### Production Reports
- **Consolidated Data**: 
  - Total product count
  - Total units produced
  - Total revenue generated
- **Dashboard Integration**: Data automatically synchronized
- **Dedicated Endpoint**: `/production/report` for reports retrieval

## ✅ Requirements Met (Test Criteria)

This application was developed to fully comply with the practical test of stock control and industrial production.

### Functional Requirements
- **RF001/RF005 (Products)**: Complete CRUD with code, name and value storage.
- **RF002/RF006 (Raw Materials)**: Complete CRUD with code, name and stock quantity control.
- **RF003/RF007 (Association)**: Integrated interface in product registration to associate inputs and required quantities through `CompositionModal`.
- **RF004/RF008 (Production Query)**: Dedicated dashboard that lists which products can be manufactured, possible quantities (`maxProduction`) and total value obtained (`totalRevenue`).

### Mandatory Business Logic
- **Value Prioritization**: The system displays and suggests production prioritizing higher value products, optimizing the use of limited raw materials in stock.

### Non-Functional Requirements
- **RNF001/RNF003**: Responsive web interface optimized for Chrome, Firefox and Edge using Tailwind CSS.
- **RNF002**: API-based architecture, completely decoupling Front-end from Back-end.
- **RNF006**: Developed in **React** and **Redux Toolkit**, as suggested for Autoflex technologies.
- **RNF007**: All coding (components, types, services and interface) performed strictly in **English**.

## 🤝 Contributing

To contribute to the project:

1. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📄 License

This project is under MIT license. See the LICENSE file for more details.

## 📞 Contact

For questions or suggestions, get in touch through the repository issues.

---

**Developed with ❤️**
