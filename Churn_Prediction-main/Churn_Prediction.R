library(shiny)
library(shinydashboard)
library(readr)
library(dplyr)
library(caret)
library(randomForest)
library(ggplot2)
library(plotly)
library(pROC)
library(DT)
library(fastshap)  # For SHAP explanations

# Load and preprocess the initial data
telco_data <- read.csv("WA_Fn-UseC_-Telco-Customer-Churn.csv")

telco_data <- telco_data %>%
  select(tenure, MonthlyCharges, Contract, PaymentMethod, InternetService, Churn) %>%
  mutate(
    Churn = as.factor(Churn),
    Contract = as.factor(Contract),
    PaymentMethod = as.factor(PaymentMethod),
    InternetService = as.factor(InternetService)
  ) %>%
  mutate(
    tenure = ifelse(tenure < 0, NA, tenure), 
    MonthlyCharges = ifelse(MonthlyCharges < 0, NA, MonthlyCharges)
  ) %>%
  mutate_if(is.numeric, ~ifelse(is.na(.), mean(., na.rm = TRUE), .))

# Split data into training and test sets
set.seed(123)
trainIndex <- createDataPartition(telco_data$Churn, p = 0.8, list = FALSE, times = 1)
train_data <- telco_data[trainIndex, ]
test_data <- telco_data[-trainIndex, ]

