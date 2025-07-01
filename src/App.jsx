import React from "react";
import Jerarquia from "./Jerarquia";
import "@fontsource/montserrat";
import "@fontsource/montserrat/700.css";
import logo from "./logo_hydra.png"; // Cambiado según tu archivo

function App() {
  return (
    <div>
      {/* Logo + Título */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          marginTop: "1.5rem",
          marginBottom: "1rem",
        }}
      >
        <img
          src={logo}
          alt="Logo Hydra"
          style={{
            width: "40px",
            height: "40px",
            objectFit: "contain",
          }}
        />
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            fontFamily: "Montserrat, sans-serif",
            margin: 0,
          }}
        >
          Jerarquía HYDRA
        </h1>
      </div>

      {/* Jerarquía visual */}
      <Jerarquia />
    </div>
  );
}

export default App;
