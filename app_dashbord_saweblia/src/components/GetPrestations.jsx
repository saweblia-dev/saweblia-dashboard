import React, { useEffect, useState } from "react";
import axios from "axios";

function GetPrestations() {
    const [prestations, setPrestations] = useState([]);

  
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
    <div>GetPrestations</div>
  )
}

export default GetPrestations