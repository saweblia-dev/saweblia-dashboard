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
        console.log("data----------", dataList);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des données :",
          error
        );
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
     <div class="bg-white relative   flex items-center  n justify-center overflow-hidden z-50 ">
     
     <div class="relative mx-auto h-full px-4  pb-20   md:pb-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
         <div class="flex flex-col items-center justify-between lg:flex-row py-16">
             <div class=" relative ">
               
                 <div class="lg:max-w-xl lg:pr-5 relative z-40">
                 <form action="POST" className="mx-auto">
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  ></label>
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
                        placeholder="Sous catégories"
                        className="w-full rounded-md  border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                 </div>
                 
                
             </div>
             <div class="relative hidden lg:ml-32 lg:block lg:w-1/2">
             {dataList.map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col m-4 p-4 w-80 bg-white shadow-md hover:shadow-lg rounded-2xl"
                >
                  <div className="flex items-center justify-between ">
                    <div className="flex items-center">
                      <div className="flex flex-col ml-3">
                        <div className="font-medium pr-4 leading-none">
                          {data.value}
                        </div>
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
     
        {/* <div className="container  mx-auto px-4">
          <div className="flex flex-wrap  flex-row -mx-4 text-center">
          <div class="p-4 max-w-[500px]  ">
            <label
                        htmlFor="value1"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                       liste
                      </label>
              {dataList.map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col m-4 p-4 w-80 bg-white shadow-md hover:shadow-lg rounded-2xl"
                >
                  <div className="flex items-center justify-between ">
                    <div className="flex items-center">
                      <div className="flex flex-col ml-3">
                        <div className="font-medium pr-4 leading-none">
                          {data.value}
                        </div>
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
            <div class="p-4   ">
              <form action="POST" className="mx-auto">
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  ></label>
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
            </div>
           
          </div>
        </div> */}
      
      
    </div>
  );
}

export default ParcoursSousCategories;