#declaring ui
ui <- dashboardPage(
  dashboardHeader(title = "Telco Customer Churn Prediction Dashboard"),
  dashboardSidebar(
    sidebarMenu(id = "tabs",
                menuItem("Intro", tabName = "intro", icon = icon("info-circle")),
                menuItem("Data Summary", tabName = "data_summary", icon = icon("table")),
                menuItem("Model Summary", tabName = "model_summary", icon = icon("chart-bar")),
                menuItem("Prediction", tabName = "prediction", icon = icon("calculator")),
                menuItem("Visualizations", tabName = "visualizations", icon = icon("chart-line")),
                menuItem("Feature Importance", tabName = "feature_importance", icon = icon("sliders-h")),
                menuItem("ROC Curve", tabName = "roc_curve", icon = icon("signal")),
                menuItem("Model Metrics", tabName = "model_metrics", icon = icon("list-alt")),
                menuItem("SHAP Explainability", tabName = "shap_explain", icon = icon("lightbulb"))
               
    )
  ),
  dashboardBody(
    tags$head(
      tags$link(rel = "stylesheet", type = "text/css", href = "styles.css"),
      tags$script(src = "scripts.js"),
      tags$link(
        rel = "stylesheet",
        href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      )
    ),
    tabItems(
      # Intro Tab
      tabItem(
        tabName = "intro",
        fluidRow(
          column(
            12,
            align = "center",
            tags$div(
              class = "landing-page",
              tags$header(
                class = "hero",
                tags$h1("Welcome to Telco Customer Churn Prediction"),
                tags$p(class = "tagline", "Predicting and preventing customer churn using data-driven insights.")
                
              )
            )
          )
        )
      ),
      # Data Summary Tab with Data Upload
      tabItem(
        tabName = "data_summary",
        fluidRow(
          column(12,
                 h3("Data Summary"),
                 tags$p("View the summary of the default Telco Customer Churn dataset or upload your own."),
                 
                 # File Upload
                 fileInput("data_upload", "Upload CSV File", accept = ".csv"),
                 tags$p("Note: Uploaded CSV must contain columns: tenure, MonthlyCharges, Contract, PaymentMethod, InternetService, Churn"),
                 verbatimTextOutput("upload_status"),
                 br(),
                 
                 # Structure of the Data
                 h4("Structure of the Dataset"),
                 DT::dataTableOutput("data_structure"),
                 br(),
                 
                 # Numerical Summary
                 h4("Summary Statistics (Numerical Columns)"),
                 DT::dataTableOutput("data_summary_table"),
                 br(),
                 
                 # Categorical Summary
                 h4("Categorical Data Summary"),
                 DT::dataTableOutput("categorical_summary_table"),
                 br(),
                 
                 # Missing Values
                 h4("Missing Values per Column"),
                 DT::dataTableOutput("missing_values_table")
          )
        )
      ),
      # Model Summary Tab
      tabItem(
        tabName = "model_summary",
        fluidRow(
          column(12,
                 h3(" Model Summary"),
                 tags$p("Train your models and view performance metrics."),
                 
                 # Train Button
                 actionButton("train_models", " Train Models", class = "btn-primary"),
                 br(), br(),
                 
                 # Threshold slider (for logistic)
                 sliderInput("threshold", "Classification Threshold (Logistic Regression):",
                             min = 0.1, max = 0.9, value = 0.5, step = 0.01),
                 br(),
                 
                 # Model Summary
                 h4("Model Details & Accuracy"),
                 verbatimTextOutput("model_summary"),
                 br(),
                 
                
                 # Download buttons
                 h4("Download Trained Models"),
                 downloadButton("download_logistic", "Download Logistic Model"),
                 downloadButton("download_rf", "Download Random Forest Model")
          )
        )
      ),
      
      # Prediction Tab
      tabItem(
        tabName = "prediction",
        sidebarLayout(
          sidebarPanel(
            numericInput("tenure", "Tenure (months)", value = 12, min = 0),
            numericInput("MonthlyCharges", "Monthly Charges", value = 50, min = 0),
            selectInput("Contract", "Contract Type", choices = c("Month-to-month", "One year", "Two year")),
            selectInput("PaymentMethod", "Payment Method", choices = c("Electronic check", "Mailed check", "Bank transfer (automatic)", "Credit card (automatic)")),
            selectInput("InternetService", "Internet Service", choices = c("DSL", "Fiber optic", "No")),
            actionButton("predict", "Predict Churn"),
            sliderInput("threshold", "Logistic Prediction Threshold", min = 0, max = 1, value = 0.5, step = 0.05)
          ),
          mainPanel(verbatimTextOutput("predictions"))
        )
      ),
      # Visualizations Tab
      tabItem(
        tabName = "visualizations",
        tabsetPanel(
          tabPanel("2D Visualizations",
                   plotlyOutput("tenure_dist"),
                   plotlyOutput("monthly_charges_dist"),
                   plotlyOutput("churn_bar")),
          tabPanel("3D Visualizations",
                   plotlyOutput("scatter_3d"),
                   plotlyOutput("surface_plot"),
                   plotlyOutput("prob_scatter_3d"))
        )
      ),
      # Feature Importance Tab
      tabItem(
        tabName = "feature_importance",
        plotlyOutput("feature_importance")
      ),
      # ROC Curve Tab
      tabItem(
        tabName = "roc_curve",
        plotlyOutput("roc_curve")
      ),
      # Model Metrics Tab
      tabItem(
        tabName = "model_metrics",
        fluidRow(
          column(6,
                 h4("Logistic Regression Metrics"),
                 verbatimTextOutput("log_metrics")
          ),
          column(6,
                 h4("Random Forest Metrics"),
                 verbatimTextOutput("rf_metrics")
          )
        )
      ),
      # SHAP Explainability Tab
      tabItem(
        tabName = "shap_explain",
        fluidRow(
          column(12,
                 h3("SHAP Explainability"),
                 tags$p("SHAP summary plot for Random Forest model, showing feature contributions to predictions."),
                 plotlyOutput("shap_summary")
          )
        )
      )
     
    )
  )
)

