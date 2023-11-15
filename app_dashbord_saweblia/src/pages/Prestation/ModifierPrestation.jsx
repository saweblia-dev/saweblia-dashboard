import React, { useState, useEffect } from "react";
import DepannageReparation from "../../components/Prestations/DepannageReparation";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";

function ModifierPrestation() {
  const { id } = useParams();
  const [searchLibelle, setsearchLibelle] = useState("");
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
  const [selectedSearchLibelle, setSelectedSearchLibelle] = useState("");
  const [selectedLibelle, setSelectedLibelle] = useState("");
  const [libelle, setlibelle] = useState("");
  const [categories, setCategories] = useState([]); 
  const [prestation, setPrestation] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    searchLibelle: "",
    libelle: "",
    taux_Horaire: "",
    duree: "",
    coefficient: "",
  });





  useEffect(() => {
    axios
      .get(`https://localhost:44314/api/Prestation/${id}`)
      .then((response) => {
        setPrestation(response.data);
      })
      .catch((error) => {
        console.error("Error fetching prestation data:", error);
      });
  }, [id]);

  useEffect(() => {
    if (prestation) {
      setFormData({
        description: prestation.description,
        searchLibelle: prestation.searchLibelle,
        libelle: prestation.libelle,
        taux_Horaire: prestation.taux_Horaire,
        duree: prestation.duree,
        coefficient: prestation.coefficient,
      });
    }
  }, [prestation]);

  const handleSearchLibelleChange = (e) => {
    setSelectedSearchLibelle(e.target.value);

    if (e.target.value) {
      axios
        .get(`https://localhost:44314/Answers/ByCategory/${e.target.value}`)
        .then((response) => {
          setSecondDropdownOptions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching second dropdown options:", error);
        });
    } else {
      // Réinitialisez les options de la deuxième liste déroulante si aucune valeur n'est sélectionnée
      setSecondDropdownOptions([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://localhost:44314/api/Prestation/update/${id}`, formData)
      .then((response) => {
        console.log("Prestation updated successfully");
        window.location = "/Prestations";
      })
      .catch((error) => {
        console.error("Error updating prestation:", error);
      });
  };

 
  useEffect(() => {
    axios
      .get("https://localhost:44314/Categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div>
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
                htmlFor="description"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Description
              </label>
              <textarea
                type="textarea"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="searchLibelleSelect"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    SearchLibelle
                  </label>
                  <select
                    id="searchLibelleSelect"
                    name="searchLibelle"
                 
                    value={selectedSearchLibelle}
                    onChange={handleSearchLibelleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  >
                    <option disabled>Sélectionnez une option</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>

                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                {secondDropdownOptions.length > 0 && (
                  <div className="mb-5">
                    <label
                      htmlFor="libelleSelect"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Libelle de la prestation
                    </label>
                    <select
                      id="libelleSelect"
                      name="libelle"
                      value={selectedLibelle}
                      onChange={(e) => setSelectedLibelle(e.target.value)}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                    >
                      <option value="">Sélectionnez une option</option>
                      {secondDropdownOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.value }
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="tauxHoraire"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Taux_Horaire
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    name="taux_Horaire"
                    id="taux_Horaire"
                    placeholder="taux_Horaire"
                    value={formData.taux_Horaire}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="duree"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Duree
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    name="duree"
                    id="duree"
                    placeholder="Duree"
                    value={formData.duree}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="coefficient"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Coefficient
              </label>
              <input
                type="number"
                step="0.001"
                name="coefficient"
                id="coefficient"
                placeholder="Coefficient"
                value={formData.coefficient}
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

export default ModifierPrestation;
