import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "../../components/Search";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import FacturePDF from "../../components/Facture/FacturePDF";
import imgPDF from "../../assets/pdf.png";
import Papa from "papaparse";

function Factures() {
  const [factures, setFactures] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedFacture, setSelectedFacture] = useState(null);

  useEffect(() => {
    axios
      .get("https://localhost:44314/facture/all")
      .then((response) => {
        setFactures(response.data);
        console.log("factuer data", response.data);
        response.data.forEach((facture) => {
          console.log("nom  commercial :", facture.commercial.name);
          console.log("nom Mrbricolage :", facture.commercial.mrbricolage);
          console.log("Noms des factures :");
          facture.prests.forEach((factuer) => {
            console.log(factuer.searchLibelle);
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
      Prestations: facture.factures,
      Annuler: facture.annuler,

      TotalTTC: facture.tarif,

      TVAMarge: (
        facture.tarif -
        facture.tarif / 1.514 -
        (facture.tarif - facture.tarif / 1.514) / 1.2
      ).toFixed(2),

      Honoraires: (facture.tarif / 1.514).toFixed(2),

      GMVHT: (
        facture.tarif -
        (facture.tarif -
          facture.tarif / 1.514 -
          (facture.tarif - facture.tarif / 1.514) / 1.2)
      ).toFixed(2),

      MargebruteTTC: (facture.tarif - facture.tarif / 1.514).toFixed(2),
      MargebruteHT: ((facture.tarif - facture.tarif / 1.514) / 1.2).toFixed(2),
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



<div>
      <div className=" flex items-center justify-center h-screen">
        <div class="container">



          <div class="grid grid-cols-2 bg-white ">
            <div className="flex flex-col items-center">
              <div>
                <Search searchText={searchText} setSearchText={setSearchText} />
              </div>
            </div>
            <div class="flex flex-col items-center">
            <div class="flex flex-col items-center">
                <Button
                  text=" Télécharger Excel"
                  onClick={generateAndDownloadCSV}
                />
              </div>
            </div>
          </div>




          <div className="flex justify-center p-2 bg-wthit">
            <div className=" flex flex-col w-[400px] rounded-md border border-slate-200">
              <div className="mt-4 ">
                <div className="flex max-h-[800px] w-full flex-col overflow-y-scroll">
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

            <div className="flex flex-col ml-10 w-[800px] max-h-[800px] overflow-y-scroll  rounded-md border border-slate-200">
              <div className="p-10   ">
              {selectedFacture ? (
                
             <div>
            <FacturePDF facture={selectedFacture} />

                </div>

              ): (
                <div>
                <p>Aucune factuer sélectionnée</p>
</div>
              )}
              </div>
            </div>

         
          </div>



        </div>
      </div>
    </div>








    </div>
  );
}

export default Factures;
