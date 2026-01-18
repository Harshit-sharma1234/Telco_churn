# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Accept build argument for Shiny URL
ARG VITE_SHINY_DASHBOARD_URL
ENV VITE_SHINY_DASHBOARD_URL=$VITE_SHINY_DASHBOARD_URL

RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
