import React, { useState } from "react";
import Button from "../../components/Button";
import DepannageReparation from "../../components/Prestations/DepannageReparation"; 
import PacksVisites from "../../components/Prestations/PacksVisites"

const AjouterPrestation = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
    console.log('compo************',component)
  };





  return (
    <div>
         <div className=" flex items-center justify-center h-screen">
        
<section class="container px-4 mx-auto">
    <div class="sm:flex sm:items-center sm:justify-between">
        <div>
            <div class="flex items-center gap-x-3">
                <h2 class="text-lg font-medium text-gray-800 dark:text-white">Ajouter Prestation </h2>

            </div>

        </div>

        
    </div>

    <div class="mt-6 md:flex md:items-center md:justify-between">
        <div class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
            <button class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
                tout
            </button>

            <button onClick={() => handleComponentClick("depannage")}
             class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              Depannage
            </button>

            <button onClick={() => handleComponentClick("packs")}
             class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                Packs
            </button>
        </div>

        <div class="relative flex items-center mt-4 md:mt-0">
            <span class="absolute">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </span>

            <input type="text" value="Stripe" placeholder="Search" class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>
    </div>

    <div class="flex  h-[80vh] items-center m-6 py-6 text-center border rounded-lg max-h-[900px] dark:border-gray-700">
  <div class="flex flex-col w-full max-w-[600px] px-4 mx-auto">
    {selectedComponent === null && (
    <div>
    <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
  </svg>
   <p className="ml-2 text-gray-600 dark:text-gray-300">Veuillez choisir entre "Depannage" et "Packs".</p>
   </div>
    )}

    {selectedComponent === "depannage" && (
      <DepannageReparation selectedComponent={selectedComponent} />
    )}

    {selectedComponent === "packs" && (
      <PacksVisites selectedComponent={selectedComponent} />
    )}
  </div>
</div>

   
</section>
       
      </div>
    </div>
  );
};

export default AjouterPrestation;