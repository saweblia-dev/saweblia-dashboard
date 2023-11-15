import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ParcoursAnswer() {
  const { id } = useParams();
  const [valueChoiceAnswers, setValueChoiceAnswers] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [recordList, setRecordList] = useState([]);
  const [recordListLoading, setRecordListLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    value: valueChoiceAnswers,
    idAnswer: "", 
  });

  const [dataList, setDataList] = useState([]); 
  const [createdDataIds, setCreatedDataIds] = useState([]); 

  const handleValueChange = (event) => {
    setValueChoiceAnswers(event.target.value);
 
    setFormData({
      ...formData,
      value: event.target.value,
    });
    console.log("data", formData);
  };

const handleCategoryClick = (idAnswer) => {
  setSelectedCategoryId(idAnswer);

  setRecordList([]);
  setFormData({
    ...formData,
    idAnswer: idAnswer.toString(),
  });

  setRecordListLoading(true);
  axios
    .get(`https://localhost:44314/MultiChoiceAnswers/idanswer/${idAnswer}`)
    .then((response) => {
      setRecordList(response.data);
      setRecordListLoading(false);
      console.log("Data retrieved successfully:", response.data);
    })
    .catch((error) => {
      setRecordList([]);
      setRecordListLoading(false);
      console.error("Error retrieving data:", error);
    });
};


const handleSubmit = (event) => {
  event.preventDefault();

  const newData = {
    value: formData.value,
    idAnswer: selectedCategoryId,
  };

  axios
    .post("https://localhost:44314/MultiChoiceAnswers", newData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("Data submitted successfully:", response.data);

      setDataList([...dataList, response.data]);

      setFormData({
        value: "",
        idAnswer: "",
      });

      axios
        .get(`https://localhost:44314/MultiChoiceAnswers/idanswer/${selectedCategoryId}`)
        .then((response) => {
          setRecordList(response.data);
          console.log("Data refreshed successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error refreshing data:", error);
        });
    })
    .catch((error) => {
      console.error("Error submitting data:", error);
    });
};


const handleDeleteData = (index) => {
  const updatedRecordList = [...recordList];

  updatedRecordList.splice(index, 1);
    setRecordList(updatedRecordList);
  
  const dataToDelete = recordList[index];
  axios.delete(`https://localhost:44314/MultiChoiceAnswers/${dataToDelete.id}`)
    .then((response) => {
      console.log("Data deleted successfully.");
    })
    .catch((error) => {
      console.error("Error deleting data:", error);
    });
};

  useEffect(() => {
    axios
      .get(`https://localhost:44314/Answers/ByCategory/${id}`)
      .then((response) => {
        setCategories(response.data);
        console.log("Categories", categories);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des factures :",
          error
        );
      });
    console.log("useParams id", id);
  }, []);

  const handleCancel = () => {
    setFormData({
      ...formData,
      value: ""
    });
  };
  
useEffect(() => {
  if (selectedCategoryId !== null) {
    axios
      .get(`https://localhost:44314/MultiChoiceAnswers/idanswer/${selectedCategoryId}`)
      .then((response) => {
        setDataList(response.data);
        console.log("Data retrieved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  }
}, [selectedCategoryId]);
  return (
    <div>
      <div
        id="services"
        className="section relative pt-20 pb-8 md:pt-16 md:pb-0 bg-white"
      >
        <div className="container xl:max-w-6xl mx-auto px-4">
          <div class="w-10/12 mx-auto max-w-6xl">
            <div class="lg:col-start-2 col-span-12 lg:col-span-10 grid grid-cols-6 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 mx-auto">
              <div class="p-4 col-span-6 md:col-span-2 ">
              
                <div class="grid grid-cols-5">
                  {categories.map((category) => (
                    <div
                      class={`md:col-span-5 group relative flex items-left gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-indigo-50 ${
                        selectedCategoryId === category.id
                          ? "bg-indigo-50" 
                          : ""
                      }`}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {" "}
                      <div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white mx-auto md:mx-0">
                        <svg
                          class="mx-auto items-center justify-center h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                          />
                        </svg>
                      </div>
                      <div class="flex-auto hidden md:block">
                        <button class="block font-semibold text-gray-900">
                          {category.value}
                          <span class="absolute inset-0"></span>
                        </button>
                        {/* <p class="mt-1 text-gray-600">id : {category.id}</p> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div class="p-4 col-span-6 md:col-span-4">
                <form method="POST" onSubmit={handleSubmit}>
                  <div class="mx-auto grid grid-cols-2 gap-x-8 gap-y-10">
                    <div class="col-span-2">
                      <div class="flex flex-wrap">
                        <h1 class="flex-auto text-xl font-semibold text-gray-900">
                          valeur de Reponse
                        </h1>
                        <div class="text-lg font-semibold text-black-500">
                          {selectedCategoryId}
                        </div>
                      </div>
                      <div class="mt-2">
                        <input
                          id="valueChoiceAnswers"
                          name="valueChoiceAnswers"
                          type="text"
                          value={formData.value}
                          onChange={handleValueChange}
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button
                    onClick={handleCancel}
                      type="button"
                      class="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
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
                </form>



                {recordListLoading ? (
  <div>Loading...</div>
) : (
  recordList.length > 0 ? (
    recordList.map((data, index) => (
      <div
        key={index}
        className="flex flex-col m-4 p-8 bg-white shadow-md hover:shadow-lg rounded-2xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex flex-col ml-3">
              <div className="font-medium pr-4 leading-none">{data.value}</div>
              <div className="text-gray-500">ID: {data.id}</div>
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
    ))
  ) : (
    <div>No data available.</div>
  )
)}


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParcoursAnswer;
