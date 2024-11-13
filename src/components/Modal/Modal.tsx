"use client";
import React from "react";
import { X } from "lucide-react"; // Optional: Icon for close button
import { Button } from "../ui/button";
import { AiOutlineCloseCircle } from "react-icons/ai";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        className=" bg-white rounded-lg shadow-lg p-2 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          className="absolute top-2 right-2 hover:bg-gray-400"
        >
          <AiOutlineCloseCircle size={24} />
        </Button>
        {children}
      </div>
    </div>
  );
};
