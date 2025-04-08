# NYT Most Popular Articles

## Setup

1. Clone the repo
2. Run `npm install`
3. Replace `VITE_API_KEY` in `.env` with your NYT API key or use my demo key given in .env file
4. Run `npm run dev` to start the dev server

## Scripts

- `npm run test` — run unit tests
- `npm run coverage` — generate coverage report
- `npm run lint` — run linter
- `npm run cypress` — run UI tests

## Tech Used

- React 19
- Typescript
- Vite
- Tailwind CSS
- React Query
- Vitest  (I have used vitest for writing test to maintain the stack. Jest could have been used also)
- Cypress
- Node >= 18**
- ESLint
- Axios
- npm

## Project structure

src/
├── assets/                     # Static assets
├── components/                 # Reusable UI components
│   ├── Error.tsx               # Error display component
│   ├── Select.tsx              # Custom select/dropdown
│   └── Shimmer.tsx             # Loading placeholder
│
├── config/
│   └── http.ts                 # HTTP client configuration
│
├── hooks/
│   └── useArticles.ts          # Custom hook for article data
│
├── pages/articles/             # Article-related components
│   ├── components/
│   │   ├── ArticleCard.tsx     # Individual article card
│   │   └── ArticleDetail.tsx   # Article details view
│   │
│   ├── types/
│   │   └── articles.ts         # Article type definitions
│   │
│   ├── ArticleList.tsx         # Main article listing page
│   └── index.ts                # Barrel file for exports
│
├── providers/
│   └── ToastProvider.tsx       # Custom Notification system
│
├── App.tsx                     # Root application component
├── index.css                   # Global styles
├── main.tsx                    # Application entry point
└── vite-env.d.ts               # Vite environment types
├── tests/
    └── ArticleCard.test.tsx         # ArticleCard component tests
    ├── ArticleDetails.test.tsx      # ArticleDetail component tests
    ├── Select.test.tsx              # Select component tests
    └── useArticles.test.tsx         # useArticles hook test

types/
├── vite-plugin-eslint.d.ts     # ESLint plugin types
├── global.d.ts                 # Global type declarations
└── cypress.d.ts                # Cypress type definitions

cypress/
├── e2e/
│   └── ArticleList.cy.ts  # Updated E2E test file
└── support/                     # Cypress support/config files
