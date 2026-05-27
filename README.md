# __PROJECT_NAME__

React + TypeScript + Vite front-end scaffold based on the CtrlC Enterprise Design System.

## Tech Stack

- **React 18** — UI library
- **TypeScript 5** — Type safety
- **Vite 5** — Dev server & bundler
- **MUI v5** — Component library & theming
- **react-router-dom v6** — Client-side routing

## Getting Started

```bash
# 1. Copy environment file
cp .env.example .env

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at http://localhost:5173 |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Preview production build locally |

## Project Structure

```
ctrlc-app/
├── src/
│   ├── main.tsx          # App entry, MUI ThemeProvider
│   ├── App.tsx           # Router + route definitions
│   ├── index.css         # Global resets
│   ├── theme/
│   │   └── index.ts      # MUI v5 theme (colours, typography)
│   └── pages/
│       ├── LoginPage.tsx
│       ├── DashboardPage.tsx
│       ├── DataTablePage.tsx
│       ├── FormPage.tsx
│       ├── SettingsPage.tsx
│       └── ReportPage.tsx
├── template.config.json  # Placeholder → real value map
├── .env.example          # Environment variable template
└── index.html
```

## Template Placeholders

Replace these tokens when scaffolding a new project:

| Placeholder | Default | Where |
|---|---|---|
| `__PROJECT_NAME__` | CtrlC Enterprise | `package.json`, `README.md` |
| `__PROJECT_LOWER__` | ctrlc-enterprise | `package.json` name field |
| `__APP_TITLE__` | CtrlC Enterprise | `index.html` title |
| `__PRIMARY_COLOR__` | `#0D7FFF` | MUI theme |
| `__SECONDARY_COLOR__` | `#2B3D5E` | MUI theme |
| `__FONT_FAMILY__` | Sarabun | MUI theme + index.html |
| `__API_URL__` | https://api.example.com | `.env.example` |
