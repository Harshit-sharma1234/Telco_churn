// src/pages/Dashboard.tsx

export default function Dashboard() {
    const envUrl = import.meta.env.VITE_SHINY_DASHBOARD_URL as string | undefined;

    // Always redirect to the external Shiny URL when provided
    if (envUrl && typeof window !== 'undefined') {
      window.location.replace(envUrl);
      return null;
    }

    if (!envUrl) {
      // eslint-disable-next-line no-console
      console.warn(
        "VITE_SHINY_DASHBOARD_URL is not set. Set it in your .env to point to your Shiny app."
      );
    }

    const showLocalNotice = !envUrl;

    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        {showLocalNotice && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            padding: "8px 12px",
            background: "rgba(99,102,241,0.15)",
            color: "#a5b4fc",
            fontSize: 12,
            textAlign: "center",
            backdropFilter: "blur(6px)",
          }}>
            Set VITE_SHINY_DASHBOARD_URL in .env to your Shiny URL to enable redirect.
          </div>
        )}
        {/* Fallback UI when env var is not set */}
        <div style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#a5b4fc"
        }}>
          VITE_SHINY_DASHBOARD_URL not configured.
        </div>
      </div>
    );
  }
  