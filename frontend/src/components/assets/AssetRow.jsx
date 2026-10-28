import React from 'react'

const AssetRow = ({ onChange }) => {
  return (
    <div>
      <input 
        type="text" 
        placeholder="Search assets..." 
        onChange={onChange}
      />
    </div>
  )
}

export default AssetRow