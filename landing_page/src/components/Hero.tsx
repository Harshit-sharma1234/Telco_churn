import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";

interface HeroProps {
  onNavigate: (section: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section 
      className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary animate-fade-in-up [animation-delay:0.2s]">
          Customer Churn Prediction in R
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-accent-light max-w-3xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:0.4s]">
          End-to-end churn modeling using Random Forest and Logistic Regression
          with caret and tidyverse. Interactive exploration via Shiny; visuals
          built with ggplot2 and plotly; polished UI with custom CSS.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up [animation-delay:0.6s]">
          <Button 
            variant="hero" 
            size="xl"
            onClick={() => onNavigate('project')}
          >
            Explore the R Project
          </Button>
          
          <Button 
            variant="nav" 
            size="xl"
            onClick={() => onNavigate('team')}
          >
            Meet the Team
          </Button>
        </div>
      </div>
      
      {/* Floating boxes */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-6 animate-fade-in-up [animation-delay:0.8s]">
        <div className="bg-gradient-card backdrop-blur-sm rounded-lg p-4 text-center min-w-[200px] shadow-card hover:shadow-hover transition-smooth hover:scale-105">
          <h3 className="text-lg font-semibold text-primary mb-2">Advanced ML</h3>
          <p className="text-sm text-accent-light">State-of-the-art algorithms for accurate predictions</p>
        </div>
        
        <div className="bg-gradient-card backdrop-blur-sm rounded-lg p-4 text-center min-w-[200px] shadow-card hover:shadow-hover transition-smooth hover:scale-105">
          <h3 className="text-lg font-semibold text-primary mb-2">Real-time Analysis</h3>
          <p className="text-sm text-accent-light">Instant insights from your customer data</p>
        </div>
        
        <div className="bg-gradient-card backdrop-blur-sm rounded-lg p-4 text-center min-w-[200px] shadow-card hover:shadow-hover transition-smooth hover:scale-105">
          <h3 className="text-lg font-semibold text-primary mb-2">Actionable Insights</h3>
          <p className="text-sm text-accent-light">Turn predictions into retention strategies</p>
        </div>
      </div>
    </section>
  );
}