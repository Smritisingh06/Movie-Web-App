import React from "react";
import { FaArrowRight } from "react-icons/fa";

const NeedHelpSection = () => (
  <section
    className="w-full py-16 px-4"
    style={{
      background: "linear-gradient(135deg, #7b2ff2 0%, #f357a8 100%)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10">
      <div>
        <h2 className="text-4xl font-bold text-white mb-2">NEED HELP</h2>
        <p className="text-white text-lg">
          Contact us, and we'll respond to you promptly
        </p>
      </div>
      <a
        href="/contact"
        className="mt-8 lg:mt-0 inline-flex items-center bg-white text-black font-semibold px-8 py-4 rounded shadow hover:bg-gray-100 transition"
      >
        Get in touch <FaArrowRight className="ml-3" />
      </a>
    </div>
    {/* Decorative triangles (SVG or CSS) can be added here for more style */}
  </section>
);

export default NeedHelpSection;