// src/pages/Dashboard.tsx

export default function DashboardSection() {
    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <iframe
          src="http://127.0.0.1:5892" // Your local Shiny app URL
          title="Shiny Dashboard"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </div>
    );
  }
  