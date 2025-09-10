import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SHINY_DASHBOARD_URL = import.meta.env.VITE_SHINY_DASHBOARD_URL as string | undefined;

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'project', label: 'About R Project' },
    { id: 'importance', label: 'Why It Matters' },
    { id: 'dataset', label: 'Dataset & Workflow' },
    { id: 'tech', label: 'R Tech Stack' },
    { id: 'team', label: 'Team' },
    { id: 'dashboard', label: 'Shiny Dashboard' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-card backdrop-blur-md rounded-full px-6 py-3 shadow-card">
      <div className="flex gap-2">
        {navItems.map((item) => {
          const isDashboard = item.id === 'dashboard';

          return isDashboard ? (
            SHINY_DASHBOARD_URL ? (
              <a key={item.id} href={SHINY_DASHBOARD_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="nav" size="sm" className="text-xs">
                  {item.label}
                </Button>
              </a>
            ) : (
              <Link key={item.id} to="/dashboard">
                <Button variant="nav" size="sm" className="text-xs">
                  {item.label}
                </Button>
              </Link>
            )
          ) : (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "glow" : "nav"}
              size="sm"
              onClick={() => onNavigate(item.id)}
              className="text-xs"
            >
              {item.label}
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
