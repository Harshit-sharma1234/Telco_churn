export function ProjectSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-background to-muted py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            About the Customer Churn Project
          </h2>
          <p className="text-xl text-accent-light max-w-4xl mx-auto leading-relaxed">
            This landing page showcases my Customer Churn Prediction model built in R.
            Models include Logistic Regression (glmnet) and Random Forest (randomForest)
            trained and tuned with caret. Data wrangling uses tidyverse (dplyr/tidyr),
            visualization uses ggplot2 and plotly, and the final experience is delivered
            via a Shiny dashboard with custom CSS styling.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-card rounded-xl p-8 shadow-card hover:shadow-hover transition-smooth">
            <h3 className="text-2xl font-semibold text-primary mb-4">Problem Statement</h3>
            <p className="text-accent-light leading-relaxed">
              Customer churn is one of the biggest challenges facing businesses today. 
              With acquisition costs rising and competition intensifying, retaining existing 
              customers has become more critical than ever. Our solution identifies at-risk 
              customers before they leave.
            </p>
          </div>

          <div className="bg-gradient-card rounded-xl p-8 shadow-card hover:shadow-hover transition-smooth">
            <h3 className="text-2xl font-semibold text-primary mb-4">R-Based Solution</h3>
            <p className="text-accent-light leading-relaxed">
              Implemented in R using caret for preprocessing, resampling, and model
              selection; glmnet (Logistic Regression) and randomForest for modeling;
              dplyr/tidyr for data wrangling; and ggplot2/plotly for rich visuals.
              A Shiny app provides interactive exploration and scoring.
            </p>
          </div>
        </div>

        <div className="bg-gradient-card rounded-xl p-8 shadow-card">
          <h3 className="text-2xl font-semibold text-primary mb-6 text-center">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h4 className="text-lg font-semibold text-primary mb-2">ML Algorithms</h4>
              <p className="text-sm text-accent-light">Logistic Regression (glmnet), Random Forest</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="text-lg font-semibold text-primary mb-2">Data Pipeline</h4>
              <p className="text-sm text-accent-light">tidyr/dplyr wrangling, caret preprocessing & tuning</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-lg font-semibold text-primary mb-2">Interactive Delivery</h4>
              <p className="text-sm text-accent-light">Shiny dashboard with plotly/ggplot2 visualizations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}