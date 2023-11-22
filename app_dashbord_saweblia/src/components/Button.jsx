import React from 'react'

function Button({ text, onClick }) {
  return (
    <button 
    onClick={onClick}
     className="w-[200px]  max-w-xs mx-auto border border-transparent  bg-[#2C2E87] hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold">
      {text}
    </button>
  )
}

export default Button