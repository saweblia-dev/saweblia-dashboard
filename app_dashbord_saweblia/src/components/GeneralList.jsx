import React from "react";

function GeneralList({ items, filterFunction, onItemClick }) {
  return (
    <div className=" flex flex-col rounded-md border border-slate-200">
    <div className="mt-4 ">
        <div className="flex w-full flex-col overflow-y-scroll">
          {items.filter(filterFunction).map((item) => (
            <button
              key={item.id}
              onClick={() => onItemClick(item)}
              className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-cyan-100"
            >
              <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-cyan-100">
                <span className="tag w-full text-center text-2xl font-medium text-gray-700 group-hover:text-cyan-900">
                  {item.id}
                </span>
              </div>
              <div className="flex flex-col items-start justify-between font-light text-gray-600">
                <p className="text-[15px]">{item.title}</p>
                <span className="text-xs font-light text-gray-400">
                  {item.subtitle}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GeneralList;
