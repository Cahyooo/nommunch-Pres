import { motion } from "framer-motion";

import CircularGallery from "../../components/ExternalComponents/CircularGallery";
import { useEffect, useState } from "react";
import PORT from "../../data";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: "easeOut",
    },
  }),
};

export default function Product() {
  const [items, setItems] = useState([]);

  async function fetchProducts() {
    try {
      const response = await fetch(`http://localhost:${PORT}/api/products`);

      const data = await response.json();

      const formattedData = data.map((product) => ({
        image: product.image_url,
        text: product.name,
      }));

      setItems(formattedData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-[#fff7fac4] pt-10 pb-12"
      id="product"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute top-20 left-10 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl"
        />

        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
          className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-rose-200/20 blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{
            once: false,
            amount: 0.3,
          }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <motion.div variants={fadeUp} custom={0}>
            <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-medium text-pink-500 shadow-sm">
              OUR PRODUCTS 🍰
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={0.2}
            className="mt-6 text-5xl font-black leading-tight md:text-6xl"
          >
            Sweet Treats,
            <span className="bg-linear-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">
              {" "}
              Made to Delight
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={0.4}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600"
          >
            Nikmati berbagai pilihan dessert homemade dengan rasa yang manis,
            lembut, dan dibuat dengan penuh cinta untuk menemani setiap momen
            spesialmu.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: false,
            amount: 0.2,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="relative"
        >
          <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-300/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-[40px] border border-white/30 bg-white/40 shadow-2xl backdrop-blur-xl">
            <div className="pointer-events-none absolute top-0 z-20 h-32 w-full bg-linear-to-b from-[#fff7fa] to-transparent" />

            <div className="pointer-events-none absolute bottom-0 z-20 h-32 w-full bg-linear-to-t from-[#fff7fa] to-transparent" />

            <div className="relative h-162.5">
              {items.length === 0 && <div>Loading...</div>}
              {items && (
                <CircularGallery
                  bend={1}
                  textColor="#1f1f1f"
                  borderRadius={0.12}
                  scrollEase={0.025}
                  items={items}
                />
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="mt-14 text-center"
        >
          <p className="text-sm tracking-[0.3em] text-pink-400 uppercase">
            Fresh • Homemade • Premium Quality
          </p>
        </motion.div>
      </div>
    </section>
  );
}
