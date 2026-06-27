import React from "react";

export default function Dashboard({ data, onReset }) {
  // Pure semantic color mapping (Minimalist tint overlays)
  const getRiskStyles = (score) => {
    if (score === "High") return { bg: "#fef2f2", text: "#991b1b", border: "#fca5a5" };
    if (score === "Medium") return { bg: "#fff7ed", text: "#c2410c", border: "#fdba74" };
    return { bg: "#f0fdf4", text: "#166534", border: "#86efac" };
  };

  const risk = getRiskStyles(data.riskScore);

  return (
    <div style={{
      maxWidth: "1000px",
      margin: "40px auto",
      padding: "32px",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      border: "1px solid #e4e4e7",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)"
    }}>
      
      {/* Top Utility Bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderBottom: "1px solid #f4f4f5",
        paddingBottom: "24px",
        marginBottom: "32px"
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#09090b", margin: 0 }}>
              {data.projectName}
            </h2>
            <span style={{
              padding: "4px 10px",
              backgroundColor: risk.bg,
              color: risk.text,
              border: `1px solid ${risk.border}`,
              borderRadius: "9999px",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.5px"
            }}>
              {data.riskScore} Risk
            </span>
          </div>
          <p style={{ fontSize: "14px", color: "#71717a", margin: "6px 0 0 0" }}>
            AI-Generated Scope Metrics & Analytical Audit
          </p>
        </div>
        
        <button onClick={onReset} style={{
          padding: "10px 16px",
          backgroundColor: "#09090b",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
          transition: "background-color 0.2s"
        }}>
          Analyze Another Brief
        </button>
      </div>

      {/* Modern Bento-Style Matrix Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 0.8fr",
        gap: "24px"
      }}>
        
        {/* Module A: Deliverables (Feature Checklist) */}
        <div style={{
          padding: "24px",
          border: "1px solid #e4e4e7",
          borderRadius: "12px",
          backgroundColor: "#fafafa"
        }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#09090b", margin: "0 0 16px 0" }}>
            Core Feature Deliverables
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {data.features.map((feature, idx) => (
              <div key={idx} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                fontSize: "14px",
                color: "#27272a",
                lineHeight: "1.5"
              }}>
                <span style={{ color: "#71717a", fontWeight: "500" }}>✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Stack Area */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Module B: Technology Pill Vault */}
          <div style={{
            padding: "24px",
            border: "1px solid #e4e4e7",
            borderRadius: "12px"
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#09090b", margin: "0 0 16px 0" }}>
              Identified Tech Stack
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {data.techStack.map((tech, idx) => (
                <span key={idx} style={{
                  padding: "6px 12px",
                  backgroundColor: "#f4f4f5",
                  color: "#18181b",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: "500",
                  border: "1px solid #e4e4e7"
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Module C: Production Timeline Snapshot */}
          <div style={{
            padding: "24px",
            border: "1px solid #e4e4e7",
            borderRadius: "12px"
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#09090b", margin: "0 0 8px 0" }}>
              Timeline Overview
            </h3>
            <p style={{ fontSize: "14px", color: "#3f3f46", lineHeight: "1.6", margin: 0 }}>
              {data.timeline}
            </p>
          </div>

        </div>
      </div>

      {/* Full Width Footer Section: Risk Explanation Alert Block */}
      <div style={{
        marginTop: "24px",
        padding: "20px",
        backgroundColor: risk.bg,
        border: `1px solid ${risk.border}`,
        borderRadius: "12px"
      }}>
        <h4 style={{ margin: "0 0 6px 0", fontSize: "14px", fontWeight: "600", color: risk.text }}>
          Scope Risk Assessment Details
        </h4>
        <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.6", color: risk.text, opacity: 0.95 }}>
          {data.riskReason}
        </p>
      </div>

    </div>
  );
}