import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [factures, setFactures] = useState([]);
  const [dates, setDates] = useState([]);
  const [tarifs, setTarifs] = useState([]);
  const [prestations, setPrestations] = useState([]);
  const [totalPrestations, setTotalPrestations] = useState(0);
  const [factorCount, setFactorCount] = useState(0);
  const [commercialCount, setCommercialCount] = useState(0); 
  const [userCount, setUserCount] = useState(0);
  const [totalFactures, setTotalFactures] = useState(0);
  const [variationPercentage, setVariationPercentage] = useState(0);
  const [totalPrestationsLastMonth, setTotalPrestationsLastMonth] = useState(0);


  useEffect(() => {
    // Make API request to get count of commercial entities
    axios
      .get("https://localhost:44314/Commercial")
      .then((response) => {
        // Update the count of commercial entities
        setCommercialCount(response.data.length);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des commerciaux :", error);
      });
  }, []); // Empty dependency array to run this effect only once on component mount

  useEffect(() => {
    // Make API request to get count of users
    axios
      .get("https://localhost:44314/api/users")
      .then((response) => {
        // Update the count of users
        setUserCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching user count:", error);
      });
  }, []); 
  useEffect(() => {
    axios
      .get("https://localhost:44314/facture/all")
      .then((response) => {
        setFactures(response.data);
  
        // Mettez à jour le total des facteurs pour le mois précédent
        const previousMonthFactures = response.data.filter((facture) => {
          const currentMonth = new Date().getMonth();
          const factureMonth = new Date(facture.date).getMonth();
          return factureMonth === currentMonth - 1;
        });
  
        const totalPreviousMonth = previousMonthFactures.reduce(
          (total, facture) => total + facture.tarif,
          0
        );
  
        // Mettez à jour la variation en pourcentage
        const variationPercentage =
          ((totalFactures - totalPreviousMonth) / totalPreviousMonth) * 100;
  
        // Utilisez variationPercentage dans votre JSX pour l'affichage
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des factures :", error);
      });
  }, []);

  useEffect(() => {
    // Effectuez une requête GET vers l'API pour obtenir la liste des prestations
    axios
      .get("https://localhost:44314/api/Prestation/all")
      .then((response) => {
        // Mettez à jour l'état avec les données des prestations reçues
        setPrestations(response.data);
  
        // Calculez le nombre total de prestations en utilisant la longueur de la liste
        setTotalPrestations(response.data.length);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des prestations :", error);
      });
  
    // Effectuez une requête GET vers l'API pour obtenir le nombre total de prestations du mois dernier
    // Utilisez la logique appropriée pour déterminer le mois dernier (par exemple, en soustrayant un mois à la date actuelle)
    const lastMonthStartDate = new Date();
    lastMonthStartDate.setMonth(lastMonthStartDate.getMonth() - 1);
    
    axios
      .get(`https://localhost:44314/api/Prestation/total?start=${lastMonthStartDate.toISOString()}`)
      .then((response) => {
        setTotalPrestationsLastMonth(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des prestations du mois dernier :", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:44314/facture/all")
      .then((response) => {
        setFactures(response.data);

        // Extrayez les dates et les tarifs des factures
        const extractedDates = response.data.map((facture) => facture.date);
        const extractedTarifs = response.data.map((facture) => facture.tarif);

        setDates(extractedDates);
        setTarifs(extractedTarifs);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des factures :", error);
      });
  }, []);

  useEffect(() => {
    if (dates.length === 0 || tarifs.length === 0) {
      return;
    }

    // Vérifiez s'il existe déjà un graphique et détruisez-le
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    // Créez le nouveau graphique avec les données de dates et de tarifs
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Tarifs",
            data: tarifs,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Dates",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Tarifs",
            },
          },
        },
      },
    });
  }, [dates, tarifs]);
  return (
    <div>
      <div className=" flex items-center justify-center h-screen">
        {/* <section class="bg-white p-20 lg:py-[20px] overflow-hidden relative z-10"> */}
          <div class="container">
     <div class="mt-12">
              <div class="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      class="w-6 h-6 text-white"
                    >
                      <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                      <path
                        fill-rule="evenodd"
                        d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                        clip-rule="evenodd"
                      ></path>
                      <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                    </svg>
                  </div>
                  <div class="p-4 text-right">
                    <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                      Prestation
                    </p>
                    <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                      {totalPrestations}
                    </h4>
                  </div>
                  <Link to="prestations">
                  <button class="border-t border-blue-gray-50 p-4">
                  aller à la prestation
                  </button>
                  </Link>
                </div>
                <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      class="w-6 h-6 text-white"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div class="p-4 text-right">
                    <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                     Commercial
                    </p>
                    <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                   {commercialCount}
                    </h4>
                  </div>
         
                  <Link to="Commercials">
                  <button class="border-t border-blue-gray-50 p-4">
                  aller à page Commercials
                  </button>
                  </Link>
                  
                </div>
                <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      class="w-6 h-6 text-white"
                    >
                      <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                    </svg>
                  </div>
                  <div class="p-4 text-right">
                    <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    utilisateurs
                    </p>
                    <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    {userCount}
                    </h4>
                  </div>
                  <Link to="Utilisateurs">
                  <button class="border-t border-blue-gray-50 p-4">
                  aller à page  utilisateurs
                  </button>
                  </Link>
                </div>
                <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      class="w-6 h-6 text-white"
                    >
                      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                    </svg>
                  </div>
                  <div class="p-4 text-right">
                    <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    Factures
                    </p>
                    <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                        {factorCount}
                    </h4>
                  </div>
                  <Link to="Factures">
                  <button class="border-t border-blue-gray-50 p-4">
                  aller à page Factures
                  </button>
                  </Link>
                </div>
              </div>
            </div>
            <div style={{ width: "80%", margin: "0 auto" }}>
              <canvas ref={chartRef} />
            </div>
          </div>
       
      </div>
    </div>
  );
}

export default Dashboard;
