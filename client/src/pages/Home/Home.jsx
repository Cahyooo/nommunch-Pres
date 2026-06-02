import { useEffect, useState } from "react";
import "./Home.css";

import Logo from "./Logo.webp";

function Home() {
    const [productCount, setProductCount] = useState(0);

    async function fetchProducts() {
        const response = await fetch(
            "http://localhost:3000/api/products"
        );
    
        const data = await response.json();
    
        setProductCount(data.length);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <section className="hero-section" id="home">

            {/* CONTENT */}
            <div className="hero-container">

                {/* LEFT */}
                <div className="hero-left">

                    <span className="home-badge">
                        HOMEMADE WITH LOVE 💖
                    </span>

                    <h1 className="title">
                        Tiny Noms,
                        <br />
                        
                        <span className="title-color">
                            Huge Love!
                        </span>
                    </h1>

                    <p className="description">
                        Jelajahi {productCount} produk homemade pilihan kami yang dibuat
                        dengan bahan berkualitas dan sentuhan cinta di setiap gigitannya.
                    </p>

                    {/* BUTTON */}
                    <div className="button-group">

                        <a
                            href="/product"
                            className="button main-button"
                        >
                            Lihat Menu →
                        </a>

                        <a
                            href="/about-us"
                            className="button outline-button"
                        >
                            Tentang Kami ♡
                        </a>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="hero-right">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="logo"
                    />
                </div>
            </div>
        </section>
    );
}

export default Home;