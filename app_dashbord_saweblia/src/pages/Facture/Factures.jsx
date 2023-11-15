import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "../../components/Search";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import FacturePDF from "../../components/Facture/FacturePDF";
// import { stringify } from "csv-stringify";
import Papa from "papaparse";

function Factures() {
  const [factures, setFactures] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedFacture, setSelectedFacture] = useState(null);

  useEffect(() => {
    // Effectue une requête GET à l'URL /facture/all
    axios
      .get("https://localhost:44314/facture/all")
      .then((response) => {
        // Met à jour l'état avec les données des factures reçues
        setFactures(response.data);
        //afficher id commercial
        console.log("factuer data", response.data);

        // Affichez l'ID du commercial pour chaque facture
        response.data.forEach((facture) => {
          console.log("nom  commercial :", facture.commercial.name);
          console.log("nom Mrbricolage :", facture.commercial.mrbricolage);
          console.log("Noms des prestations :");
          facture.prests.forEach((prestation) => {
            console.log(prestation.searchLibelle);
          });
        });
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des factures :",
          error
        );
      });
  }, []);

  // Fonction pour générer et télécharger le contenu CSV
  const generateAndDownloadCSV = () => {
    // Créez un tableau des données CSV en utilisant les données des factures
    const csvData = factures.map((facture) => ({
      Date: facture.date,
      Client: facture.full_name,
      Phone: facture.phone,
      Quartier: facture.quartier,
      Ville: facture.ville,
      Tarif: facture.tarif + "MAD",
      CommercialName: facture.commercial.name,
      MrbricolageName: facture.commercial.mrbricolage,
      Payment: facture.methodePayment,
      Métier: facture.prests.map((prest) => prest.searchLibelle).join(", "),
      Prestations: facture.prestations,
      Annuler: facture.annuler,

      TotalTTC: facture.tarif,

       TVAMarge: ( (facture.tarif  -  (facture.tarif / 1.514))-((facture.tarif-(facture.tarif / 1.514))/1.2)).toFixed(2),

      Honoraires: (facture.tarif / 1.514).toFixed(2),

      GMVHT: (facture.tarif - ( (facture.tarif  -  (facture.tarif / 1.514))-((facture.tarif-(facture.tarif / 1.514))/1.2))).toFixed(2), 

      MargebruteTTC: (facture.tarif  -  (facture.tarif / 1.514)).toFixed(2),
      MargebruteHT: ((facture.tarif-(facture.tarif / 1.514))/1.2).toFixed(2),

    }));
    // Convertissez les donnée en une chaîne CSV
    const csv = Papa.unparse(csvData);

    // Créez un objet Blob à partir de la chaîne CSV
    const blob = new Blob([csv], { type: "text/csv" });

    // Créez un objet URL pour le Blob
    const csvURL = window.URL.createObjectURL(blob);

    // Créez un lien invisible pour le téléchargement
    const link = document.createElement("a");
    link.href = csvURL;
    link.setAttribute("download", "factures.csv");
    link.style.display = "none";

    // Ajoutez le lien à la page et cliquez dessus pour déclencher le téléchargement
    document.body.appendChild(link);
    link.click();

    // Nettoyez après le téléchargement
    document.body.removeChild(link);
    window.URL.revokeObjectURL(csvURL);
  };

  return (
    <div>
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <section class="bg-white p-20 lg:py-[20px] overflow-hidden relative z-10">
          <div class="container">
            <div class="grid grid-cols-2 bg-white  ">
              <div className="flex flex-col items-center">
                <div>
                  <Search
                    searchText={searchText}
                    setSearchText={setSearchText}
                  />
                </div>
              </div>
              <div class="flex flex-col items-center">
                <Button
                  text=" Télécharger Excel"
                  onClick={generateAndDownloadCSV}
                />
              </div>
            </div>
            <div className="flex min-h-screen  justify-center p-2 bg-white">
              <div className="container grid max-w-screen-xl gap-8 lg:grid-cols-2 lg:grid-rows-2">
                {/* <GeneralList
                  items={factures}
                  filterFunction={(facture) =>
                    facture.full_name
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  }
                  onItemClick={setSelectedFacture}
                /> */}
                <div className=" flex flex-col rounded-md border border-slate-200">
                  <div className="mt-4 ">
                    <div className="flex  w-full flex-col overflow-y-scroll">
                      {factures
                        .filter((facture) =>
                          facture.full_name
                            .toLowerCase()
                            .includes(searchText.toLowerCase())
                        )
                        .map((facture) => (
                          <button
                            key={facture.id}
                            onClick={() => setSelectedFacture(facture)}
                            className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-cyan-100"
                          >
                            <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-cyan-100">
                              <span className="tag w-full text-center text-2xl font-medium text-gray-700 group-hover:text-cyan-900">
                                {facture.id}
                              </span>
                            </div>
                            <div className="flex flex-col items-start justify-between font-light text-gray-600">
                              <p className="text-[15px]">{facture.ti}</p>
                              <span className="text-xs  font-light text-gray-400">
                                {facture.full_name}
                              </span>
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>
                </div>

                {selectedFacture && <FacturePDF facture={selectedFacture} />}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Factures;
