import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Search from "../../components/Search";
import Button from "../../components/Button";

function Demandes() {
    const [demandes, setDemandes] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedDemande, setSelectedDemande] = useState(null);
  
      useEffect(() => {
    // Effectue une requête GET à l'URL /demande/all
    axios
      .get("https://localhost:44314/demande/all")
      .then((response) => {
        // Met à jour l'état avec les données des demandes reçues
        setDemandes(response.data);
        console.log("demande ",demandes)
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des demandes :",
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
              <Link to="/AjouterDemande">
               <Button  text="Ajouter"/>
              </Link>
            </div>
            
          </div>
          <div className="flex min-h-screen  justify-center p-2 bg-white">
            <div className="container grid max-w-screen-xl gap-8 lg:grid-cols-2 lg:grid-rows-2">
              <div className=" flex flex-col rounded-md border border-slate-200">
                <div className="mt-4 ">
                  <div className="flex max-h-[800px] w-full flex-col overflow-y-scroll">
                    {demandes
                      .filter((demande) =>
                        demande.ti
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      )
                      .map((demande) => (
                        <button
                          key={demande.id}
                          onClick={() => setSelectedDemande(demande)}
                          className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-cyan-100"
                        >
                          <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-cyan-100">
                            <span className="tag w-full text-center text-2xl font-medium text-gray-700 group-hover:text-cyan-900">
                              {demande.id}
                            </span>
                          </div>
                          <div className="flex flex-col items-start justify-between font-light text-gray-600">
                            <p className="text-[15px]">
                              {demande.ti}
                            </p>
                            <span className="text-xs  font-light text-gray-400">
                              {/* {demande.searchLibelle} */}
                            </span>
                          </div>
                        </button>
                    ))} 
                  </div>
                </div>
              </div>
              {selectedDemande && (
               <div className="flex flex-col rounded-md border border-slate-200">
               <div className="p-10   max-h-[700px] overflow-y-scroll" id="demande-container">
                  <h3 className="text-xl pb-6 font-medium text-gray-700">{selectedDemande.ti}</h3>
                  <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                    <div className="w-full flex mb-3 items-center">
                      <div className="w-32">
                        <span className="text-gray-600 font-semibold">ID</span>
                      </div>
                      <div className="flex-grow pl-3">
                        <span>{selectedDemande.id}</span>
                      </div>
                    </div>
                    <div className="w-full flex items-center">
                      <div className="w-32">
                        <span className="text-gray-600 font-semibold">Date</span>
                      </div>
                      <div className="flex-grow pl-3">
                        <span>{selectedDemande.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow pl-3">
                    <h3 className="text-xl pb-6 font-medium text-gray-700">
                      Autres détails
                    </h3>
                  </div>
                  <div className="my-6 py-6 border-t border-gray-200 text-gray-800">
                    <div className="w-full flex items-center">
                      <div className="w-32">
                        <span className="text-gray-600 font-semibold">Nom</span>
                      </div>
                      <div className="flex-grow p-3">
                        <span>{selectedDemande.full_name}</span>
                      </div>
                    </div>
                    <div className="w-full flex items-center">
                      <div className="w-32">
                        <span className="text-gray-600 font-semibold">Quartier</span>
                      </div>
                      <div className="flex-grow p-3">
                        <span>{selectedDemande.quartier}</span>
                      </div>
                    </div>
                    <div className="w-full flex items-center">
                      <div className="w-32">
                        <span className="text-gray-600 font-semibold">Ville</span>
                      </div>
                      <div className="flex-grow p-3">
                        <span>{selectedDemande.ville}</span>
                      </div>
                    </div>
                    <div className="w-full flex items-center">
                      <div className="w-32">
                        <span className="text-gray-600 font-semibold">Phone</span>
                      </div>
                      <div className="flex-grow p-3">
                        <span>{selectedDemande.phone}</span>
                      </div>
                    </div>
          
                    <div className="w-full flex items-center">
                      <div className="w-32">
                        <span className="text-gray-600 font-semibold">Tarif</span>
                      </div>
                      <div className="flex-grow p-3">
                        <span>{selectedDemande.tarif} DH</span>
                      </div>
                    </div>
                    <div className="w-full flex items-center">
                      <div className="w-32">
                        <span className="text-gray-600 font-semibold">Payment</span>
                      </div>
                      <div className="flex-grow p-3">
                        <span>{selectedDemande.methodePayment}</span>
                      </div>
                    </div>
          
                 
                    <div className="w-full flex items-center">
                      <div className="w-32">
                        <span className="text-gray-600 font-semibold">Prestations</span>
                      </div>
                      <div className="flex-grow  p-3">
                        <span>{selectedDemande.prestations}</span>
                      </div>
                    </div>
                    <div className="w-full flex items-center">
                      <div className="w-32">
                        <span className="text-gray-600 font-semibold">Description </span>
                      </div>
                      <div className="flex-grow p-3">
                        <span>{selectedDemande.desc}</span>
                      </div>
                    </div>
                    {/* Ajoutez d'autres champs au besoin */}
                  </div>
          
                
                </div>
                <div className="my-6 py-6 border-t border-gray-200">
                    <div className="-mx-2 flex items-end justify-end">
                      <div className="px-6">
                        <button
                          className="block pr-4 w-full max-w-xs mx-auto border border-transparent bg-cyan-300 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold"
                        //   onClick={handleDownloadPDF}
                          name="telecharger"
                        >
                          Télécharger PDF
                        </button>
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
  )
}

export default Demandes