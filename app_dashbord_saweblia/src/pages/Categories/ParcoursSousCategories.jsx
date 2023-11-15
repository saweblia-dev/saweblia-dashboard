import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function ParcoursSousCategories() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [dataList, setDataList] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    value: inputValue,
    CategoryId: id,
  });

  useEffect(() => {
    
    const apiUrl = `https://localhost:44314/Answers/ByCategory/${id}`;

    axios
      .get(apiUrl)
      .then((response) => {
       
        setDataList(response.data);
        console.log("data----------",dataList)
      })
      .catch((error) => {
       
        console.error("Une erreur s'est produite lors de la récupération des données :", error);
        setError(error.message);
      });
  }, [id]); 

  useEffect(() => {
   
    console.log("useParams id", id);
  }, []);

  const [createdDataIds, setCreatedDataIds] = useState([]);

  const handleAddData = () => {
    const { value, CategoryId } = formData;
    axios
      .post("https://localhost:44314/Answers", {
        value: value,
        CategoryId: CategoryId,
      })
      .then((response) => {
        const createdDataId = response.data.id; 
        setCreatedDataIds([...createdDataIds, createdDataId]);
        setDataList([...dataList, { value, id: createdDataId }]);
        setInputValue(""); 
        console.log("data id sous cate", createdDataIds);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  

  const handleDeleteData = (index) => {
    const categoryIdToDelete = dataList[index].id;

    axios
      .delete(`https://localhost:44314/Answers/${categoryIdToDelete}`)
      .then(() => {
        const updatedDataList = [...dataList];
        updatedDataList.splice(index, 1);
        setDataList(updatedDataList);
      })
      .catch((error) => {
        setError(error.message);
      });
  };


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
                Ajouter les Sous-Categories
              </h2>
            </header>
            <div className="flex flex-wrap flex-row -mx-4 text-center">
              <div className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/2 lg:px-6 wow fadeInUp mx-auto">
                <form action="POST" className="mx-auto">
                  <div className="mb-5">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      {/* {formData.name} */}
                    </label>
                  </div>

                  <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-2/3">
                      <div className="mb-5">
                        <label
                          htmlFor="sous-categories"
                          className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                          Les sous catégories
                        </label>
                        <input
                          type="text"
                          name="sous-categories"
                          id="sous-categories"
                          // value={inputValue} // Assurez-vous que la valeur est liée à inputValue
                          // onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Sous catégories"
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          onChange={(e) =>
                            setFormData({ ...formData, value: e.target.value })
                          }
                          value={formData.value}
                        />
                      </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/3">
                      <div className="mb-5">
                        <label
                          htmlFor="value1"
                          className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                          ADD
                        </label>
                        <button
                          type="button"
                          onClick={handleAddData}
                          className="bg-gray-200 inline-flex justify-center items-center text-gray-500 shadow-lg w-10 h-10 rounded-md hover:text-gray-800 hover:shadow-sm"
                        >
                          <svg
                            className="w-6 h-6 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-[#07074D]">
                    Liste des sous-catégories :
                  </h3>
                  {dataList.map((data, index) => (
                    <div
                      key={index}
                      className="flex flex-col m-4 p-8 bg-white shadow-md hover:shadow-lg rounded-2xl"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex flex-col ml-3">
                            <div className="font-medium pr-4 leading-none">
                              {/* value  */}
                              {data.value}
                            </div>
                            {/* <div className="text-gray-500">
                              ID: {createdDataIds[index]}
                            </div>{" "} */}
                            {/* Affichez l'ID ici */}
                          </div>
                        </div>
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-black"
                          onClick={() => handleDeleteData(index)}
                        >
                          <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.5"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 18L18 6M6 6l12 12"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParcoursSousCategories;
