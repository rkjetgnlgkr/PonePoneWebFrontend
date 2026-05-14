# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run generate
# Nuxt 2 SPA generate outputs 200.html (not index.html); copy it so nginx fallback works
RUN cp dist/200.html dist/index.html

# ── Stage 2: Serve with nginx ────────────────────────────────────────────────
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN printf 'server {\nlisten 80;\nroot /usr/share/nginx/html;\nlocation = /health { default_type text/plain; return 200 "ok"; }\nlocation / { try_files $uri $uri/ /index.html; }\n}\n' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
