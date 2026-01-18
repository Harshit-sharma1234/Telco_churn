# Base image
FROM rocker/shiny:latest

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libcurl4-gnutls-dev \
    libssl-dev \
    libxml2-dev \
    zlib1g-dev \
    libpng-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install R packages
RUN R -e "install.packages(c('shinydashboard', 'readr', 'dplyr', 'caret', 'randomForest', 'ggplot2', 'plotly', 'pROC', 'DT', 'fastshap'), repos='https://cran.rstudio.com/')"

# Copy application files
COPY Churn_Prediction.R /srv/shiny-server/app.R
COPY www /srv/shiny-server/www
COPY WA_Fn-UseC_-Telco-Customer-Churn.csv /srv/shiny-server/WA_Fn-UseC_-Telco-Customer-Churn.csv
COPY cleaned_telco_data_reduced.csv /srv/shiny-server/cleaned_telco_data_reduced.csv
COPY train_models.R /srv/shiny-server/train_models.R

# Pre-train models during build
WORKDIR /srv/shiny-server
RUN Rscript train_models.R

# Expose port
EXPOSE 3838

# Run Shiny Server
CMD ["/usr/bin/shiny-server"]