# Server Logic
server <- function(input, output, session) {
  
  # Reactive value to store the dataset (default or uploaded)
  data_source <- reactiveVal(telco_data)
  
  # Reactive values for train and test data
  data_splits <- reactiveValues(train = train_data, test = test_data)
  
  # Reactive value to store upload status
  upload_status <- reactiveVal("Using default dataset.")
  
  # Handle data upload
  observeEvent(input$data_upload, {
    req(input$data_upload)
    tryCatch({
      uploaded_data <- read.csv(input$data_upload$datapath)
      # Validate uploaded data
      required_cols <- c("tenure", "MonthlyCharges", "Contract", "PaymentMethod", "InternetService", "Churn")
      if (!all(required_cols %in% colnames(uploaded_data))) {
        upload_status("Error: Uploaded CSV must contain columns: tenure, MonthlyCharges, Contract, PaymentMethod, InternetService, Churn")
        showNotification("Error: Missing required columns.", type = "error")
        return()
      }
      # Validate data types
      if (!is.numeric(uploaded_data$tenure) || !is.numeric(uploaded_data$MonthlyCharges)) {
        upload_status("Error: tenure and MonthlyCharges must be numeric.")
        showNotification("Error: tenure and MonthlyCharges must be numeric.", type = "error")
        return()
      }
      # Preprocess uploaded data
      uploaded_data <- uploaded_data %>%
        select(all_of(required_cols)) %>%
        mutate(
          Churn = as.factor(Churn),
          Contract = as.factor(Contract),
          PaymentMethod = as.factor(PaymentMethod),
          InternetService = as.factor(InternetService)
        ) %>%
        mutate(
          tenure = ifelse(tenure < 0, NA, tenure),
          MonthlyCharges = ifelse(MonthlyCharges < 0, NA, MonthlyCharges)
        ) %>%
        mutate_if(is.numeric, ~ifelse(is.na(.), mean(., na.rm = TRUE), .))
      
      # Update data_source
      data_source(uploaded_data)
      upload_status("Data uploaded and processed successfully!")
      showNotification("Data uploaded successfully!", type = "message")
      
      # Update train/test split with new data
      set.seed(123)
      trainIndex <- createDataPartition(uploaded_data$Churn, p = 0.8, list = FALSE, times = 1)
      data_splits$train <- uploaded_data[trainIndex, ]
      data_splits$test <- uploaded_data[-trainIndex, ]
      
      # Reset models to ensure new data is used
      models$logistic <- NULL
      models$rf <- NULL
      models$logistic_pred_prob <- NULL
      models$rf_pred_prob <- NULL
      
      # Update selectInput choices to match uploaded data levels
      updateSelectInput(session, "Contract", choices = levels(data_splits$train$Contract))
      updateSelectInput(session, "PaymentMethod", choices = levels(data_splits$train$PaymentMethod))
      updateSelectInput(session, "InternetService", choices = levels(data_splits$train$InternetService))
    }, error = function(e) {
      upload_status(paste("Error processing uploaded file:", e$message))
      showNotification(paste("Error processing uploaded file:", e$message), type = "error")
    })
  })
  
  # Display upload status
  output$upload_status <- renderText({
    upload_status()
  })
  
  # Reactive values for models and predictions
  models <- reactiveValues(logistic = NULL, rf = NULL, logistic_pred_prob = NULL, rf_pred_prob = NULL)
  
 
  # Data Summary Outputs
  output$data_structure <- DT::renderDataTable({
    req(data_source())
    structure_data <- capture.output(str(data_source()))
    structure_df <- data.frame(Structure = structure_data)
    DT::datatable(structure_df,
                  options = list(pageLength = 10,dom='t'),
                  rownames = FALSE,
                  style = "bootstrap4",
                  class = "cell-border stripe")
  })
  #Numerical Summary
  
  output$data_summary_table <- DT::renderDataTable({
    req(data_source())
    numeric_df <- data_source() %>% dplyr::select(where(is.numeric))
    
    summary_df <- data.frame(
      Feature = names(numeric_df),
      Min = sapply(numeric_df, min),
      Max = sapply(numeric_df, max),
      Mean = sapply(numeric_df, mean),
      Median = sapply(numeric_df, median),
      SD = sapply(numeric_df, sd)
    )
    
    DT::datatable(summary_df,
                  options = list(pageLength = 5),
                  rownames = FALSE,
                  style = "bootstrap4",
                  class = "cell-border stripe")
  })
  #categorical summary
  
  output$categorical_summary_table <- DT::renderDataTable({
    req(data_source())
    cat_df <- data_source() %>% dplyr::select(where(is.factor))
    
    cat_summary <- lapply(cat_df, function(col) {
      tbl <- table(col)
      data.frame(
        Category = names(tbl),
        Count = as.integer(tbl),
        Percentage = round(100 * prop.table(tbl), 1)
      )
    })
    
    summary_table <- do.call(rbind, Map(function(var, df) {
      df$Feature <- var
      df
    }, names(cat_summary), cat_summary))
    
    DT::datatable(summary_table,
                  options = list(pageLength = 10),
                  rownames = FALSE,
                  style = "bootstrap4",
                  class = "cell-border stripe")
  })
  
 #Missing values
  output$missing_values_table <- DT::renderDataTable({
    req(data_source())
    missing_vals <- sapply(data_source(), function(x) sum(is.na(x)))
    missing_df <- data.frame(
      Feature = names(missing_vals),
      Missing_Count = missing_vals
    )
    
    DT::datatable(missing_df,
                  options = list(pageLength = 10),
                  rownames = FALSE,
                  style = "bootstrap4",
                  class = "cell-border stripe")
  })
  
  
  # Reactive storage for models and predictions
  models <- reactiveValues(
    logistic = NULL,
    rf = NULL,
    logistic_pred_prob = NULL,
    rf_pred_prob = NULL
  )
  
  # Train models on button click
  observeEvent(input$train_models, {
    req(data_splits$train)
    
    showNotification("Training models... Please wait.", type = "message", duration = NULL)
    
    train_control <- trainControl(
      method = "cv", 
      number = 5, 
      classProbs = TRUE, 
      savePredictions = "final"
    )
    
    # Logistic Regression
    models$logistic <- train(
      Churn ~ ., 
      data = data_splits$train,
      method = "glm",
      family = "binomial",
      trControl = train_control
    )
    
    # Random Forest
    models$rf <- train(
      Churn ~ ., 
      data = data_splits$train,
      method = "rf",
      tuneLength = 3,
      trControl = train_control
    )
    
    # Generate prediction probabilities
    models$logistic_pred_prob <- predict(models$logistic, data_splits$test, type = "prob")[, "Yes"]
    models$rf_pred_prob <- predict(models$rf, data_splits$test, type = "prob")[, "Yes"]
    
    showNotification("✅ Models trained successfully!", type = "message")
  })
  
  
  # Download logistic model
  output$download_logistic <- downloadHandler(
    filename = function() { "logistic_model.rds" },
    content = function(file) {
      req(models$logistic)
      saveRDS(models$logistic, file)
    }
  )
  
  # Download RF model
  output$download_rf <- downloadHandler(
    filename = function() { "rf_model.rds" },
    content = function(file) {
      req(models$rf)
      saveRDS(models$rf, file)
    }
  )
  
  
  # Model summaries and accuracies
  output$model_summary <- renderPrint({
    req(models$logistic, models$rf)
    
    list(
      `Logistic Regression CV Accuracy` = round(max(models$logistic$results$Accuracy, na.rm = TRUE), 4),
      ` Random Forest CV Accuracy` = round(max(models$rf$results$Accuracy, na.rm = TRUE), 4),
      ` Logistic Regression Summary` = summary(models$logistic$finalModel),
      ` Random Forest Model Info` = models$rf$finalModel
    )
  })
  
  
  # Logistic Regression Metrics
  logistic_metrics <- reactive({
    req(models$logistic_pred_prob, input$threshold)
    threshold <- input$threshold
    predicted <- factor(ifelse(models$logistic_pred_prob > threshold, "Yes", "No"), levels = c("No", "Yes"))
    actual <- data_splits$test$Churn
    caret::confusionMatrix(predicted, actual, positive = "Yes")
  })
  
  # Random Forest Metrics
  rf_metrics <- reactive({
    req(models$rf)
    predicted <- predict(models$rf, data_splits$test)
    actual <- data_splits$test$Churn
    caret::confusionMatrix(predicted, actual, positive = "Yes")
  })
  
  output$log_metrics <- renderPrint({
    logistic_metrics()
  })
  
  output$rf_metrics <- renderPrint({
    rf_metrics()
  })
  
  
  # Predictions for user input
  observeEvent(input$predict, {
    prediction_data <- data.frame(
      tenure = as.numeric(input$tenure),
      MonthlyCharges = as.numeric(input$MonthlyCharges),
      Contract = factor(input$Contract, levels = levels(data_splits$train$Contract)),
      PaymentMethod = factor(input$PaymentMethod, levels = levels(data_splits$train$PaymentMethod)),
      InternetService = factor(input$InternetService, levels = levels(data_splits$train$InternetService))
    )
    req(models$logistic, models$rf)
    logistic_pred <- predict(models$logistic, prediction_data, type = "prob")[, "Yes"]
    rf_pred <- predict(models$rf, prediction_data)
    output$predictions <- renderPrint({
      list(
        `Logistic Prediction` = ifelse(logistic_pred > input$threshold, "Yes", "No"),
        `Logistic Probability` = round(logistic_pred, 4),
        `Random Forest Prediction` = as.character(rf_pred)
      )
    })
  })
  
  # Feature Importance
  output$feature_importance <- renderPlotly({
    req(models$rf)
    if (inherits(models$rf$finalModel, "randomForest")) {
      imp <- randomForest::importance(models$rf$finalModel)
      feature_importance_df <- data.frame(Feature = rownames(imp), Importance = imp[, 1])
      plot_ly(feature_importance_df, x = ~Feature, y = ~Importance, type = "bar", 
              marker = list(color = "#1f77b4"))
    }
  })
  
  # SHAP Summary Plot
  output$shap_summary <- renderPlotly({
    req(models$rf)
    if (inherits(models$rf$finalModel, "randomForest")) {
      # Create a prediction function for fastshap
      pred_fun <- function(object, newdata) {
        predict(object, newdata, type = "prob")[, "Yes"]
      }
      # Prepare numeric matrix for SHAP computation
      formula <- as.formula("~ . - Churn")
      X_numeric <- model.matrix(formula, data = data_splits$train)[, -1]  # Remove intercept column
      # Compute SHAP values
      shap_vals <- fastshap::explain(models$rf$finalModel, 
                                     X = X_numeric, 
                                     pred_wrapper = pred_fun, nsim = 10)
      # Create SHAP summary plot
      shap_df <- data.frame(Feature = colnames(X_numeric), 
                            SHAP = colMeans(abs(shap_vals)))
      plot_ly(shap_df, x = ~Feature, y = ~SHAP, type = "bar", 
              marker = list(color = "#ff7f0e"))
    }
  })
  
  # ROC Curve
  output$roc_curve <- renderPlotly({
    req(models$logistic_pred_prob, models$rf_pred_prob)
    logistic_roc <- pROC::roc(data_splits$test$Churn, models$logistic_pred_prob, direction = "<")
    rf_roc <- pROC::roc(data_splits$test$Churn, models$rf_pred_prob, direction = "<")
    logistic_roc_df <- data.frame(FPR = 1 - logistic_roc$specificities, TPR = logistic_roc$sensitivities, Model = "Logistic Regression")
    rf_roc_df <- data.frame(FPR = 1 - rf_roc$specificities, TPR = rf_roc$sensitivities, Model = "Random Forest")
    roc_data <- rbind(logistic_roc_df, rf_roc_df)
    ggplotly(ggplot(roc_data, aes(x = FPR, y = TPR, color = Model)) +
               geom_line(size = 1) +
               labs(title = "ROC Curve", x = "False Positive Rate", y = "True Positive Rate") +
               theme_minimal())
  })
  
  # 2D Visualizations
  output$tenure_dist <- renderPlotly({
    p <- ggplot(data_source(), aes(x = tenure, fill = Churn)) +
      geom_histogram(bins = 30, position = "dodge") +
      labs(title = "Distribution of Tenure", x = "Tenure (months)", y = "Count") +
      scale_fill_manual(values = c("No" = "skyblue", "Yes" = "salmon")) +
      theme_minimal()
    ggplotly(p)
  })
  
  output$monthly_charges_dist <- renderPlotly({
    p <- ggplot(data_source(), aes(x = MonthlyCharges, fill = Churn)) +
      geom_histogram(bins = 30, position = "dodge") +
      labs(title = "Distribution of Monthly Charges", x = "Monthly Charges", y = "Count") +
      scale_fill_manual(values = c("No" = "skyblue", "Yes" = "salmon")) +
      theme_minimal()
    ggplotly(p)
  })
  
  output$churn_bar <- renderPlotly({
    p <- ggplot(data_source(), aes(x = Churn, fill = Churn)) +
      geom_bar() +
      labs(title = "Churn Count", x = "Churn", y = "Count") +
      scale_fill_manual(values = c("No" = "skyblue", "Yes" = "salmon")) +
      theme_minimal()
    ggplotly(p)
  })
  
  # 3D Visualizations
  output$scatter_3d <- renderPlotly({
    plot_ly(data_source(), x = ~tenure, y = ~MonthlyCharges, z = ~as.numeric(Churn), 
            color = ~Churn, 
            colors = c("skyblue", "salmon"),
            type = "scatter3d", 
            mode = "markers")
  })
  
  output$surface_plot <- renderPlotly({
    req(models$rf)
    # Create a grid for tenure and MonthlyCharges
    tenure_seq <- seq(min(data_source()$tenure), max(data_source()$tenure), length.out = 50)
    charges_seq <- seq(min(data_source()$MonthlyCharges), max(data_source()$MonthlyCharges), length.out = 50)
    grid <- expand.grid(tenure = tenure_seq, MonthlyCharges = charges_seq)
    # Add categorical variables with most common levels
    grid$Contract <- factor(names(sort(table(data_source()$Contract), decreasing = TRUE)[1]), levels = levels(data_source()$Contract))
    grid$PaymentMethod <- factor(names(sort(table(data_source()$PaymentMethod), decreasing = TRUE)[1]), levels = levels(data_source()$PaymentMethod))
    grid$InternetService <- factor(names(sort(table(data_source()$InternetService), decreasing = TRUE)[1]), levels = levels(data_source()$InternetService))
    # Predict churn probabilities
    probs <- predict(models$rf, grid, type = "prob")[, "Yes"]
    # Create matrix for surface plot
    z_matrix <- matrix(probs, nrow = 50, ncol = 50)
    plot_ly(x = ~tenure_seq, y = ~charges_seq, z = ~z_matrix, type = "surface") %>%
      layout(scene = list(
        xaxis = list(title = "Tenure"),
        yaxis = list(title = "Monthly Charges"),
        zaxis = list(title = "Churn Probability")
      ))
  })
  
  output$prob_scatter_3d <- renderPlotly({
    req(models$rf)
    probs <- predict(models$rf, data_source(), type = "prob")[, "Yes"]
    plot_ly(data_source(), x = ~tenure, y = ~MonthlyCharges, z = ~probs, 
            color = ~probs, 
            colors = "viridis",  # Fixed color scale name
            type = "scatter3d", 
            mode = "markers") %>%
      layout(scene = list(
        xaxis = list(title = "Tenure"),
        yaxis = list(title = "Monthly Charges"),
        zaxis = list(title = "Churn Probability")
      ))
  })
}

# Run the Shiny app
shinyApp(ui = ui, server = server)