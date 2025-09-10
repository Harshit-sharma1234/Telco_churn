export function DatasetSection() {
  const features = [
    { name: "Customer ID", description: "Unique identifier for each customer", type: "Categorical" },
    { name: "Gender", description: "Customer gender (Male/Female)", type: "Categorical" },
    { name: "Senior Citizen", description: "Whether customer is a senior citizen", type: "Binary" },
    { name: "Partner", description: "Whether customer has a partner", type: "Binary" },
    { name: "Dependents", description: "Whether customer has dependents", type: "Binary" },
    { name: "Tenure", description: "Number of months customer has stayed", type: "Numerical" },
    { name: "Phone Service", description: "Whether customer has phone service", type: "Binary" },
    { name: "Internet Service", description: "Type of internet service", type: "Categorical" },
    { name: "Monthly Charges", description: "Monthly charges for services", type: "Numerical" },
    { name: "Total Charges", description: "Total amount charged", type: "Numerical" },
    { name: "Churn", description: "Whether customer churned (target variable)", type: "Binary" },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-background to-muted py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Dataset & R Workflow
          </h2>
          <p className="text-xl text-accent-light max-w-4xl mx-auto leading-relaxed">
            Based on the Telco Customer Churn dataset. Data wrangling with tidyverse
            (dplyr/tidyr), visualization with ggplot2 and plotly, and modeling via caret
            using Logistic Regression (glmnet) and Random Forest. Results are surfaced in an
            interactive Shiny app.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-card rounded-xl p-8 text-center shadow-card hover:shadow-hover transition-smooth">
            <div className="text-4xl font-bold text-primary mb-2">7,043</div>
            <h3 className="text-lg font-semibold text-primary mb-2">Customer Records</h3>
            <p className="text-sm text-accent-light">Complete customer profiles with service history</p>
          </div>
          
          <div className="bg-gradient-card rounded-xl p-8 text-center shadow-card hover:shadow-hover transition-smooth">
            <div className="text-4xl font-bold text-primary mb-2">21</div>
            <h3 className="text-lg font-semibold text-primary mb-2">Feature Variables</h3>
            <p className="text-sm text-accent-light">Comprehensive customer and service attributes</p>
          </div>
          
          <div className="bg-gradient-card rounded-xl p-8 text-center shadow-card hover:shadow-hover transition-smooth">
            <div className="text-4xl font-bold text-primary mb-2">26.5%</div>
            <h3 className="text-lg font-semibold text-primary mb-2">Churn Rate</h3>
            <p className="text-sm text-accent-light">Balanced dataset for effective model training</p>
          </div>
        </div>

        <div className="bg-gradient-card rounded-xl p-8 shadow-card">
          <h3 className="text-2xl font-semibold text-primary mb-6 text-center">Dataset Features</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="text-left py-3 px-4 font-semibold text-primary">Feature</th>
                  <th className="text-left py-3 px-4 font-semibold text-primary">Description</th>
                  <th className="text-left py-3 px-4 font-semibold text-primary">Type</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-muted/20 hover:bg-primary/5 transition-smooth"
                  >
                    <td className="py-3 px-4 font-medium text-accent-light">{feature.name}</td>
                    <td className="py-3 px-4 text-accent-light">{feature.description}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        feature.type === 'Numerical' 
                          ? 'bg-primary/20 text-primary' 
                          : feature.type === 'Binary'
                          ? 'bg-secondary/20 text-secondary-foreground'
                          : 'bg-accent/20 text-accent-foreground'
                      }`}>
                        {feature.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}