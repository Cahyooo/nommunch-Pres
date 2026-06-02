import { useState } from "react";
import "./Feedback.css";
import PORT from "../../../client/src/data";

export default function Feedback() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    message: "",
  });

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

    setForm({ name: "", type: "", message: "" });
  }

  return (
    <section className="feedback-page">

      {/* HEADER */}
      <div className="feedback-header">
        <span className="feedback-badge">FEEDBACK 💖</span>

        <h2>
          Share Your <span>Thoughts</span>
        </h2>

        <p>
          Your feedback helps us improve and create better experiences.
        </p>
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
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <option value="">Select Feedback Type</option>
              <option>Suggestion</option>
              <option>Complaint</option>
              <option>Praise</option>
            </select>

            <textarea
              rows="6"
              placeholder="Write your feedback here..."
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
            />

            <button type="submit">
              Submit Feedback 💌
            </button>

          </form>

        </div>
      </div>

    </section>
  );
}