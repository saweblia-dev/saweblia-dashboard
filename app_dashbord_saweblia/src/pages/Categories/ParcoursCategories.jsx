import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";
import ParcoursSousCategories from "./ParcoursSousCategories";
import ParcoursAnswer from "./ParcoursAnswer";

const ParcoursCategories = () => {
  const { id } = useParams();

  const [inputValue, setInputValue] = useState("");
  const [dataList, setDataList] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    value: inputValue,
    CategoryId: id,
  });
  const [createdDataIds, setCreatedDataIds] = useState([]); 

  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
    console.log('compo************',component)
  };


  useEffect(() => {
    
    console.log("id", id);
  }, []); // Le tableau vide signifie que cette effect ne dépend d'aucune variable, elle s'exécute une fois après le rendu initial.

  return (
    <div>
      <div>
        <div
          id="services"
          className="section relative pt-20 pb-8 md:pt-16 md:pb-0 bg-white"
        >
          <div className="container xl:max-w-6xl mx-auto px-4">
          <header className="text-center mx-auto mb-12 lg:px-20">
            <h2 className="text-2xl leading-normal mb-2 font-bold text-black">
            Ajouter Parcours de Categories
            </h2>
            <div class="grid grid-cols-2 gap-4 ">
            <div class="flex flex-col items-center">
              
                 <Button  text="Sous Categories" 
                  onClick={() => handleComponentClick("categorie")}/>
             
              </div>
              <div class="flex flex-col items-center">
            
                 <Button  text="Reponses"
                 onClick={() => handleComponentClick("reponse")}/>
          
              </div>
           </div>
          </header>
          {selectedComponent === "categorie" && (
          <ParcoursSousCategories /> // Affichez le composant DepannageReparation
        )}

        {selectedComponent === "reponse" && (
          <ParcoursAnswer /> // Affichez le composant PacksVisites
        )}
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcoursCategories;
