import { useEffect, useState } from "react";
import "./Feedback.css";

import PORT from "../../data";

export default function Feedback() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    product_id: "",
    message: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await fetch(`http://localhost:${PORT}/api/products`);

    const data = await response.json();

    setProducts(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(`http://localhost:${PORT}/api/feedbacks`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(form),
    });

    const data = await response.json();

    alert(data.message);

    setForm({
      name: "",
      email: "",
      product_id: "",
      message: "",
    });
  }

  return (
    <section className="feedback-page">
      {/* HEADER */}
      <div className="feedback-header">
        <span className="feedback-badge">FEEDBACK 💖</span>

        <h2>
          Share Your <span>Thoughts</span>
        </h2>

        <p>Your feedback helps us improve and create better experiences.</p>
      </div>

      {/* FORM CARD */}
      <div className="feedback-center">
        <div className="feedback-card">
          <h3>Leave Your Feedback ✨</h3>
          <p>We appreciate every opinion you share.</p>

          <form onSubmit={handleSubmit} className="feedback-form">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <select
              value={form.product_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  product_id: e.target.value,
                })
              }
            >
              <option value="">Select Product</option>

              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>

            <textarea
              rows="6"
              placeholder="Write your feedback here..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            <button type="submit">Submit Feedback 💌</button>
          </form>
        </div>
      </div>
    </section>
  );
}
