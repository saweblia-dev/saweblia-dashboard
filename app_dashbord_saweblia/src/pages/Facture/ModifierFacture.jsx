import React from "react";
//  ,{ useEffect, useState ,useParams ,useHistory}
  
// import axios from "axios";

function ModifierFacture() {
//     const { factureId } = useParams();
//   const history = useHistory();

//   const [formData, setFormData] = useState({
//     IT: "",
//     Full_name: "",
//     Quartier: "",
//     ville: "",
//     phone: "",
//     date: "",
//     Tarif: 0,
//     prestations: "",
//     MethodePayment: "",
//   });

//   useEffect(() => {
//     // Récupérez les données de la facture depuis l'API en utilisant factureId
//     axios.get(`https://localhost:44314/facture/${factureId}`)
//       .then((response) => {
//         const factureData = response.data;
//         // Mettez à jour l'état du formulaire avec les données de la facture
//         setFormData(factureData);
//       })
//       .catch((error) => {
//         console.error("Erreur lors de la récupération des données de la facture :", error);
//       });
//   }, [factureId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // Mettez à jour l'état du formulaire en fonction des saisies de l'utilisateur
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Effectuez une requête HTTP pour mettre à jour la facture avec les données dans formData
//     axios.put(`https://localhost:44314/facture/${factureId}`, formData)
//       .then((response) => {
//         console.log("Facture mise à jour avec succès !");
//         // Redirigez l'utilisateur vers la liste des factures ou une autre page
//         history.push("/listeFactures");
//       })
//       .catch((error) => {
//         console.error("Erreur lors de la mise à jour de la facture :", error);
//         // Gérez les erreurs ici, par exemple en affichant un message d'erreur à l'utilisateur
//       });
//   };
  return (
    <div>
      <div class="flex items-center justify-center p-12">
        <div class="mx-auto w-full max-w-[550px]">
          <form action="https://formbold.com/s/FORM_ID" method="POST" >
            <div class="mb-5">
              <label
                for="it"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                IT
              </label>
              <input
                type="text"
                name="IT"
                id="IT"
                placeholder="T....."
                min="0"
                class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div class="mb-5">
              <label
                for="full_name"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Full_name
              </label>
              <input
                type="text"
                name="Full_name"
                id="Full_name"
                placeholder="Full_name"
                min="0"
                class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div class="-mx-3 flex flex-wrap">
              <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="quartier"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Quartier
                  </label>
                  <input
                    type="text"
                    name="Quartier"
                    id="Quartier"
                    placeholder="Quartier"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="ville"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Ville
                  </label>
                  <input
                    type="text"
                    name="ville"
                    id="ville"
                    placeholder="Ville"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div class="-mx-3 flex flex-wrap">
              <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="phone"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="phone"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="date"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    placeholder="Date"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div class="mb-5">
              <label
                for="tarif"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Tarif
              </label>
              <input
                type="number"
                name="Tarif"
                id="Tarif"
                placeholder="Tarif"
                min="0"
                class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div class="-mx-3 flex flex-wrap">
              <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="prestations"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Prestations
                  </label>
                  <input
                    type="text"
                    name="prestations"
                    id="prestations"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="methodePayment"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Methode Payment
                  </label>
                  <input
                    type="text"
                    name="MethodePayment"
                    id="MethodePayment"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* <div class="-mx-3 flex flex-wrap">
              <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="fees_Val"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Fees_Val
                  </label>
                  <input
                    type="text"
                    name="fees_Val"
                    id="fees_Val"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="assurance"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                  Assurance
                  </label>
                  <input
                    type="number"
                    name="assurance"
                    id="assurance"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div> */}

            {/* <div class="mb-5">
              <label class="mb-3 block text-base font-medium text-[#07074D]">
                Are you coming to the event?
              </label>
              <div class="flex items-center space-x-6">
                <div class="flex items-center">
                  <input
                    type="radio"
                    name="radio1"
                    id="radioButton1"
                    class="h-5 w-5"
                  />
                  <label
                    for="radioButton1"
                    class="pl-3 text-base font-medium text-[#07074D]"
                  >
                    Yes
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    type="radio"
                    name="radio1"
                    id="radioButton2"
                    class="h-5 w-5"
                  />
                  <label
                    for="radioButton2"
                    class="pl-3 text-base font-medium text-[#07074D]"
                  >
                    No
                  </label>
                </div>
              </div>
            </div> */}

            <div>
              <button class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModifierFacture;
