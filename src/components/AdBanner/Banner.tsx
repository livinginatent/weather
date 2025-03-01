"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react"; // Lightweight X icon

const Banner = (props: { imageUrl: string; siteUrl: string }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed  flex-col bottom-10 left-10 w-full flex justify-center items-center z-50">
      {/* Close Button */}
      <div className=" flex flex-col justify-center items-center">
        <button
          className="bg-gray-800 text-white rounded-full p-1 hover:bg-red-500 transition"
          onClick={() => setIsVisible(false)}
        >
          <X color="white" size={20} />
        </button>
        <p className="text-md mt-1">Bağla</p>
      </div>
      {/* Flipping Ad Banner */}
      <motion.a
        href={props.siteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className=" flex items-center justify-center overflow-hidden rounded-xl shadow-lg bg-white"
        animate={{
          rotateX: [0, 90, 0], // Smooth up-and-down flip
        }}
        transition={{
          repeat: Infinity,
          duration: 4.5, // Smooth and fluid
          ease: "easeInOut", // Natural motion curve
        }}
      >
        <Image
          src={props.imageUrl}
          alt="Ad Banner"
          width={525}
          height={225}
          className="object-cover"
        />
      </motion.a>
    </div>
  );
};

export default Banner;
