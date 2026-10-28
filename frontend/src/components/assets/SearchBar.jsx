import React from 'react'


const SearchBar = ({ value,onChange }) => {

  
  return (
    
    <div className="w-full max-w-md flex items-center bg-gray-100 border border-gray-200 rounded-xl px-3.5 py-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-shadow">
      
  
      <svg 
        className="w-5 h-5 text-gray-400 mr-2.5 " 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input 
        type="text" 
        placeholder="Search assets or employees..." 
        className="w-full bg-transparent text-gray-900 placeholder-gray-400 text-sm focus:outline-none"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default SearchBar