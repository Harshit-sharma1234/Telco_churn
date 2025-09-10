# Customer Churn Prediction (R + Shiny) – Frontend

This repository contains the landing site for a Customer Churn Prediction project built in R using Logistic Regression (glmnet) and Random Forest (randomForest). The interactive dashboard is delivered via Shiny and can be linked from this frontend.

## Tech Stack (Frontend)

- Vite + React + TypeScript
- Tailwind CSS + shadcn-ui

## Connect to your Shiny Dashboard

Set the environment variable `VITE_SHINY_DASHBOARD_URL` to the public URL of your Shiny app. The navigation button "Shiny Dashboard" will open it in a new tab, and the `/dashboard` route embeds it in an iframe.

### Local development proxy

During `npm run dev`, the app proxies requests from `/shiny` to your Shiny server:

- If `VITE_SHINY_DASHBOARD_URL` is set, the proxy targets that URL
- Otherwise it defaults to `http://127.0.0.1:6698`

This allows the iframe to load from the same origin (avoids x-frame-options/CORS issues). Ensure your Shiny app runs at the target URL and is reachable from your machine.

### Local .env

Create a `.env` file at the project root (same folder as `package.json`). Example values:

```
# Local development (running Shiny on your machine)
VITE_SHINY_DASHBOARD_URL=http://127.0.0.1:6698

# Production (hosted Shiny app)
# VITE_SHINY_DASHBOARD_URL=https://your-deployed-shiny-app.example.com
```

## Getting Started

```
npm i
npm run dev
```

Open the dev server URL in your browser. Update content in `src/components` and routes in `src/pages`.

If `VITE_SHINY_DASHBOARD_URL` is not set, the `/dashboard` page will fall back to `http://127.0.0.1:6698` and display a small notice.

On local dev, the iframe src is `/shiny`, which the dev server proxies to your Shiny instance.

### Auto-start Shiny with the frontend (optional)

Provide your Shiny app directory and run both servers together:

PowerShell (Windows):
```
$env:SHINY_APP_DIR="C:/absolute/path/to/your/shiny/app"; npm run dev:all
```

or run them separately:
```
# Terminal 1
npm run dev

# Terminal 2
$env:SHINY_APP_DIR="C:/absolute/path/to/your/shiny/app"; npm run dev:shiny
```

You can customize port/host:
```
$env:SHINY_PORT=6698; $env:SHINY_HOST="0.0.0.0"; npm run dev:shiny
```

## R Project (Backend)

The R modeling stack uses caret, tidyverse (dplyr/tidyr), ggplot2, and plotly, with models in glmnet (Logistic Regression) and randomForest. The Shiny app should be hosted locally or on a server (e.g., Shiny Server or shinyapps.io).

## Deployment

Deploy the frontend to any static host (Vercel, Netlify, etc.). Ensure `VITE_SHINY_DASHBOARD_URL` points to the live Shiny app.

Important:
- In production builds, visiting `/dashboard` will redirect users to `VITE_SHINY_DASHBOARD_URL` immediately.
- The navbar button also opens the same Shiny URL in a new tab.

Vercel example:
1. Set an Environment Variable `VITE_SHINY_DASHBOARD_URL` = `https://your-shiny.example.com`
2. Build Command: `npm run build`
3. Output Directory: `dist`
