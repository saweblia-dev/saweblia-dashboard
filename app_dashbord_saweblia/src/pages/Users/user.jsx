import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../../components/Search";
import Button from "../../components/Button";
import Swal from "sweetalert2";

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchText, setSearchText] = useState("");


  useEffect(() => {
    axios
      .get("https://localhost:44314/api/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
        console.log("users ",users)
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        setLoading(false);
      });
  }, []);


  return (
    <div>
      <div className=" flex items-center justify-center h-screen">
          <div className="container">

            <div className="grid grid-cols-2 bg-white">
              <div className="flex flex-col items-center">
                <div>
                  <Search
                    searchText={searchText}
                    setSearchText={setSearchText}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Link to="/AjouterCommercial">
                  <Button text="Ajouter" />
                </Link>
              </div>
            </div>

            <div class="flex  h-[80vh] items-start m-6 py-6 text-center justify-center     dark:border-gray-700">
          	<div>
              
			<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table class="min-w-full leading-normal">
						<thead>
          
							<tr>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
							
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									products
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Created at
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									QRT
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Status
								</th>
							</tr>
						</thead>
						<tbody>
            {loading ? (
    <tr>
      <td colSpan="5">Chargement...</td>
    </tr>
  ) : (
    users.map((user) => (
      <tr key={user.id}>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <div class="flex items-center">
        
          <div class="ml-3">
            <p class="text-gray-900 whitespace-no-wrap">
              Vera Carpenter
            </p>
          </div>
        </div>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <p class="text-gray-900 whitespace-no-wrap">Admin</p>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <p class="text-gray-900 whitespace-no-wrap">
        Jan 21, 2020
      </p>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <p class="text-gray-900 whitespace-no-wrap">
        43
      </p>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <span
                            class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span aria-hidden
                                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
      <span class="relative">Activo</span>
      </span>
    </td>
  </tr>
    ))
  )}
				
							
						
						
						</tbody>
					</table>
				
				</div>
			</div>
		</div>
           </div>
          </div>
       
      </div>
    </div>
  )
}

export default User