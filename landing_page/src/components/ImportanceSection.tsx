export function ImportanceSection() {
  const stats = [
    { number: "5x", label: "Cost to acquire vs retain", description: "It costs 5 times more to acquire a new customer than to retain an existing one" },
    { number: "25%", label: "Average churn rate", description: "Businesses lose 25% of their customers annually on average" },
    { number: "$1.6T", label: "Global churn impact", description: "Customer churn costs businesses $1.6 trillion globally each year" },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-muted to-background py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Why Predicting Churn Matters
          </h2>
          <p className="text-xl text-accent-light max-w-4xl mx-auto leading-relaxed">
            Understanding and preventing customer churn is crucial for sustainable business growth. 
            Early prediction enables proactive retention strategies that can transform your bottom line.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-gradient-card rounded-xl p-8 text-center shadow-card hover:shadow-hover transition-smooth hover:scale-105"
            >
              <div className="text-5xl font-bold text-primary mb-4">{stat.number}</div>
              <h3 className="text-xl font-semibold text-primary mb-3">{stat.label}</h3>
              <p className="text-accent-light text-sm leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-card rounded-xl p-8 shadow-card">
          <h3 className="text-2xl font-semibold text-primary mb-6 text-center">Business Impact</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-primary mb-4">Benefits of Churn Prediction</h4>
              <ul className="space-y-3 text-accent-light">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Reduce customer acquisition costs by up to 80%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Increase customer lifetime value by 15-25%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Improve targeted marketing ROI by 300%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Enable personalized retention strategies</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-primary mb-4">Key Use Cases</h4>
              <ul className="space-y-3 text-accent-light">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Telecommunications and subscription services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>E-commerce and retail platforms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>SaaS and cloud service providers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Financial services and banking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}