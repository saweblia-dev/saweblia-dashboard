import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../../components/Search";
import Button from "../../components/Button";
import Swal from "sweetalert2";

function Commercials() {
  const [searchText, setSearchText] = useState("");
  const [commercials, setCommercials] = useState([]);
  const [selectedCommercial, setSelectedCommercial] = useState(null);

  useEffect(() => {
    axios
      .get("https://localhost:44314/Commercial")
      .then((response) => {
        const data = response.data;
        setCommercials(data);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération des données :", error);
      });
  }, []);

  const handleDelete = () => {
    if (selectedCommercial) {
      Swal.fire({
        title: "Confirmation",
        text: "Voulez-vous vraiment supprimer ce commercial ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, supprimer",
        cancelButtonText: "Annuler",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`https://localhost:44314/Commercial/${selectedCommercial.id}`)
            .then((response) => {
              const updatedCommercials = commercials.filter(
                (commercial) => commercial.id !== selectedCommercial.id
              );
              setCommercials(updatedCommercials);
              setSelectedCommercial(null);
              Swal.fire("Supprimé !", "Le commercial a été supprimé.", "success");
            })
            .catch((error) => {
              console.error("Une erreur s'est produite lors de la suppression du commercial :", error);
              Swal.fire("Erreur", "Une erreur s'est produite lors de la suppression.", "error");
            });
        }
      });
    }
  };

  return (
    <div>
      <div className=" flex items-center justify-center h-screen">
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
                <Link to="/AjouterCommercial">
                  <Button text="Ajouter" />
                </Link>
              </div>
            </div>

            <div className="flex justify-center p-2 bg-wthit">
               <div className=" flex flex-col w-[400px] rounded-md border border-slate-200">
               <div className="mt-4 ">
                    <div className="flex max-h-[800px] w-full flex-col overflow-y-scroll">
                      {commercials
                        .filter(
                          (commercial) =>
                            commercial.name &&
                            commercial.name
                              .toLowerCase()
                              .includes(searchText.toLowerCase())
                        )
                        .map((commercial) => (
                          <button
                            key={commercial.id}
                            onClick={() => setSelectedCommercial(commercial)}
                            className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-cyan-100"
                          >
                            <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-cyan-100">
                              <span className="tag w-full text-center text-2xl font-medium text-gray-700 group-hover:text-cyan-900">
                                {commercial.id}
                              </span>
                            </div>
                            <div className="flex flex-col items-start justify-between font-light text-gray-600">
                              <p className="text-[15px]">
                                {commercial.mrbricolage}
                              </p>
                              <span className="text-xs font-light text-gray-400">
                                {commercial.name}
                              </span>
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-10 w-[800px] max-h-[800px] overflow-y-scroll  rounded-md border border-slate-200">
              <div className="p-10   ">
                {selectedCommercial ? (
               <div>
                    <h3 className="text-xl pb-6 font-medium text-gray-700">
                      {selectedCommercial.mrbricolage} 
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
                            {selectedCommercial ? selectedCommercial.id : ""}
                          </span>
                        </div>
                      </div>
                      <div className="w-full flex items-center">
                        <div className="w-32">
                          <span className="text-gray-600 font-semibold">
                            Mrbricolage
                          </span>
                        </div>
                        <div className="flex-grow pl-3">
                          <span>
                            {selectedCommercial
                              ? selectedCommercial.mrbricolage
                              : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow pl-3">
                      <h3 className="text-xl pb-6 font-medium text-gray-700">
                        Nom
                      </h3>
                    </div>
                    <p className="mt-2 text-slate-500">
                      {selectedCommercial ? selectedCommercial.name : ""}
                    </p>
                    <div className="my-6 py-6 border-t border-gray-200">
                      <div className="-mx-2 flex items-end justify-end">
                        <div className="px-2">
                          {selectedCommercial && (
                            <Link to={`/ModifierCommercial/${selectedCommercial.id}`}>
                              <button      className="w-[200px] bg-green-500 text-white max-w-xs mx-auto border border-transparent hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold" >
                                Modifier
                                  </button>
                            </Link>
                          )}
                        </div>
                        <div className="px-2">
                        <button
                     className="block w-full max-w-xs mx-auto border border-transparent bg-red-500 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold"
                     onClick={handleDelete}
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                 </div>
                  ): (
                    <div>
                    <p>Aucune commercial sélectionnée</p>
                   </div>
                )}
                 </div>
                </div>
              </div>
           
          </div>
       
      </div>
    </div>
  );
}

export default Commercials;
