import { useState } from "react";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import "./Contact.css";
import PORT from "../../../client/src/data";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(`http://localhost:${PORT}/api/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    alert(data.message);

    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section className="contact-section">

      {/* HEADER */}
      <div className="contact-header">
        <span className="contact-badge">CONTACT US 💌</span>

        <h2>
          Let’s Make <span>Sweet Moments</span>
        </h2>

        <p>
          Punya pertanyaan atau ingin custom dessert? Kami siap bantu!
        </p>
      </div>

      {/* CARD */}
      <div className="contact-center">
        <div className="contact-card">

          <h3>Send a Message!</h3>
          <p>We’d love to hear from you!</p>

          <form onSubmit={handleSubmit} className="contact-form">

            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
            />

            <button type="submit">
              Send Message ✨
            </button>
          </form>

          {/* SOCIAL */}
          <div className="socials">
            <a href="https://www.instagram.com/nommuncch/" target="_blank"> <FaInstagram /> </a>
            <a href="https://www.facebook.com/nommuncch" target="_blank"> <FaFacebook /> </a>
            <a href="https://www.tiktok.com/@nommuncch" target="_blank"> <FaTiktok /> </a>
          </div>

        </div>
      </div>

    </section>
  );
}