import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Search from "../../components/Search";
import Button from "../../components/Button";


function Prestations() {
  const [prestations, setPrestations] = useState([]);
  const [selectedPrestation, setSelectedPrestation] = useState(null);
  const [searchText, setSearchText] = useState("");
 

  const handleDelete = () => {
    Swal.fire({
      title: "Attention!",
      text: "Vous êtes sur le point de supprimer cette prestation. Cette action est irréversible. Voulez-vous vraiment continuer ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `https://localhost:44314/api/Prestation/toggleActivation/${selectedPrestation.id}`
          )
          .then((response) => {
            if (response.status === 200) {
              // Mise à jour réussie, supprimez la prestation de la liste.
              setPrestations((prevPrestations) =>
                prevPrestations.filter(
                  (prestation) => prestation.id !== selectedPrestation.id
                )
              );

              // Affichez un message SweetAlert de succès.
              Swal.fire("Supprimé !", "Votre élément a été supprimé .", "success");
            }
          })
          .catch((error) => {
            console.error(
              "Une erreur s'est produite lors de la mise à jour de la prestation :",
              error
            );
          });
      }
    });
  };

  useEffect(() => {
    axios
      .get("https://localhost:44314/api/Prestation/all")
      .then((response) => {
        setPrestations(response.data);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des prestations :",
          error
        );
      });
  }, []);

  return (
    <div>
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <section class="bg-white p-20 lg:py-[20px] overflow-hidden relative z-10">
          <div class="container">
            <div class="grid grid-cols-2 bg-white ">
              <div className="flex flex-col items-center">
                <div>
                  <Search
                    searchText={searchText}
                    setSearchText={setSearchText}
                  />
                </div>
              </div>
              <div class="flex flex-col items-center">
                <Link to="/AjouterPrestation">
                 <Button  text="Ajouter"/>
                </Link>
              </div>
              
            </div>
            <div className="flex min-h-screen  justify-center p-2 bg-white">
              <div className="container grid max-w-screen-xl gap-8 lg:grid-cols-2 lg:grid-rows-2">
                <div className=" flex flex-col rounded-md border border-slate-200">
                  <div className="mt-4 ">
                    <div className="flex max-h-[800px] w-full flex-col overflow-y-scroll">
                      {prestations
                        .filter((prestation) =>
                          prestation.libelle
                            .toLowerCase()
                            .includes(searchText.toLowerCase())
                        )
                        .map((prestation) => (
                          <button
                            key={prestation.id}
                            onClick={() => setSelectedPrestation(prestation)}
                            className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-cyan-100"
                          >
                            <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-cyan-100">
                              <span className="tag w-full text-center text-2xl font-medium text-gray-700 group-hover:text-cyan-900">
                                {prestation.id}
                              </span>
                            </div>
                            <div className="flex flex-col items-start justify-between font-light text-gray-600">
                              <p className="text-[15px]">
                                {prestation.libelle}
                              </p>
                              <span className="text-xs  font-light text-gray-400">
                                {prestation.searchLibelle}
                              </span>
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
                {selectedPrestation && (
                  <div className="flex flex-col rounded-md border border-slate-200">
                    <div className="p-10">
                      <h3 className="text-xl pb-6 font-medium text-gray-700">
                        {selectedPrestation.libelle}
                      </h3>
                      <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                        <div className="w-full flex mb-3 items-center">
                          <div className="w-32">
                            <span className="text-gray-600 font-semibold">
                              Id
                            </span>
                          </div>
                          <div className="flex-grow pl-3">
                            <span>{selectedPrestation.id}</span>
                          </div>
                        </div>
                        <div className="w-full flex items-center">
                          <div className="w-32">
                            <span className="text-gray-600 font-semibold">
                              Search Libelle
                            </span>
                          </div>
                          <div className="flex-grow pl-3">
                            <span> {selectedPrestation.searchLibelle}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow pl-3">
                        <h3 className="text-xl pb-6 font-medium text-gray-700">
                          Description
                        </h3>
                      </div>
                      <p className="mt-2 text-slate-500">
                        {selectedPrestation.description}
                      </p>
                      <div className="my-6  py-6 border-t border-gray-200 text-gray-800">
                        <div className="w-full flex mb-3 items-center ">
                          <div className="flex-grow">
                            <span className="text-gray-600">Taux_Horaire</span>
                          </div>
                          <div className="pl-3">
                            <span className="font-semibold">
                              {selectedPrestation.taux_Horaire}
                            </span>
                          </div>
                        </div>
                        <div className="w-full flex mb-3 items-center">
                          <div className="flex-grow">
                            <span className="text-gray-600">Duree</span>
                          </div>
                          <div className="pl-3">
                            <span className="font-semibold">
                              {selectedPrestation.duree}
                            </span>
                          </div>
                        </div>
                        <div className="w-full flex mb-3 items-center">
                          <div className="flex-grow">
                            <span className="text-gray-600">Coefficient</span>
                          </div>
                          <div className="pl-3">
                            <span className="font-semibold">
                              {selectedPrestation.coefficient}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="my-6 py-6 border-t border-gray-200">
                        <div className="-mx-2 flex items-end justify-end">
                          <div className="px-2">
                            <Link to={`/ModifierPrestation/${selectedPrestation.id}`}>
                          <Button  text="Modifier"/>
                          </Link>
                          </div>
                          <div className="px-2">
                            <button
                              className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold"
                              // onClick={() => handleSupprimer(selectedPrestation.id)}
                              onClick={handleDelete}
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

export default Prestations;
