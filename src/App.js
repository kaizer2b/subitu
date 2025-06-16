import React, { useState } from "react";

const products = [
  { name: "Red Bull", price: 3.5 },
  { name: "Chips BBQ", price: 2.0 },
  { name: "Sandwich Jambon", price: 4.5 },
];

export default function App() {
  const [step, setStep] = useState("home");
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const getTotal = () => {
    return cart.reduce((sum, p) => sum + p.price, 0).toFixed(2);
  };

  if (step === "home") {
    return (
      <div style={{ backgroundColor: '#000', color: '#FFD700', height: '100vh', textAlign: 'center', paddingTop: '5rem' }}>
        <h1>SUBITU</h1>
        <p>Vos envies, livrées. Jour et Nuit.</p>
        <button onClick={() => setStep("catalogue")}>Commander</button>
      </div>
    );
  }

  if (step === "catalogue") {
    return (
      <div style={{ padding: '2rem', backgroundColor: '#000', color: '#FFD700' }}>
        <h2>Catalogue</h2>
        {products.map((p, i) => (
          <div key={i} style={{ marginBottom: '1rem' }}>
            <p>{p.name} - {p.price.toFixed(2)} €</p>
            <button onClick={() => addToCart(p)}>Ajouter</button>
          </div>
        ))}
        <button onClick={() => setStep("panier")}>Voir le panier ({cart.length})</button>
      </div>
    );
  }

  if (step === "panier") {
    return (
      <div style={{ padding: '2rem', backgroundColor: '#000', color: '#FFD700' }}>
        <h2>Panier</h2>
        {cart.map((item, i) => (
          <p key={i}>{item.name} - {item.price.toFixed(2)} €</p>
        ))}
        <h3>Total: {getTotal()} €</h3>
        <button onClick={() => setStep("paiement")}>Payer</button>
      </div>
    );
  }

  if (step === "paiement") {
    return (
      <div style={{ backgroundColor: '#000', color: '#FFD700', height: '100vh', textAlign: 'center', paddingTop: '5rem' }}>
        <h2>Paiement en cours...</h2>
        <p>Simulation Stripe</p>
        <button onClick={() => setStep("livraison")}>Continuer</button>
      </div>
    );
  }

  if (step === "livraison") {
    return (
      <div style={{ backgroundColor: '#000', color: '#FFD700', height: '100vh', textAlign: 'center', paddingTop: '5rem' }}>
        <h2>Votre commande est en route !</h2>
        <p>Livreur SUBITU est en déplacement...</p>
      </div>
    );
  }
}