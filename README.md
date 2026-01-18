# Telco Customer Churn Prediction App

This project consists of two components:
1. **Frontend**: A React landing page with a modern UI.
2. **Backend**: An R/Shiny dashboard for churn prediction and data analysis.

## Project Structure
- `Churn_Prediction-main/`: Contains the R Shiny application.
- `landing_page/`: Contains the React frontend application.

## 🚀 Running with Docker (Recommended)

This project is containerized for easy deployment.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Quick Start
1. Open a terminal in the root directory.
2. Run the following command to build and start the services:
   ```bash
   docker-compose up --build
   ```
3. Access the applications:
   - **Landing Page**: [http://localhost:8080](http://localhost:8080)
   - **Shiny Dashboard**: [http://localhost:3838](http://localhost:3838)

The applications are configured to communicate automatically. The landing page's "Dashboard" button will redirect to the Shiny app.

## Development (Manual)

### React App
1. Navigate to `landing_page`: `cd landing_page`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`
4. Create `.env` and set `VITE_SHINY_DASHBOARD_URL` to your local Shiny running instance.

### Shiny App
1. Open `Churn_Prediction-main/Churn_Prediction.R` in RStudio or run via Rscript.
2. Install required libraries (`shiny`, `shinydashboard`, `caret`, etc.).
