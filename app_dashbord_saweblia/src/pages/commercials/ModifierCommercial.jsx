import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";

function ModifierCommercial() {
  const [formData, setFormData] = useState({
    mrbricolage: "",
    name: "",
  });

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://localhost:44314/Commercial/${id}`)
      .then((response) => {
        const commercialData = response.data;
        setFormData({
          mrbricolage: commercialData.mrbricolage,
          name: commercialData.name,
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données du commercial :", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyer les données mises à jour du commercial au serveur
    axios
      .put(`https://localhost:44314/Commercial/${id}`, formData)
      .then((response) => {
        console.log("Commercial mis à jour avec succès");
        window.location = "/Commercials"
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du commercial :", error);
      });
  };

  return (
    <div>
      <div className="flex flex-wrap flex-row -mx-4 text-center">
        <div className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/2 lg:px-6 wow fadeInUp mx-auto">
          <form action="" method="POST" className="mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="mrbricolage" className="mb-3 block text-base font-medium text-[#07074D]">
                Nom Mrbricolage
              </label>
              <input
                type="text"
                name="mrbricolage"
                id="mrbricolage"
                placeholder="Mrbricolage"
                value={formData.mrbricolage}
                onChange={handleChange}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                Nom Commercial
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Nom"
                value={formData.name}
                onChange={handleChange}
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div>
              <Button text="Modifier" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModifierCommercial;
