import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";

function ModifierCategories() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    group: "",
  });

  useEffect(() => {
    axios
      .get(`https://localhost:44314/Categories/${id}`)
      .then((response) => {
        const categoryData = response.data;
        setFormData({
          ...formData,
          name: categoryData.name,
          group: categoryData.group,
        });
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
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
    console.log("test")
    e.preventDefault(); // Prevents the default form submission behavior
  
    // Make a PUT request to update the category
    axios
      .put(`https://localhost:44314/Categories/${id}`, formData)
      .then((response) => {
        console.log("Category updated successfully:", response.data);
        window.location = "/Categories";    
        })
      .catch((error) => {
        console.error("Error updating category:", error);
        // Handle the error appropriately, e.g., show an error message to the user
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
              Ajouter Categorie
            </h2>
          </header>
          <div className="flex flex-wrap flex-row -mx-4 text-center">
            <div className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/2 lg:px-6 wow fadeInUp mx-auto">
              <form
                method="POST"
                className="mx-auto"
                onSubmit={handleSubmit}
              >
                <div className="mb-5">
                  <div className="main flex border rounded-full overflow-hidden m-4 select-none">
                    <div className="title py-3 my-auto px-5 bg-blue-500 text-white text-sm font-semibold mr-3">
                      Group
                    </div>
                    <label className="flex radio p-2 cursor-pointer">
                    <input
                className="my-auto transform scale-125"
                type="radio"
                name="group"
                value="Depannege"
                checked={formData.group === "Depannege"}
                onChange={handleChange}
              />
                      <div className="title px-2">Depannege</div>
                    </label>

                    <label className="flex radio p-2 cursor-pointer">
                      <input
                        className="my-auto transform scale-125"
                        type="radio"
                        name="group"
                        value="Packs"
                        checked={formData.group === "Packs"}
                        onChange={handleChange}
                      />
                      <div className="title px-2">Packs</div>
                    </label>
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Nom categorie
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="nom categorie"
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
      </div>
    </div>
  );
}

export default ModifierCategories;
