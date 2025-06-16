import React, { useState, useEffect } from "react";

const services = [
  { id: 1, label: "Serrurier", icon: "🔐" },
  { id: 2, label: "Mécano", icon: "🔧" },
  { id: 3, label: "Plombier", icon: "🚿" },
  { id: 4, label: "Électricien", icon: "💡" }
];

export default function App() {
  const [step, setStep] = useState("home");
  const [selectedService, setSelectedService] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step === "suivi") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [step]);

  const styles = {
    page: { background: "#000", color: "#FFD700", minHeight: "100vh", padding: "2rem", textAlign: "center" },
    button: { background: "#FFD700", color: "#000", padding: "1rem", border: "none", borderRadius: "30px", margin: "1rem", cursor: "pointer", width: "200px" },
    bar: { height: "20px", width: "80%", background: "#444", borderRadius: "10px", margin: "2rem auto", overflow: "hidden" },
    progress: { height: "100%", background: "#FFD700", width: progress + "%" }
  };

  if (step === "home") {
    return (
      <div style={styles.page}>
        <h1>CORSU SOS</h1>
        <p>Besoin d’aide ? Choisissez un service ci-dessous :</p>
        {services.map((s) => (
          <button key={s.id} style={styles.button} onClick={() => { setSelectedService(s); setStep("localisation"); }}>
            {s.icon} {s.label}
          </button>
        ))}
      </div>
    );
  }

  if (step === "localisation") {
    return (
      <div style={styles.page}>
        <h2>{selectedService.icon} {selectedService.label}</h2>
        <p>Recherche d’un intervenant proche...</p>
        <button style={styles.button} onClick={() => setStep("suivi")}>Lancer la mission</button>
      </div>
    );
  }

  if (step === "suivi") {
    return (
      <div style={styles.page}>
        <h2>Intervenant en route...</h2>
        <div style={styles.bar}>
          <div style={styles.progress}></div>
        </div>
        <p>{progress}% du trajet effectué</p>
        {progress === 100 && <p style={{ marginTop: "2rem" }}>Intervention terminée ✅</p>}
      </div>
    );
  }
}
