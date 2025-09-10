# telco_customer_churn_prediction_app

This repository contains two parts:

- `telco_customer_churn_prediction_app/` (root): documentation and getting started
- `shiny_dashboard_friendly_r_assistant_landing_page/` (the React app)

## How to run locally

1. Go into the React app folder:
```
cd shiny_dashboard_friendly_r_assistant_landing_page
```
2. Install dependencies and start the dev server:
```
npm i
npm run dev
```
3. Configure your Shiny URL so the Dashboard button opens it:
Create a `.env` file inside `shiny_dashboard_friendly_r_assistant_landing_page` with
```
VITE_SHINY_DASHBOARD_URL=http://127.0.0.1:5892
```
4. Start your Shiny app on the same URL/port.

## Production

On your hosting provider (Vercel/Netlify), set an env var:
`VITE_SHINY_DASHBOARD_URL=https://your-public-shiny-url` and build the app.


