// components/CitySelector.tsx
"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Modal } from "../Modal/Modal";
import AllCities from "../AllCities/AllCities";

const CitySelector: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button
        onClick={openModal}
        className="bg-gray-300 text-black  hover:bg-gray-200 w-full mt-2"
      >
        Bütün şəhərlər
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3 className="text-xl font-semibold mb-4">Şəhər seçin</h3>
        <AllCities onSelect={closeModal} />
      </Modal>
    </>
  );
};

export default CitySelector;
