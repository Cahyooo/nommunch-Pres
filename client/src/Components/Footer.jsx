import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import { ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

import { HiMiniHome, HiMiniSparkles } from "react-icons/hi2";

import { RiAdminFill, RiBearSmileFill, RiInstagramFill } from "react-icons/ri";

import { MdCookie } from "react-icons/md";

import { useNavigate } from "react-router";

export default function Footer() {
  const navigate = useNavigate();

  const quickLinks = [
    {
      icon: <HiMiniHome size={16} />,
      label: "Home",
      path: "/",
    },

    {
      icon: <HiMiniSparkles size={16} />,
      label: "About Us",
      path: "/about-us",
    },

    {
      icon: <MdCookie size={16} />,
      label: "Product",
      path: "/product",
    },

    {
      icon: <RiInstagramFill size={16} />,
      label: "Contact Us",
      path: "/contact-us",
    },

    {
      icon: <RiBearSmileFill size={16} />,
      label: "Feedback",
      path: "/feedback",
    },

    {
      icon: <RiAdminFill size={16} />,
      label: "Admin",
      path: "/admin",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-bear-darkest text-white z-10">
      <div className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-pink-400 to-transparent opacity-60" />

      <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 py-14">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-black tracking-tight"
          >
            Nom Munch 💖
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            viewport={{ once: true }}
            className="max-w-md text-sm leading-relaxed text-pink-100/70"
          >
            Homemade cakes crafted with love, sweetness, and tiny moments of
            happiness.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            {[FaInstagram, FaFacebookF, FaTiktok].map((Icon, index) => (
              <motion.a
                key={index}
                whileHover={{
                  scale: 1.15,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                target="_blank"
                href={
                  Icon === FaInstagram
                    ? "https://www.instagram.com/nommuncch/"
                    : Icon === FaFacebookF
                    ? "https://www.facebook.com/nommuncch"
                    : "https://www.tiktok.com/@nommuncch"
                }
                className="rounded-full bg-white/10 p-3 backdrop-blur-sm transition-colors hover:bg-pink-400"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.25,
            }}
            viewport={{
              once: true,
            }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            {quickLinks.map((link, index) => (
              <motion.button
                key={index}
                whileHover={{
                  y: -2,
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                onClick={() => navigate(link.path)}
                className="
        flex items-center gap-2
        rounded-full border border-white/10
        bg-white/5 px-4 py-2
        text-sm text-pink-100/70
        backdrop-blur-sm
        transition-all
        hover:bg-pink-400
        hover:text-white
        hover:shadow-lg
        hover:shadow-pink-500/20
      "
              >
                {link.icon}

                <span>{link.label}</span>
              </motion.button>
            ))}
          </motion.div>

          <motion.button
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.3,
            }}
            viewport={{
              once: true,
            }}
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="group flex flex-col items-center gap-2 pt-4"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
            flex h-14 w-14 items-center justify-center
            rounded-full border border-white/10
            bg-white/10 backdrop-blur-sm
            transition-all
            group-hover:bg-pink-400
            group-hover:shadow-lg
            group-hover:shadow-pink-500/30
        "
            >
              <ChevronUp size={24} />
            </motion.div>

            <span className="text-xs tracking-[0.3em] text-pink-100/50 uppercase">
              Back To Top
            </span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
            viewport={{ once: true }}
            className="text-xs text-pink-100/50"
          >
            © 2026 Nom Munch. All rights reserved.
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
