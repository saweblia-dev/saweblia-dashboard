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
      <div
        id="services"
        className="section relative pt-20 pb-8 md:pt-16 md:pb-0 bg-white"
      >
        <div className="container xl:max-w-6xl mx-auto px-4">
          <header className="text-center mx-auto mb-12 lg:px-20">
            <h2 className="text-2xl leading-normal mb-2 font-bold text-black">
              Ajouter Prestation
            </h2>
            <div class="grid grid-cols-2 gap-4 ">
            <div class="flex flex-col items-center">
              
                 <Button  text="Dépannage et réparation" 
                  onClick={() => handleComponentClick("depannage")}/>
             
              </div>
              <div class="flex flex-col items-center">
            
                 <Button  text="Packs et Visites"
                 onClick={() => handleComponentClick("packs")}/>
          
              </div>
           </div>
          </header>
      
{selectedComponent === "depannage" && (
  <DepannageReparation selectedComponent={selectedComponent} />
)}
        {selectedComponent === "packs" && (
          <PacksVisites  selectedComponent={selectedComponent} /> 
        )}

        
        </div>
      </div>
    </div>
  );
};

export default AjouterPrestation;