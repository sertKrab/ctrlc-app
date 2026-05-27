# Getting Started

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 20 |
| npm | ≥ 9 |
| Git | any |

## Clone & Install

```bash
git clone <repository-url>
cd ctrlc-app
npm install
```

## Environment Setup

Copy the sample env file and fill in values:

```bash
cp .env.example .env
```

Key variables:

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `https://api.example.com` |
| `VITE_ENABLE_MOCK` | Enable MSW mock layer | `true` |
| `VITE_APP_TITLE` | App title shown in UI | `MyFinance` |

## Run Dev Server

```bash
npm run dev
```

App starts at `http://localhost:5173`.

## Mock Mode

Set `VITE_ENABLE_MOCK=true` in `.env` to intercept all API calls with MSW handlers.
Mock handlers live in `src/mocks/handlers/`. Default credentials:

- Email: `admin@ctrlc.co.th`
- Password: `password`

## Placeholder Replacement

Before deploying, replace all template placeholders in the source files:

| Placeholder | Replace with |
|---|---|
| `__PROJECT_NAME__` | Human-readable project name (e.g. `MyFinance`) |
| `__PROJECT_LOWER__` | Lowercase slug (e.g. `myfinance`) |
| `__APP_TITLE__` | Navbar title string |
| `__PRIMARY_COLOR__` | Hex primary color (e.g. `#0D7FFF`) |
| `__SECONDARY_COLOR__` | Hex secondary color (e.g. `#2B3D5E`) |
| `__FONT_FAMILY__` | Google Font name (e.g. `Sarabun`) |
| `__API_URL__` | Production API base URL |

Run a global find-and-replace (IDE or `sed`) across `src/` and `public/` before your first build.
