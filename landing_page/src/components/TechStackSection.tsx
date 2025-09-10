export function TechStackSection() {
  const technologies = [
    {
      category: "Data Science & ML",
      tools: [
        { name: "R", description: "Core programming language for statistical computing" },
        { name: "caret", description: "Machine learning framework for training & evaluation" },
        { name: "randomForest", description: "Ensemble method for classification and regression" },
        { name: "glmnet", description: "Regularized regression models (Lasso, Ridge)" },
        { name: "tidyverse", description: "Data wrangling and pipelines (dplyr, tidyr, readr)" }
      ]
    },
    {
      category: "Data Visualization",
      tools: [
        { name: "ggplot2", description: "Powerful grammar of graphics visualization library" },
        { name: "plotly", description: "Interactive plots and dashboards in R" },
        { name: "shiny", description: "Web apps for interactive data visualization" },
        { name: "corrplot", description: "Correlation matrix visualization" }
      ]
    },
    {
      category: "Development & Deployment",
      tools: [
        { name: "RStudio", description: "Integrated development environment for R" },
        { name: "Git", description: "Version control and collaboration" },
        { name: "Docker", description: "Containerization for reproducible environments" },
        { name: "Shiny Server", description: "Deploying Shiny applications" }
      ]
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-muted to-background py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Technology Stack
          </h2>
          <p className="text-xl text-accent-light max-w-4xl mx-auto leading-relaxed">
            R-first stack: caret for modeling, ggplot2/plotly for visuals, tidyr/dplyr
            for data wrangling, and Shiny for interactive dashboards and deployment.
          </p>
        </div>

        <div className="space-y-8">
          {technologies.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="bg-gradient-card rounded-xl p-8 shadow-card hover:shadow-hover transition-smooth"
            >
              <h3 className="text-2xl font-semibold text-primary mb-6 text-center">
                {category.category}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tools.map((tool, toolIndex) => (
                  <div 
                    key={toolIndex}
                    className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-smooth hover:scale-105"
                  >
                    <h4 className="text-lg font-semibold text-primary mb-2">{tool.name}</h4>
                    <p className="text-sm text-accent-light leading-relaxed">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-card rounded-xl p-8 shadow-card text-center">
          <h3 className="text-2xl font-semibold text-primary mb-4">Model Performance</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">89.6%</div>
              <p className="text-sm text-accent-light">Accuracy</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">87.2%</div>
              <p className="text-sm text-accent-light">Precision</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">85.4%</div>
              <p className="text-sm text-accent-light">Recall</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">0.91</div>
              <p className="text-sm text-accent-light">AUC Score</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
