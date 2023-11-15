import React from "react";

function Search({ searchText, setSearchText }) {
  return (
    <div className="flex items-center mb-6">
      <h2 className="text-xl mr-6 font-medium text-gray-700">Recherche :</h2>
      <input
        type="search"
        name="leadingIcon"
        id="leadingIcon"
        placeholder="Rechercher ici ..."
        className="w-[400px] pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}

export default Search;
