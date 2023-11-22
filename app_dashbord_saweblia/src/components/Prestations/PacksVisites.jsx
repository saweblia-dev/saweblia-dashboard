import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Button";

function PacksVisites(props) {
  const { selectedComponent } = props;
  const [categories, setCategories] = useState(null);
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);

  const [formData, setFormData] = useState({
    description: "",
    searchLibelle: "",
    libelle: "",
    taux_Horaire: "",
    duree: "",
    coefficient: "",
  });


  const handleChange = async (e) => {
    const { name, value } = e.target;
   
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log("FormData",formData)
  
    try {
      const response = await axios.get(
        `https://localhost:44314/Answers/GetNameById/${value}`
      );  
      setFormData((prevData) => ({ ...prevData, searchLibelleName: response.data }));
      console.log('searchLibelleName: response.data',response.data)
      console.log("******setFormData",formData)
    } catch (error) {
      console.error("Error fetching name for searchLibelle:", error);
    }

   
    try {
      const response = await axios.get(
        `https://localhost:44314/Answers/ByCategory/${value}`
      );
      // Set the options for the second dropdown
      setSecondDropdownOptions(response.data);
      console.log("SecondDropdownOptions",secondDropdownOptions)
    } catch (error) {
      console.error("Error fetching second dropdown options:", error);
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://localhost:44314/api/Prestation/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      
    })
      .then((response) => {
        window.location = "/Prestations";
      })
      .catch((error) => {
        console.error("Erreur lors de la requête : " + error);
      });
  };



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
      <h3 className="block font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased">
        Ajouter pack
      </h3>
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
                    htmlFor="searchLibelle"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    SearchLibelle
                  </label>
                  <select
                    id="searchLibelle"
                    name="searchLibelle"
                    value={formData.searchLibelle}
                    onChange={handleChange}
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
                      htmlFor="libelle"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Libelle de la prestation
                    </label>

                    <select
  id="libelle"
  name="libelle"
  value={formData.libelle}
  onChange={handleChange}
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
      
    
  );
}

export default PacksVisites