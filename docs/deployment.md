# Deployment

## Build

```bash
npm run build
```

Outputs to `dist/`. TypeScript is checked before Vite bundles (`tsc -b && vite build`).

## Environment Variables for Production

Create a `.env.production` file (or set vars in your CI/CD pipeline):

```dotenv
VITE_API_URL=https://api.yourcompany.com
VITE_ENABLE_MOCK=false
VITE_APP_TITLE=MyFinance
```

Vite only exposes variables prefixed with `VITE_` to the client bundle.

## Placeholder Replacement Script

Run before first deployment to replace all template tokens:

```bash
#!/usr/bin/env bash
# replace-placeholders.sh
PROJECT_NAME="MyFinance"
PROJECT_LOWER="myfinance"
APP_TITLE="MyFinance Portal"
PRIMARY_COLOR="#0D7FFF"
SECONDARY_COLOR="#2B3D5E"
FONT_FAMILY="Sarabun"
API_URL="https://api.yourcompany.com"

find src public -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.html" -o -name "*.json" \) \
  -exec sed -i \
    -e "s|__PROJECT_NAME__|$PROJECT_NAME|g" \
    -e "s|__PROJECT_LOWER__|$PROJECT_LOWER|g" \
    -e "s|__APP_TITLE__|$APP_TITLE|g" \
    -e "s|__PRIMARY_COLOR__|$PRIMARY_COLOR|g" \
    -e "s|__SECONDARY_COLOR__|$SECONDARY_COLOR|g" \
    -e "s|__FONT_FAMILY__|$FONT_FAMILY|g" \
    -e "s|__API_URL__|$API_URL|g" \
  {} +
```

## Serve the Build

```bash
npm run preview        # Vite preview server (test locally)
npx serve dist         # Static file server
```

## Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Sample `nginx.conf` for SPA (all routes → `index.html`):

```nginx
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~* \.(js|css|png|jpg|svg|ico|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

Build and run:

```bash
docker build -t ctrlc-app .
docker run -p 8080:80 ctrlc-app
```
