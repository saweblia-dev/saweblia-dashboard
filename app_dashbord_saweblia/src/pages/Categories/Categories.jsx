import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/Button";
import Search from "../../components/Search";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState(""); 
  const [categoryAnswers, setCategoryAnswers] = useState([]);

  const testSwal = () => {
    Swal.fire("Test Swal", "Ceci est un test de Swal.", "success");
  };

  const handleDeleteCategory = () => {
    if (selectedCategory) {
      Swal.fire({
        title: "Attention!",
        text: "Vous êtes sur le point de supprimer cette catégorie. Cette action est irréversible. Voulez-vous vraiment continuer ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Oui, supprimer",
        cancelButtonText: "Annuler",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`https://localhost:44314/categories/${selectedCategory.id}`)
            .then((response) => {
              if (response.status === 200) {
                setCategories((prevCategories) =>
                  prevCategories.filter(
                    (category) => category.id !== selectedCategory.id
                  )
                );
                Swal.fire(
                  "Supprimé !",
                  "Votre élément a été supprimé .",
                  "success"
                );
                setSelectedCategory(null); 
              }
            })
            .catch((error) => {
              console.error(
                "Une erreur s'est produite lors de la suppression de la catégorie :",
                error
              );
            });
        }
      });
    } else {
      Swal.fire(
        "Erreur",
        "Veuillez sélectionner une catégorie à supprimer.",
        "error"
      );
    }
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim() === "") {
      Swal.fire(
        "Erreur",
        "Le nom de la catégorie ne peut pas être vide.",
        "error"
      );
      return;
    }

    axios
      .post("https://localhost:44314/categories", {
        name: newCategoryName,
      })
      .then((response) => {
        if (response.status === 201) {
          const newCategory = response.data;
          setCategories((prevCategories) => [...prevCategories, newCategory]);
          setNewCategoryName("");
          Swal.fire(
            "Succès",
            "La catégorie a été ajoutée avec succès.",
            "success"
          );
        }
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de l'ajout de la catégorie :",
          error
        );
        Swal.fire(
          "Erreur",
          "Une erreur s'est produite lors de l'ajout de la catégorie.",
          "error"
        );
      });
  };
  useEffect(() => {
    axios
      .get("https://localhost:44314/Categories")
      .then((response) => {
        setCategories(response.data);
        console.log("data:", categories);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories :", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedCategory.id) {
      console.log("selectedCategory.id", selectedCategory.id);
      axios
        .get(
          `https://localhost:44314/Answers/ByCategory/${selectedCategory.id}`
        )
        .then((response) => {
          setCategoryAnswers(response.data);
          console.log("setCategoryAnswers", response.data); 
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des réponses par catégorie :",
            error
          );
        });
    }
  }, [selectedCategory]); 

  return (
    <div>
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <section className="bg-white p-20 lg:py-[20px] overflow-hidden relative z-10">
          <div className="container">
            <div className="grid grid-cols-2 bg-white">
              <div className="flex flex-col items-center">
                <div>
                  <Search
                    searchText={searchText}
                    setSearchText={setSearchText}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Link to="/AjouterCategories">
                  <Button text="Ajouter" />
                </Link>
              </div>
            </div>

            <div className="flex min-h-screen justify-center p-2 bg-white">
              <div className="container grid max-w-screen-xl gap-8 lg:grid-cols-2 lg:grid-rows-2">
                <div className="flex flex-col rounded-md border border-slate-200">
                  <div className="mt-4 ">
                    <div className="flex max-h-[800px] w-full flex-col overflow-y-scroll">
                      {categories
                        .filter(
                          (category) =>
                            category.name &&
                            category.name
                              .toLowerCase()
                              .includes(searchText.toLowerCase())
                        )
                        .map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category)}
                            className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-cyan-100"
                          >
                            <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-cyan-100">
                              <span className="tag w-full text-center text-2xl font-medium text-gray-700 group-hover:text-cyan-900">
                                {category.id}
                              </span>
                            </div>
                            <div className="flex flex-col items-start justify-between font-light text-gray-600">
                              <p className="text-[15px]">{category.name}</p>
                              <span className="text-xs font-light text-gray-400">
                                {category.FirstQuestionId}
                              </span>
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
                {selectedCategory && (
                  <div className="flex flex-col rounded-md border border-slate-200">
                    <div className="p-10">
                      <h3 className="text-xl pb-6 font-medium text-gray-700">
                        Détails de la catégorie
                      </h3>
                      <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                        <div className="w-full flex mb-3 items-center">
                          <div className="w-32">
                            <span className="text-gray-600 font-semibold">
                              Id
                            </span>
                          </div>
                          <div className="flex-grow pl-3">
                            <span>
                              {selectedCategory ? selectedCategory.id : ""}
                            </span>
                          </div>
                        </div>
                        <div className="w-full flex items-center">
                          <div className="w-32">
                            <span className="text-gray-600 font-semibold">
                              Name
                            </span>
                          </div>
                          <div className="flex-grow pl-3">
                            <span>
                              {selectedCategory ? selectedCategory.name : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl pb-6 font-medium text-gray-700">
                        Parcours
                      </h3>
                      <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                        
                            {categoryAnswers
                        .filter(
                          (categoryAnswer) =>
                          categoryAnswer.id &&
                          categoryAnswer.value
                              .toLowerCase()
                              .includes(searchText.toLowerCase())
                        )
                        .map((categoryAnswer) => (
                          <div className="w-full flex mb-3 items-center">
                          <div className="w-32">
                            <span className="text-gray-600 font-semibold">
                              sous-catégories
                            </span>
                          </div>
                          <div className="flex-grow pl-3">
                            <span>
                              {categoryAnswer.value}
                            
                            </span>
                          </div>
                        </div>
                        ))}

                       
                      </div>
                      <div className="px-2">
                        <Link to={`/ParcoursCategories/${selectedCategory.id}`}>
                          <button className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold">
                            ParcoursCategories
                          </button>
                        </Link>
                      </div>
                      <div className="my-6 py-6 border-t border-gray-200">
                        <div className="-mx-2 flex items-end justify-end">
                          <div className="px-2">
                            {selectedCategory && (
                              <Link
                                to={`/ModifierCategories/${selectedCategory.id}`}
                              >
                                <Button text="Modifier" />
                              </Link>
                            )}
                          </div>
                          <div className="px-2">
                            <button
                              className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold"
                              onClick={handleDeleteCategory}
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
   
  );
}

export default Categories;
