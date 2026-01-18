library(caret)
library(dplyr)
library(randomForest)
library(fastshap)

# Load and preprocess the data
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

# Split data
set.seed(123)
trainIndex <- createDataPartition(telco_data$Churn, p = 0.8, list = FALSE, times = 1)
train_data <- telco_data[trainIndex, ]

# Train Control
train_control <- trainControl(
  method = "cv", 
  number = 5, 
  classProbs = TRUE, 
  savePredictions = "final"
)

print("Training Logistic Regression Model...")
logistic_model <- train(
  Churn ~ ., 
  data = train_data,
  method = "glm",
  family = "binomial",
  trControl = train_control
)
saveRDS(logistic_model, "logistic_model.rds")
print("Logistic Regression Model Saved.")

print("Training Random Forest Model...")
rf_model <- train(
  Churn ~ ., 
  data = train_data,
  method = "rf",
  tuneLength = 3,
  trControl = train_control
)
saveRDS(rf_model, "rf_model.rds")
print("Random Forest Model Saved.")
