import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function FacturePDF({ facture }) {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    html2canvas(document.querySelector("#facture-container")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 10, 10); 
      doc.save("facture.pdf");
    });
  };

  return (
    <div className="flex flex-col rounded-md border border-slate-200">
     <div className="p-10   max-h-[700px] overflow-y-scroll" id="facture-container">
        <h3 className="text-xl pb-6 font-medium text-gray-700">{facture.ti}</h3>
        <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
          <div className="w-full flex mb-3 items-center">
            <div className="w-32">
              <span className="text-gray-600 font-semibold">ID</span>
            </div>
            <div className="flex-grow pl-3">
              <span>{facture.id}</span>
            </div>
          </div>
          <div className="w-full flex items-center">
            <div className="w-32">
              <span className="text-gray-600 font-semibold">Date</span>
            </div>
            <div className="flex-grow pl-3">
              <span>{facture.date}</span>
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
              <span>{facture.full_name}</span>
            </div>
          </div>
          <div className="w-full flex items-center">
            <div className="w-32">
              <span className="text-gray-600 font-semibold">Quartier</span>
            </div>
            <div className="flex-grow p-3">
              <span>{facture.quartier}</span>
            </div>
          </div>
          <div className="w-full flex items-center">
            <div className="w-32">
              <span className="text-gray-600 font-semibold">Ville</span>
            </div>
            <div className="flex-grow p-3">
              <span>{facture.ville}</span>
            </div>
          </div>
          <div className="w-full flex items-center">
            <div className="w-32">
              <span className="text-gray-600 font-semibold">Phone</span>
            </div>
            <div className="flex-grow p-3">
              <span>{facture.phone}</span>
            </div>
          </div>

          <div className="w-full flex items-center">
            <div className="w-32">
              <span className="text-gray-600 font-semibold">Tarif</span>
            </div>
            <div className="flex-grow p-3">
              <span>{facture.tarif} DH</span>
            </div>
          </div>
          <div className="w-full flex items-center">
            <div className="w-32">
              <span className="text-gray-600 font-semibold">Payment</span>
            </div>
            <div className="flex-grow p-3">
              <span>{facture.methodePayment}</span>
            </div>
          </div>

       
          <div className="w-full flex items-center">
            <div className="w-32">
              <span className="text-gray-600 font-semibold">Prestations</span>
            </div>
            <div className="flex-grow  p-3">
              <span>{facture.prestations}</span>
            </div>
          </div>
          <div className="w-full flex items-center">
            <div className="w-32">
              <span className="text-gray-600 font-semibold">Description </span>
            </div>
            <div className="flex-grow p-3">
              <span>{facture.desc}</span>
            </div>
          </div>
        </div>

      
      </div>
      <div className="my-6 py-6 border-t border-gray-200">
          <div className="-mx-2 flex items-end justify-end">
            <div className="px-6">
              <button
                className="block pr-4 w-full max-w-xs mx-auto border border-transparent bg-cyan-300 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold"
                onClick={handleDownloadPDF}
                name="telecharger"
              >
                Télécharger PDF
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default FacturePDF;
