import "./About.css";

export default function About() {
  return (
    <section className="about-section" id="about-us">
      <div className="about-container">
        <div className="about-left">
          <span className="about-badge">ABOUT US ✨</span>

          <h2 className="about-title">
            Homemade Sweetness,
            <span className="about-title-gradient"> Crafted with Love</span>
          </h2>

          <p className="about-text">
            Nom Munch lahir dari kecintaan terhadap dessert homemade yang
            hangat, manis, dan penuh kebahagiaan. Setiap kue dibuat dengan
            bahan pilihan, detail yang penuh perhatian, dan sentuhan cinta di
            setiap prosesnya.
          </p>

          <div className="about-stats">
            <div className="about-stat-card">
              <h3>100+</h3>
              <p>Happy Customers</p>
            </div>

            <div className="about-stat-card">
              <h3>50+</h3>
              <p>Custom Cakes</p>
            </div>
          </div>
        </div>

        <div className="about-right">
          <div className="about-info-card">
            <h3>Fresh Ingredients</h3>
            <p>
              Kami hanya menggunakan bahan berkualitas untuk menghasilkan rasa
              terbaik di setiap gigitan.
            </p>
          </div>

          <div className="about-info-card">
            <h3>Handmade With Care</h3>
            <p>
              Setiap produk dibuat secara homemade dengan perhatian penuh pada
              detail dan kualitas.
            </p>
          </div>

          <div className="about-info-card">
            <h3>Sweet Moments</h3>
            <p>
              Kami percaya dessert bukan hanya makanan, tapi bagian dari momen
              bahagia yang berharga.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}