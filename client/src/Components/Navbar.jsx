import Dock from "./ExternalComponents/Dock";

import { HiMiniHome, HiMiniSparkles } from "react-icons/hi2";
import { RiBearSmileFill, RiInstagramFill } from "react-icons/ri";
import { MdCookie } from "react-icons/md";
import { useNavigate } from "react-router";
import { lenis } from "../lenis";

export default function Navbar() {
    const navigate = useNavigate();

    const items = [
        {
            icon: <HiMiniHome size={23} color="#FFF1F3" />,
            label: "Home",
            onClick: () => navigate("/"),
        },

        {
            icon: <HiMiniSparkles size={23} color="#FFF1F3" />,
            label: "About Us",
            onClick: () => navigate("/about-us"),
        },

        {
            icon: <MdCookie size={23} color="#FFF1F3" />,
            label: "Product",
            onClick: () => navigate("/product"),
        },

        {
            icon: <RiInstagramFill size={23} color="#FFF1F3" />,
            label: "Contact Us",
            onClick: () => navigate("/contact-us"),
        },

        {
            icon: <RiBearSmileFill size={23} color="#FFF1F3" />,
            label: "Feedback",
            onClick: () => navigate("/feedback"),
        },
    ];

    return (
        <Dock
            items={items}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
        />
    );
}