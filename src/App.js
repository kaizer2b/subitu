import React, { useState, useEffect } from "react";

const products = [
  { id: 1, name: "Red Bull", price: 3.5, image: "https://via.placeholder.com/150?text=Red+Bull" },
  { id: 2, name: "Chips BBQ", price: 2.0, image: "https://via.placeholder.com/150?text=Chips" },
  { id: 3, name: "Sandwich Jambon", price: 4.5, image: "https://via.placeholder.com/150?text=Sandwich" }
];

export default function App() {
  const [step, setStep] = useState("home");
  const [cart, setCart] = useState([]);
  const [deliveryProgress, setDeliveryProgress] = useState(0);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const getTotal = () => cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  useEffect(() => {
    if (step === "livraison") {
      const interval = setInterval(() => {
        setDeliveryProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  const styles = {
    page: { background: "#000", color: "#FFD700", minHeight: "100vh", padding: "2rem", textAlign: "center" },
    button: { background: "#FFD700", color: "#000", border: "none", padding: "1rem 2rem", borderRadius: "30px", marginTop: "1rem", cursor: "pointer" },
    product: { background: "#222", color: "#fff", padding: "1rem", borderRadius: "10px", margin: "1rem", width: "180px", display: "inline-block" },
    image: { width: "100%", borderRadius: "8px", marginBottom: "0.5rem" }
  };

  if (step === "home") {
    return (
      <div style={styles.page}>
        <h1>SUBITU</h1>
        <p>Vos envies, livrées. Jour et Nuit.</p>
        <button style={styles.button} onClick={() => setStep("catalogue")}>Commander maintenant</button>
      </div>
    );
  }

  if (step === "catalogue") {
    return (
      <div style={styles.page}>
        <h2>Catalogue</h2>
        {products.map((p) => (
          <div key={p.id} style={styles.product}>
            <img src={p.image} alt={p.name} style={styles.image} />
            <h3>{p.name}</h3>
            <p>{p.price.toFixed(2)} €</p>
            <button style={styles.button} onClick={() => addToCart(p)}>Ajouter</button>
          </div>
        ))}
        <button style={styles.button} onClick={() => setStep("panier")}>Voir le panier ({cart.length})</button>
      </div>
    );
  }

  if (step === "panier") {
    return (
      <div style={styles.page}>
        <h2>Panier</h2>
        {cart.map((item, i) => <p key={i}>{item.name} - {item.price.toFixed(2)} €</p>)}
        <h3>Total : {getTotal()} €</h3>
        <button style={styles.button} onClick={() => setStep("paiement")}>Payer</button>
      </div>
    );
  }

  if (step === "paiement") {
    return (
      <div style={styles.page}>
        <h2>Paiement en cours...</h2>
        <p>Simulation Stripe</p>
        <button style={styles.button} onClick={() => setStep("livraison")}>Continuer</button>
      </div>
    );
  }

  if (step === "livraison") {
    return (
      <div style={styles.page}>
        <h2>Votre commande est en route !</h2>
        <div style={{ background: "#333", borderRadius: "10px", marginTop: "2rem", height: "30px", width: "80%", marginLeft: "auto", marginRight: "auto", overflow: "hidden" }}>
          <div style={{ width: deliveryProgress + "%", background: "#FFD700", height: "100%" }}></div>
        </div>
        <p style={{ marginTop: "1rem" }}>{deliveryProgress}% du trajet effectué</p>
      </div>
    );
  }
}
