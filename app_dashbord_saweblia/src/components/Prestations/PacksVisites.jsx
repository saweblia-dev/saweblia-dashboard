import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Button";

function PacksVisites(props) {
  const { selectedComponent } = props;
  const [searchLibelle, setsearchLibelle] = useState("");

  const [libelle, setlibelle] = useState("");

  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    description: "",
    searchLibelle: "",
    libelle: "",
    taux_Horaire: "",
    duree: "",
    coefficient: "",
  });

  const handlesearchLibelleChange = (event) => {
    const selectedValue = event.target.value;
    setsearchLibelle(selectedValue);
    setlibelle(""); // Réinitialisez la valeur de libelle lorsque la catégorie change
    setSecondDropdownOptions([]); // Réinitialisez les options du deuxième menu déroulant
    if (selectedValue !== "Sélectionnez une option") {
      // Effectuez une requête pour récupérer les réponses en fonction de la catégorie sélectionnée
      axios
        .get(`https://localhost:44314/Answers/ByCategory/${selectedValue}`)
        .then((response) => {
          setSecondDropdownOptions(response.data);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données :', error);
        });
    }
  };
  const handleLibelleChange = (event) => {
    const selectedValue = event.target.value;
    setlibelle(selectedValue);
  };

  const formData = {
    description: formValues.description,
    searchLibelle: formValues.searchLibelle,
    libelle: formValues.libelle,
    taux_Horaire: formValues.taux_Horaire,
    duree: formValues.duree,
    coefficient: formValues.coefficient,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      description: e.target.description.value, 
      searchLibelle,
      libelle,
      taux_Horaire: e.target.taux_Horaire.value,
      duree: e.target.duree.value,
      coefficient: e.target.coefficient.value,
    };

    fetch("https://localhost:44314/api/Prestation/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La requête a réussi
          console.log("Données ajoutées avec succès !");
          //   navigation.navigate("/Prestations");
          window.location = "/Prestations";
          // Réinitialisez le formulaire si nécessaire
        } else {
          // La requête a échoué
          console.error("Erreur lors de l'ajout des données.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête : " + error);
      });
  };
  //------------------------------------------------------------

  const [categories, setCategories] = useState(null);

  useEffect(() => {
    console.log("props ",selectedComponent)
    axios
      .get(`https://localhost:44314/Categories/ByGroup/${selectedComponent}`)
      .then((response) => {
        setCategories(response.data);
        console.log("data categories************", categories);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
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
                    value={searchLibelle}
                    onChange={handlesearchLibelleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                  >
                    <option disabled>Sélectionnez une option</option>
                    {categories &&
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                
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
                      value={libelle}
                      onChange={handleLibelleChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                    >
                      <option value="">Sélectionnez une option</option>
                   
                       {secondDropdownOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.value}
              </option>
            ))}
                   
                    </select>
                  </div>
            
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
              <Button text="Ajouter" />
            </div>
          </form>
       
        </div>
      </div>
    </div>
  );
}

export default PacksVisites;