import React from 'react'
import {useNavigate} from 'react-router-dom'

const AddAssetButton = ({ onClick }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/add-asset')
  }

  return (
    <button 
      type="button"
      className="px-6 margin-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" 
      onClick={handleClick}
    >
      + Add Asset
    </button>
  ) 
}

export default AddAssetButton