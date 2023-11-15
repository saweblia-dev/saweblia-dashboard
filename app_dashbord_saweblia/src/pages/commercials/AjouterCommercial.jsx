import React, { useState } from "react";
import Button from "../../components/Button";

function AjouterCommercial() {
  const [formData, setFormData] = useState({
    mrbricolage: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://localhost:44314/Commercial", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Commercial ajouté avec succès");
        } else {
          console.error("Erreur lors de l'ajout du commercial");
        }
      })
      .catch((error) => {
        console.error("Erreur réseau lors de l'ajout du commercial : ", error);
      });
  };

  return (
    <div>
      <div
        id="services"
        className="section relative pt-20 pb-8 md:pt-16 md:pb-0 bg-white"
      >
        <div className="container xl:max-w-6xl mx-auto px-4">
          <header className="text-center mx-auto mb-12 lg:px-20">
            <h2 className="text-2xl leading-normal mb-2 font-bold text-black">
              Ajouter Prestation
            </h2>
          </header>
          <div className="flex flex-wrap flex-row -mx-4 text-center">
            <div className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/2 lg:px-6 wow fadeInUp mx-auto">
              <form
                action=""
                method="POST"
                className="mx-auto"
                onSubmit={handleSubmit}
              >
                <div className="mb-5">
                  <label
                    htmlFor="mrbricolage"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
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
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
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
                  <Button text="Ajouter" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AjouterCommercial;
