import React, { useState } from "react";
import empleadosData from "./empleados.json";

const grupos = {
  Traffickers: ["Trafficker Fase Inicial", "Trafficker Fases Finales"],
  "Jefes de Equipo": [
    "Jefe de Equipo Junior",
    "Jefe de Equipo Senior",
    "Jefe de Equipo Especialista",
    "Jefe de Equipo Lead",
    "Jefe de Equipo Partner",
  ],
  Partners: ["Partner", "Partner Ascendente", "Partner Ejecutivo"],
  "👑 Partner Alpha": ["Partner Alpha"],
};

const colores = {
  "Trafficker Fase Inicial": "#e0f2fe",
  "Trafficker Fases Finales": "#bae6fd",
  "Jefe de Equipo Junior": "#d1fae5",
  "Jefe de Equipo Senior": "#a7f3d0",
  "Jefe de Equipo Especialista": "#6ee7b7",
  "Jefe de Equipo Lead": "#34d399",
  "Jefe de Equipo Partner": "#10b981",
  Partner: "#fef3c7",
  "Partner Ascendente": "#fde68a",
  "Partner Ejecutivo": "#fcd34d",
  "Partner Alpha": "#fbbf24",
};

const Jerarquia = () => {
  const [empleadosPorNivel] = useState(() => {
    const inicial = {};
    Object.values(grupos)
      .flat()
      .forEach((nivel) => {
        inicial[nivel] = empleadosData.filter((emp) => emp.nivel === nivel);
      });
    return inicial;
  });

  const totalEmpleados = Object.values(empleadosPorNivel).reduce(
    (acc, lista) => acc + lista.length,
    0
  );

  return (
    <div
      className="jerarquia-container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        overflowX: "auto",
        height: "100vh",
        backgroundColor: "#f3f4f6",
        gap: "1rem",
        fontFamily: "'Montserrat', sans-serif",
        position: "relative",
        zIndex: 0,
      }}
    >
      {Object.entries(grupos).map(([grupoNombre, niveles]) => {
        const totalGrupo = niveles.reduce(
          (acc, nivel) => acc + empleadosPorNivel[nivel].length,
          0
        );
        const porcentajeGrupo = ((totalGrupo / totalEmpleados) * 100).toFixed(1);

        return (
          <div key={grupoNombre} style={{ flex: "1", minWidth: "300px" }}>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "1rem",
                fontSize: "1.25rem",
                fontWeight: "bold",
                borderBottom: "3px solid #e5e7eb",
                paddingBottom: "0.5rem",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {grupoNombre} ({totalGrupo} — {porcentajeGrupo}%)
            </h2>

            {niveles.map((nivel) => (
              <div key={nivel} style={{ marginBottom: "0.2rem" }}>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "0.25rem",
                    color: "#374151",
                  }}
                >
                  {nivel}
                </h3>

                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "0.75rem",
                    minHeight: "100px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    overflow: "visible",
                  }}
                >
                  {empleadosPorNivel[nivel] && empleadosPorNivel[nivel].length === 0 ? (
                    <div
                      style={{
                        fontStyle: "italic",
                        color: "#6b7280",
                        fontSize: "0.85rem",
                        textAlign: "center",
                        padding: "0.75rem",
                        backgroundColor: "#f9fafb",
                        border: "1px dashed #d1d5db",
                        borderRadius: "0.5rem",
                        boxShadow: "inset 0 0 5px rgba(0,0,0,0.03)",
                      }}
                    >
                      🔒 Aún sin miembros
                    </div>
                  ) : (
                    empleadosPorNivel[nivel]?.map((emp, index) => (
                      <div
                        key={`${emp.nombre}-${nivel}-${index}`}
                        style={{
                          position: "relative",
                          marginBottom: "0.5rem",
                        }}
                        onMouseEnter={(e) => {
                          const tooltip = e.currentTarget.querySelector(".tooltip");
                          const card = e.currentTarget.querySelector(".card");
                          tooltip.style.opacity = "1";
                          tooltip.style.pointerEvents = "auto";
                          card.style.transform = "scale(1.03)";
                          card.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          const tooltip = e.currentTarget.querySelector(".tooltip");
                          const card = e.currentTarget.querySelector(".card");
                          tooltip.style.opacity = "0";
                          tooltip.style.pointerEvents = "none";
                          card.style.transform = "scale(1)";
                          card.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
                        }}
                      >
                        <div
                          className="card"
                          style={{
                            backgroundColor: colores[nivel],
                            borderRadius: "8px",
                            padding: "0.75rem",
                            fontSize: "0.9rem",
                            fontWeight: "500",
                            color: "#1f2937",
                            cursor: "default",
                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                          }}
                        >
                          <div>
                            <strong>{emp.nombre}</strong>
                          </div>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "#4b5563",
                              lineHeight: "1.4",
                            }}
                          >
                            ⏳ <strong>Tiempo en Hydra S.A.S:</strong> {emp.tiempo}
                          </div>
                        </div>

                        <div
                          className="tooltip"
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "0",
                            backgroundColor: "#111827",
                            color: "#f9fafb",
                            padding: "0.75rem",
                            borderRadius: "0.5rem",
                            fontSize: "0.75rem",
                            whiteSpace: "nowrap",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                            opacity: 0,
                            pointerEvents: "none",
                            transition: "opacity 0.2s ease-in-out",
                            zIndex: 9999,
                            marginTop: "0.25rem",
                            minWidth: "180px",
                          }}
                        >
                          ⏳ <b>Tiempo:</b> {emp.tiempo} <br />
                          📂 <b>Proyectos:</b> {emp.proyectos} <br />
                          📊 <b>KPI:</b> {emp.kpi} <br />
                          🕑 <b>Últ. ascenso:</b> {emp.ultimoAscenso}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      })}

      {/* Botón "En vivo" */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#ef4444",
          color: "white",
          padding: "8px 16px",
          borderRadius: "9999px",
          fontWeight: "bold",
          fontSize: "0.9rem",
          display: "flex",
          alignItems: "center",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          zIndex: 1000,
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <span
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "9999px",
            backgroundColor: "#fff",
            marginRight: "8px",
            animation: "pulse-dot 1.2s ease-in-out infinite",
            display: "inline-block",
          }}
        ></span>
        En vivo

        <style>
          {`
            @keyframes pulse-dot {
              0% { transform: scale(1); opacity: 1; }
              50% { transform: scale(2); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }

            @media (max-width: 768px) {
              .jerarquia-container {
                flex-direction: column !important;
                height: auto !important;
              }

            .jerarquia-container > div:not([style*="position: fixed"]) {
              min-width: 100% !important;
              padding-bottom: 0.5rem;
              }

              .tooltip {
                left: auto !important;
                right: 0 !important;
                transform: translateX(-10%);
                white-space: normal !important;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Jerarquia;
